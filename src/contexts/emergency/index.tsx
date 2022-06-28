import { FC, useState, useContext, useEffect, useMemo } from "react";
import removeAccents from "remove-accents";

import { Emergency, EntityType, PaginatioContext, Pagination } from "@alerta-ciudadana/entity";

import { database, storage } from "@/firebase";
import { createContext } from "@/utils";

import Cookies from "universal-cookie";
import { usePagination } from "@/hooks";

const cookies = new Cookies();

const SKIP_PAGINATION = 25;

interface EmergencyContext extends PaginatioContext<Emergency> {
  emergencies: Emergency[];
  typesOfEmergencies: EntityType[];
  createEmergencyType: (values: { name: string; icon: File }) => Promise<void>;
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

  async function createEmergencyType(values: { name: string; icon: File }) {
    console.log({ values });

    const name = removeAccents(values.name.toLowerCase().replace(/ /g, "_"));
    await storage.ref(`emergency-types/${name}`).put(values.icon);

    await database.ref(`district/${districtId}/tEmergency`).push({
      name,
      icon: `https://firebasestorage.googleapis.com/v0/b/alerta-ciudadana-provincial.appspot.com/o/emergency-types%2F${name}?alt=media`,
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
        createEmergencyType,
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
