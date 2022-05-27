import { FC, useState, useContext, useEffect } from "react";
import { Emergency } from "@alerta-ciudadana/entity";

import { database } from "@/firebase";
import { createContext } from "@/utils";

const SKIP_PAGINATION = 10;
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
  const [perPage, setPerPage] = useState(SKIP_PAGINATION);
  const [pagination, setPagination] = useState<Pagination<Emergency>>({
    perPage,
    items: [],
    take: 0,
    skip: SKIP_PAGINATION,
    total: 0,
  });
  const [completeInitialRender, setCompleteInitialRender] = useState(false);

  function getEmergencies() {
    database.ref("district/1d3d7106-76f0-4fb9-9f5d-35ef96bb0a20").on("value", (snapshot) => {
      let emergenciesSnapshot = snapshot.val();

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

  function initialPagination(skip: number) {
    setPagination({
      perPage: skip,
      skip,
      take: 0,
      items: emergencies.slice(0, skip),
      total: emergencies.length,
    });
  }

  function prevPage() {
    if (pagination.take) {
      const paginationItem: Pagination<Emergency> = {
        ...pagination,
        take: pagination.take - pagination.perPage,
        skip: pagination.skip - pagination.perPage,
        items: emergencies.slice(pagination.take - pagination.perPage, pagination.skip - pagination.perPage),
      };
      setPagination(paginationItem);
    }
  }

  function nextPage() {
    const paginationItem: Pagination<Emergency> = {
      ...pagination,
      take: pagination.take + pagination.perPage,
      skip: pagination.skip + pagination.perPage,
      items: emergencies.slice(pagination.take + pagination.perPage, pagination.skip + pagination.perPage),
    };
    setPagination(paginationItem);
  }

  function changeNumberPerPage(number: number) {
    setPerPage(number);
    initialPagination(number);
  }

  useEffect(() => {
    getEmergencies();
  }, []);

  useEffect(() => {
    if (emergencies.length && !completeInitialRender) {
      initialPagination(SKIP_PAGINATION);
      setCompleteInitialRender(true);
    }
  }, [emergencies]);

  return (
    <EmergencyContext.Provider value={{ emergencies, pagination, prevPage, nextPage, changeNumberPerPage }}>
      {children}
    </EmergencyContext.Provider>
  );
};

export const useEmergencyContext = () => useContext(EmergencyContext);

export default EmergencyProvider;
