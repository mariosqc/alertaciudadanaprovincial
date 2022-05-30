import { FC, useState, useContext, useEffect } from "react";
import { Emergency } from "@alerta-ciudadana/entity";

import { database } from "@/firebase";
import { createContext } from "@/utils";

const SKIP_PAGINATION = 25;

import Cookies from "universal-cookie";
import { usePagination } from "@/hooks";

const cookies = new Cookies();
interface Pagination<T> {
  perPage: number;
  take: number;
  skip: number;
  total: number;
  items: T[];
}

interface EmergencyContext {
  emergencies: Emergency[];
  pagination: Pagination<Emergency>;
  prevPage(): void;
  nextPage(): void;
  changeNumberPerPage(perPage: number): void;
}

const EmergencyContext = createContext<EmergencyContext>();

const EmergencyProvider: FC = ({ children }) => {
  const [emergencies, setEmergencies] = useState<Emergency[]>([]);
  const { pagination, changeNumberPerPage, nextPage, prevPage } = usePagination({
    allItems: emergencies,
    skip: SKIP_PAGINATION,
    name: "emergency",
  });

  function getEmergencies() {
    const districtId = cookies.get("district_id");

    database.ref(`district/${districtId}`).on("value", (snapshot) => {
      let emergenciesSnapshot = snapshot.val() || [];

      if (emergenciesSnapshot.emergency) {
        emergenciesSnapshot = Object.keys(emergenciesSnapshot.emergency)
          .map((key) => {
            let emergencies = (Object.entries(emergenciesSnapshot.emergency[key]) as any).map(([id, value]: any) => ({
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
    <EmergencyContext.Provider value={{ emergencies, pagination, prevPage, nextPage, changeNumberPerPage }}>
      {children}
    </EmergencyContext.Provider>
  );
};

export const useEmergencyContext = () => useContext(EmergencyContext);

export default EmergencyProvider;
