import { FC, useState, useContext, useEffect, useMemo } from "react";

import { database } from "@/firebase";
import { createContext } from "@/utils";
import Cookies from "universal-cookie";

interface SettingsContext {
  phone: string;
  version: string;
  centralCoordinates: google.maps.LatLngLiteral;
  setNewCentralCoordinates: (coordinates: google.maps.LatLngLiteral) => Promise<void>;
}
const cookies = new Cookies();

const SettingsContext = createContext<SettingsContext>();

const SettingsProvider: FC = ({ children }) => {
  const [phone, setPhone] = useState<string>("");
  const [version, setVersion] = useState<string>("");
  const [centralCoordinates, setCentralCoordinates] = useState<google.maps.LatLngLiteral>({ lat: 0, lng: 0 });
  const districtId = useMemo(() => cookies.get("district_id"), []);

  async function getSettings() {
    database.ref("settings").on("value", (snapshot) => {
      const settings = snapshot.val();
      const { phone, version } = settings.app;

      setPhone(phone);
      setVersion(version);
    });

    database.ref(`admin/districts/${districtId}/centralCoordinates`).on("value", (snapshot) => {
      const centralCoordinates = snapshot.val();

      const [lat, lng] = centralCoordinates.split(",").map((coordinate: string) => parseFloat(coordinate));

      setCentralCoordinates({ lat, lng });
    });
  }

  async function setNewCentralCoordinates(newCoor: google.maps.LatLngLiteral) {
    await database.ref(`admin/districts/${districtId}/centralCoordinates`).set(`${newCoor.lat},${newCoor.lng}`);
  }

  useEffect(() => {
    getSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ phone, version, centralCoordinates, setNewCentralCoordinates }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => useContext(SettingsContext);

export default SettingsProvider;
