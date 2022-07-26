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
  newTrackerDetected: boolean;
  newTracker: { tracker?: Tracker; attending: boolean };
  attendEmergency: AttendEmergency;
  setNewTracker(value: { tracker?: Tracker; attending: boolean }): void;
  setAttendEmergency(values: AttendEmergency): void;
  setNewTrackerDetected(value: boolean): void;
}

const TrackerContext = createContext<TrackerContext>();

const TrackerProvider: FC = ({ children }) => {
  const [trackers, setTrackers] = useState<Tracker[]>([]);

  const [trackerLengths, setTrackerLengths] = useState(0);
  const [newTracker, setNewTracker] = useState<{ tracker?: Tracker; attending: boolean }>({
    tracker: undefined,
    attending: false,
  });
  const [newTrackerDetected, setNewTrackerDetected] = useState(false);
  const [attendEmergency, setAttendEmergency] = useState<AttendEmergency>({ attending: false, tracker: undefined });

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
    const countTrackers = trackers.filter((tracker) => !tracker?.visited).length;
    if (trackerLengths < countTrackers) {
      setNewTracker({ tracker: trackers[countTrackers - 1], attending: false });
      setNewTrackerDetected(true);
    }

    if (countTrackers === 0) {
      setNewTracker({ tracker: undefined, attending: false });
      setNewTrackerDetected(false);
    }

    setTrackerLengths(countTrackers);
  }, [trackers]);

  useEffect(() => {
    getTrackers();
  }, []);

  return (
    <TrackerContext.Provider
      value={{
        trackers,
        newTrackerDetected,
        newTracker,
        attendEmergency,
        setAttendEmergency,
        setNewTracker,
        setNewTrackerDetected,
      }}
    >
      <>{newTrackerDetected && <Sound loop url="/public_alert.mp3" playStatus="PLAYING" />}</>
      {children}
    </TrackerContext.Provider>
  );
};

export const useTrackerContext = () => useContext(TrackerContext);

export default TrackerProvider;
