import { FC, useState, useContext, useEffect } from "react";
import { Emergency } from "@alerta-ciudadana/entity";

import { database } from "@/firebase";
import { createContext } from "@/utils";

interface Pagination<T> {
  page: number;
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
  const [perPage, setPerPage] = useState(10);
  const [pagination, setPagination] = useState<Pagination<Emergency>>({
    page: 1,
    perPage,
    items: [],
    take: 0,
    skip: 9,
    total: 0,
  });

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

  function initialPagination() {
    const paginationItem: Pagination<Emergency> = {
      ...pagination,
      perPage,
      page: 1,
      items: emergencies.slice(pagination.take, pagination.skip),
      total: emergencies.length,
    };

    setPagination(paginationItem);
  }

  function prevPage() {
    if (pagination.page !== 1) {
      const paginationItem: Pagination<Emergency> = {
        ...pagination,
        page: pagination.page - 1,
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
      page: pagination.page + 1,
      take: pagination.take + pagination.perPage,
      skip: pagination.skip + pagination.perPage,
      items: emergencies.slice(pagination.take, pagination.skip),
    };
    setPagination(paginationItem);
  }

  function changeNumberPerPage(number: number) {
    setPerPage(number);
  }

  useEffect(() => {
    getEmergencies();
  }, []);

  useEffect(() => {
    emergencies.length && initialPagination();
  }, [emergencies, perPage]);

  return (
    <EmergencyContext.Provider value={{ emergencies, pagination, prevPage, nextPage, changeNumberPerPage }}>
      {children}
    </EmergencyContext.Provider>
  );
};

export const useEmergencyContext = () => useContext(EmergencyContext);

export default EmergencyProvider;
