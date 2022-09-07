import { FC, useState, useContext, useEffect, useMemo } from "react";
import { Directory } from "@alerta-ciudadana/entity";
import moment from "moment";

import { database } from "@/firebase";
import { createContext } from "@/utils";
import Cookies from "universal-cookie";

const cookies = new Cookies();

interface DirectoryContext {
  directories: Directory[];
  deleteDirectory(id: string): void;
}

const DirectoryContext = createContext<DirectoryContext>();

const DirectoryProvider: FC = ({ children }) => {
  const [directories, setDirectories] = useState<Directory[]>([]);

  const districtId = useMemo(() => cookies.get("district_id"), []);

  function getDirectory() {
    database.ref(`district/${districtId}/directory`).on("value", (snapshot) => {
      let directories = snapshot.val();

      directories = Object.keys(directories || {}).map((key: any) => ({
        id: key,
        ...directories[key],
      }));
      setDirectories(directories);
    });
  }

  async function deleteDirectory(id: string) {
    await database.ref(`district/${districtId}/directory/${id}`).remove();
  }

  useEffect(() => {
    getDirectory();
  }, []);

  return <DirectoryContext.Provider value={{ directories, deleteDirectory }}>{children}</DirectoryContext.Provider>;
};

export const useDirectoryContext = () => useContext(DirectoryContext);

export default DirectoryProvider;
