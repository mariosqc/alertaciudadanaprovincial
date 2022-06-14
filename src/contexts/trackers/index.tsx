import { FC, useState, useContext, useEffect } from "react";
import { Tracker } from "@alerta-ciudadana/entity";

import { database } from "@/firebase";
import { createContext } from "@/utils";
import Cookies from "universal-cookie";

const cookies = new Cookies();

interface TrackerContext {
  trackers: Tracker[];
}

const TrackerContext = createContext<TrackerContext>();

const TrackerProvider: FC = ({ children }) => {
  const [trackers, setTrackers] = useState<Tracker[]>([]);

  function getTrackers() {
    const districtId = cookies.get("district_id");
    database.ref(`district/${districtId}/follow/location`).on("value", (snapshot) => {
      let trackersSnapshot: Tracker[] = snapshot.val() || [];

      if (trackersSnapshot) {
        trackersSnapshot = Object.keys(trackersSnapshot).map((key) => {
          return {
            ...trackersSnapshot[key as any],
            id: key,
          };
        });

        setTrackers(trackersSnapshot);
      }
    });
  }

  useEffect(() => {
    getTrackers();
  }, []);

  return <TrackerContext.Provider value={{ trackers }}>{children}</TrackerContext.Provider>;
};

export const useTrackerContext = () => useContext(TrackerContext);

export default TrackerProvider;
/*  let tracker = snapshot.val();
      tracker = Object.keys(tracker || {})
        .map((key: any) => ({
          id: key,
          ...tracker[key],
          polygon: tracker[key].polygon.map((path: string) =>
            Hacemos un split en el string para obtener las coordenadas y luego lo convertimos en un objecto 
            path.split(",").reduce((a, v, i) => ({ ...a, [i === 0 ? "lat" : "lng"]: Number(v) }), {})
          ),
        }))
        .sort((a: Tracker, b: Tracker) => moment(b.createdAt).diff(moment(a.createdAt)));
      setTrackers(tracker); */
