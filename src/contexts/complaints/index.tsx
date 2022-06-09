import { FC, useState, useContext, useEffect } from "react";
import { Complaint, PaginatioContext, Pagination } from "@alerta-ciudadana/entity";
import { createContext } from "@/utils";

import { database } from "@/firebase";

import Cookies from "universal-cookie";
import { useAuthContext } from "../auth";
import { usePagination } from "@/hooks";

const cookies = new Cookies();

const SKIP_PAGINATION = 25;

interface ComplaintContext extends PaginatioContext<Complaint> {
  complaints: Complaint[];
}

const ComplaintContext = createContext<ComplaintContext>();

const ComplaintProvider: FC = ({ children }) => {
  // const { isAuthenticated } = useAuthContext();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const { pagination, changeNumberPerPage, nextPage, prevPage, goToFirstPage, goToLastPage } = usePagination({
    allItems: complaints,
    skip: SKIP_PAGINATION,
    name: "complaint",
  });

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

  useEffect(() => {
    getComplaints();
  }, []);

  return (
    <ComplaintContext.Provider
      value={{ complaints, pagination, changeNumberPerPage, nextPage, prevPage, goToFirstPage, goToLastPage }}
    >
      {children}
    </ComplaintContext.Provider>
  );
};

export const useComplaintContext = () => useContext(ComplaintContext);

export default ComplaintProvider;
