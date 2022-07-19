import { FC, useState, useContext, useEffect } from "react";

import Sound from "react-sound";

import { Tracker } from "@alerta-ciudadana/entity";

import { database } from "@/firebase";
import { createContext } from "@/utils";
import Cookies from "universal-cookie";

const cookies = new Cookies();

interface AttendEmergency {
  attending: boolean;
  tracker: Tracker | undefined;
}
interface TrackerContext {
  trackers: Tracker[];
  newTrackerDetected?: Tracker;
  attendEmergency: AttendEmergency;
  setAttendEmergency(attendEmergency: AttendEmergency): void;
}

const TrackerContext = createContext<TrackerContext>();

const TrackerProvider: FC = ({ children }) => {
  const [trackers, setTrackers] = useState<Tracker[]>([]);

  const [newTrackerDetected, setNewTrackerDetected] = useState<Tracker>();

  const [newNumberOfTrackers, setNewNumberOfTrackers] = useState(0);
  const [attendEmergency, setAttendEmergency] = useState<AttendEmergency>({
    attending: false,
    tracker: undefined,
  });

  function getTrackers() {
    const districtId = cookies.get("district_id");
    database.ref(`district/${districtId}/follow/location`).on("value", (snapshot) => {
      let trackersSnapshot: Tracker[] = snapshot.val() || [];

      if (trackersSnapshot) {
        trackersSnapshot = Object.keys(trackersSnapshot).map((key) => {
          return { ...trackersSnapshot[key as any], id: key };
        });

        setTrackers(trackersSnapshot);
      }
    });
  }

  useEffect(() => {
    if (trackers.length !== 0) {
      if (trackers.length > newNumberOfTrackers) {
        setNewTrackerDetected([...trackers].pop());
        setNewNumberOfTrackers(trackers.length);
      } else {
        setNewTrackerDetected(undefined);
        setAttendEmergency({ attending: false, tracker: undefined });
      }
    }
  }, [trackers]);

  useEffect(() => {
    getTrackers();
  }, []);

  return (
    <TrackerContext.Provider value={{ trackers, newTrackerDetected, attendEmergency, setAttendEmergency }}>
      {/* <>{<Sound loop url="/public_alert.mp3" playStatus="PLAYING" />}</> */}
      {children}
    </TrackerContext.Provider>
  );
};

export const useTrackerContext = () => useContext(TrackerContext);

export default TrackerProvider;
