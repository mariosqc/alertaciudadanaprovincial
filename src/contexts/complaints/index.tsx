import { FC, useState, useContext, useEffect, useMemo } from "react";
import { Complaint, EntityType, PaginatioContext, Pagination } from "@alerta-ciudadana/entity";
import { createContext } from "@/utils";

import { database } from "@/firebase";

import Cookies from "universal-cookie";
import { useAuthContext } from "../auth";
import { usePagination } from "@/hooks";

const cookies = new Cookies();

const SKIP_PAGINATION = 25;

interface ComplaintContext extends PaginatioContext<Complaint> {
  typesOfComplaints: EntityType[];
  complaints: Complaint[];
}

const ComplaintContext = createContext<ComplaintContext>();

const ComplaintProvider: FC = ({ children }) => {
  // const { isAuthenticated } = useAuthContext();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [typesOfComplaints, setTypesOfComplaints] = useState<EntityType[]>([]);
  const { pagination, changeNumberPerPage, nextPage, prevPage, goToFirstPage, goToLastPage } = usePagination({
    allItems: complaints,
    skip: SKIP_PAGINATION,
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

  useEffect(() => {
    getComplaints();
    getTypesOfComplaints();
  }, []);

  return (
    <ComplaintContext.Provider
      value={{
        complaints,
        pagination,
        typesOfComplaints,
        changeNumberPerPage,
        nextPage,
        prevPage,
        goToFirstPage,
        goToLastPage,
      }}
    >
      {children}
    </ComplaintContext.Provider>
  );
};

export const useComplaintContext = () => useContext(ComplaintContext);

export default ComplaintProvider;
