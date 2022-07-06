import { FC, useState, useContext, useEffect, useMemo } from "react";

import { database } from "@/firebase";
import { createContext } from "@/utils";
import Cookies from "universal-cookie";

interface SettingsContext {
  appSettings: AppSettings | undefined;
  centralCoordinates: google.maps.LatLngLiteral;
  setNewCentralCoordinates: (coordinates: google.maps.LatLngLiteral) => Promise<void>;
  setSettings: (settings: AppSettings) => Promise<void>;
}
const cookies = new Cookies();

const SettingsContext = createContext<SettingsContext>();

const SettingsProvider: FC = ({ children }) => {
  const [appSettings, setAppSettings] = useState<AppSettings>();
  const [centralCoordinates, setCentralCoordinates] = useState<google.maps.LatLngLiteral>({ lat: 0, lng: 0 });
  const districtId = useMemo(() => cookies.get("district_id"), []);

  async function getSettings() {
    database.ref("settings").on("value", (snapshot) => {
      const settings = snapshot.val();
      setAppSettings(settings.app);
    });

    database.ref(`admin/districts/${districtId}/centralCoordinates`).on("value", (snapshot) => {
      const centralCoordinates = snapshot.val();

      const [lat, lng] = (centralCoordinates || "0,0").split(",").map((coordinate: string) => parseFloat(coordinate));

      setCentralCoordinates({ lat, lng });
    });
  }

  async function setNewCentralCoordinates(newCoor: google.maps.LatLngLiteral) {
    await database.ref(`admin/districts/${districtId}/centralCoordinates`).set(`${newCoor.lat},${newCoor.lng}`);
  }

  async function setSettings(values: AppSettings) {
    await database.ref("settings/app").set(values);
  }

  useEffect(() => {
    getSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ appSettings, centralCoordinates, setNewCentralCoordinates, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => useContext(SettingsContext);

export default SettingsProvider;
