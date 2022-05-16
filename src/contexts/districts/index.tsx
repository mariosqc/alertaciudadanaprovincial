import { FC, useState, useContext, useEffect } from "react";
import { District } from "@alerta-ciudadana/entity";
import { createContext } from "@/utils";
import moment from "moment";

import { database } from "@/firebase";

interface DistrictContext {
  district: District[];
}

const DistrictContext = createContext<DistrictContext>();

const DistrictProvider: FC = ({ children }) => {
  const [district, setDistricts] = useState<District[]>([]);

  async function getDistricts(): Promise<District[]> {
    return new Promise((resolve) => {
      database.ref("admin/districts").on("value", (snapshot) => {
        let districts = snapshot.val();
        districts = Object.keys(districts || {})
          .map((key: any) => ({
            id: key,
            ...districts[key],
            polygon: districts[key].polygon.map((path: string) =>
              /* Hacemos un split en el string para obtener las coordenadas y luego lo convertimos en un objecto */
              path.split(",").reduce((a, v, i) => ({ ...a, [i === 0 ? "lat" : "lng"]: Number(v) }), {})
            ),
          }))
          .sort((a: District, b: District) => moment(b.createdAt).diff(moment(a.createdAt)));
        resolve(districts);
      });
    });
  }

  useEffect(() => {
    getDistricts().then(setDistricts);
  }, []);

  return <DistrictContext.Provider value={{ district }}>{children}</DistrictContext.Provider>;
};

export const useDistrictContext = () => useContext(DistrictContext);

export default DistrictProvider;
