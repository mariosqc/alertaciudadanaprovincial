import { FC, useState, useContext, useEffect, useMemo } from "react";
import { Complaint, EntityType, PaginatioContext, Pagination } from "@alerta-ciudadana/entity";
import { createContext } from "@/utils";
import removeAccents from "remove-accents";

import { database, storage } from "@/firebase";

import Cookies from "universal-cookie";
import { useAuthContext } from "../auth";
import { usePagination } from "@/hooks";
import moment from "moment";

const cookies = new Cookies();

interface ComplaintContext extends PaginatioContext<Complaint> {
  typesOfComplaints: EntityType[];
  complaints: Complaint[];
  sortTable: (sort: "asc" | "desc", field: keyof Complaint) => void;
  createComplaintType(values: { name: string; icon: File }): Promise<void>;
  deleteComplaintType(entity: EntityType): Promise<void>;
  filterComplaintsByType(name?: string): void;
  filterByDates(startDate: string, endDate: string): void;
  changeStatus(complaint: Complaint, status: string): Promise<void>;
  addingMessage(complaint: Complaint, message: string): Promise<void>;
}

const ComplaintContext = createContext<ComplaintContext>();

const ComplaintProvider: FC = ({ children }) => {
  // const { isAuthenticated } = useAuthContext();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [allComplaints, setAllComplaints] = useState<Complaint[]>([]);
  const [typesOfComplaints, setTypesOfComplaints] = useState<EntityType[]>([]);
  const { pagination, changeNumberPerPage, nextPage, prevPage, goToFirstPage, goToLastPage } = usePagination({
    allItems: complaints,
    name: "complaint",
  });

  const districtId = useMemo(() => cookies.get("district_id"), []);

  function getComplaints() {
    const districtId = cookies.get("district_id");
    database.ref(`district/${districtId}/complaint`).on("value", (snapshot) => {
      let districtsSnapshot = snapshot.val();

      districtsSnapshot = Object.keys(districtsSnapshot || {})
        .map((key) => {
          let districts = (Object.entries(districtsSnapshot[key]) as any).map(([id, value]: any) => ({
            ...value,
            id,
            userId: key,
          }));

          return districts;
        })
        .flat();

      setComplaints(districtsSnapshot);
      setAllComplaints(districtsSnapshot);
    });
  }

  function getTypesOfComplaints() {
    database.ref(`district/${districtId}/tDenuncia`).on("value", (snapshot) => {
      let typesOfComplaints = snapshot.val() || [];

      typesOfComplaints = Object.keys(typesOfComplaints).map((key) => ({
        id: key,
        ...typesOfComplaints[key],
      }));

      setTypesOfComplaints(typesOfComplaints);
    });
  }

  async function createComplaintType(values: { name: string; icon: File }) {
    const name = removeAccents(values.name.toLowerCase().replace(/ /g, "_"));
    await storage.ref(`complaint-types/${name}`).put(values.icon);

    await database.ref(`district/${districtId}/tDenuncia`).push({
      name: values.name,
      icon: `https://firebasestorage.googleapis.com/v0/b/alerta-ciudadana-provincial.appspot.com/o/complaint-types%2F${name}?alt=media`,
    });
  }

  async function deleteComplaintType(entity: EntityType) {
    const name = removeAccents(entity.name.toLowerCase().replace(/ /g, "_"));
    await database.ref(`district/${districtId}/tDenuncia/${entity.id}`).remove();
    await storage.ref(`complaint-types/${name}`).delete();
  }

  async function sortTable(sort: "asc" | "desc", field: keyof Complaint) {
    const sortedComplaints = [...complaints].sort((a, b) => {
      if (sort === "asc") {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] > b[field] ? -1 : 1;
      }
    });

    setComplaints(sortedComplaints);
  }

  async function filterComplaintsByType(complaintType: string) {
    if (!complaintType) {
      setComplaints(allComplaints);
      return;
    }
    const emergenciesFinded = allComplaints.filter((e) => e.type === complaintType);
    setComplaints(emergenciesFinded);
  }

  async function filterByDates(startDate: string, endDate: string) {
    const emergenciesFinded = allComplaints.filter((e) => {
      const compareDate = moment(e.date);
      const startDateCompare = moment(startDate).subtract(1, "days");
      const endDateCompare = moment(endDate);
      return compareDate.isBetween(startDateCompare, endDateCompare);
    });
    setComplaints(emergenciesFinded);
  }

  async function changeStatus(complaint: Complaint, status: string) {
    await database.ref(`district/${districtId}/complaint/${complaint.userId}/${complaint.id}`).update({ status });
  }

  async function addingMessage(complaint: Complaint, message: string) {
    await database.ref(`district/${districtId}/complaint/${complaint.userId}/${complaint.id}`).update({ message });
  }

  useEffect(() => {
    getComplaints();
    getTypesOfComplaints();
  }, []);

  return (
    <ComplaintContext.Provider
      value={{
        complaints,
        typesOfComplaints,
        createComplaintType,
        deleteComplaintType,
        sortTable,
        filterComplaintsByType,
        filterByDates,
        changeStatus,
        addingMessage,
      }}
    >
      {children}
    </ComplaintContext.Provider>
  );
};

export const useComplaintContext = () => useContext(ComplaintContext);

export default ComplaintProvider;
