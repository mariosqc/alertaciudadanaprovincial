import { FC, useState, useContext, useEffect } from "react";
import { Emergency, PaginatioContext, Pagination } from "@alerta-ciudadana/entity";

import { database } from "@/firebase";
import { createContext } from "@/utils";

import Cookies from "universal-cookie";
import { usePagination } from "@/hooks";

const cookies = new Cookies();

const SKIP_PAGINATION = 25;

interface EmergencyContext extends PaginatioContext<Emergency> {
  emergencies: Emergency[];
}

const EmergencyContext = createContext<EmergencyContext>();

const EmergencyProvider: FC = ({ children }) => {
  const [emergencies, setEmergencies] = useState<Emergency[]>([]);
  const { pagination, changeNumberPerPage, nextPage, prevPage, goToFirstPage, goToLastPage } = usePagination({
    allItems: emergencies,
    skip: SKIP_PAGINATION,
    name: "emergency",
  });

  function getEmergencies() {
    const districtId = cookies.get("district_id");

    database.ref(`district/${districtId}/emergency`).on("value", (snapshot) => {
      let emergenciesSnapshot = snapshot.val() || [];

      if (emergenciesSnapshot) {
        emergenciesSnapshot = Object.keys(emergenciesSnapshot)
          .map((key) => {
            let emergencies = (Object.entries(emergenciesSnapshot[key]) as any).map(([id, value]: any) => ({
              ...value,
              id,
              userId: key,
            }));

            return emergencies;
          })
          .flat();

        setEmergencies(emergenciesSnapshot);
      }
    });
  }

  useEffect(() => {
    getEmergencies();
  }, []);

  return (
    <EmergencyContext.Provider
      value={{ emergencies, pagination, prevPage, nextPage, changeNumberPerPage, goToFirstPage, goToLastPage }}
    >
      {children}
    </EmergencyContext.Provider>
  );
};

export const useEmergencyContext = () => useContext(EmergencyContext);

export default EmergencyProvider;
