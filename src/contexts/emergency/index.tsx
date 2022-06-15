import { FC, useState, useContext, useEffect, useMemo } from "react";
import { Emergency, EntityType, PaginatioContext, Pagination } from "@alerta-ciudadana/entity";

import { database } from "@/firebase";
import { createContext } from "@/utils";

import Cookies from "universal-cookie";
import { usePagination } from "@/hooks";

const cookies = new Cookies();

const SKIP_PAGINATION = 25;

interface EmergencyContext extends PaginatioContext<Emergency> {
  emergencies: Emergency[];
  typesOfEmergencies: EntityType[];
}

const EmergencyContext = createContext<EmergencyContext>();

const EmergencyProvider: FC = ({ children }) => {
  const [emergencies, setEmergencies] = useState<Emergency[]>([]);
  const [typesOfEmergencies, setTypesOfEmergencies] = useState<EntityType[]>([]);
  const { pagination, changeNumberPerPage, nextPage, prevPage, goToFirstPage, goToLastPage } = usePagination({
    allItems: emergencies,
    skip: SKIP_PAGINATION,
    name: "emergency",
  });
  const districtId = useMemo(() => cookies.get("district_id"), []);

  function getEmergencies() {
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

  function getTypesOfEmergencies() {
    database.ref(`district/${districtId}/tEmergency`).on("value", (snapshot) => {
      let typesOfEmergencies = snapshot.val() || [];
      typesOfEmergencies = Object.keys(typesOfEmergencies).map((key) => ({
        id: key,
        ...typesOfEmergencies[key],
      }));

      setTypesOfEmergencies(typesOfEmergencies);
    });
  }

  useEffect(() => {
    getEmergencies();
    getTypesOfEmergencies();
  }, []);

  return (
    <EmergencyContext.Provider
      value={{
        emergencies,
        pagination,
        typesOfEmergencies,
        prevPage,
        nextPage,
        changeNumberPerPage,
        goToFirstPage,
        goToLastPage,
      }}
    >
      {children}
    </EmergencyContext.Provider>
  );
};

export const useEmergencyContext = () => useContext(EmergencyContext);

export default EmergencyProvider;
