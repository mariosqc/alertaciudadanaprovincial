import { FC, useState, useContext, useEffect } from "react";
import { Emergency } from "@alerta-ciudadana/entity";

import { database } from "@/firebase";
import { createContext } from "@/utils";

interface EmergencyContext {
  emergencies: Emergency[];
}

const EmergencyContext = createContext<EmergencyContext>();

const EmergencyProvider: FC = ({ children }) => {
  const [emergencies, setEmergencies] = useState<Emergency[]>([]);

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

  useEffect(() => {
    getEmergencies();
  }, []);

  return <EmergencyContext.Provider value={{ emergencies }}>{children}</EmergencyContext.Provider>;
};

export const useEmergencyContext = () => useContext(EmergencyContext);

export default EmergencyProvider;
/*  let emergencies = snapshot.val();
      emergencies = Object.keys(emergencies || {})
        .map((key: any) => ({
          id: key,
          ...emergencies[key],
          polygon: emergencies[key].polygon.map((path: string) =>
            Hacemos un split en el string para obtener las coordenadas y luego lo convertimos en un objecto 
            path.split(",").reduce((a, v, i) => ({ ...a, [i === 0 ? "lat" : "lng"]: Number(v) }), {})
          ),
        }))
        .sort((a: Emergency, b: Emergency) => moment(b.createdAt).diff(moment(a.createdAt)));
      setEmergencies(emergencies); */
