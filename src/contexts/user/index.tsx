import { FC, useState, useContext, useEffect } from "react";
import { User } from "@alerta-ciudadana/entity";
import { createContext } from "@/utils";

import { database } from "@/firebase";

import Cookies from "universal-cookie";

const cookies = new Cookies();

interface UserContext {
  users: User[];
}

const UserContext = createContext<UserContext>();

const UserProvider: FC = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);

  function getUsers() {
    const districtId = cookies.get("district_id");
    database.ref(`users/${districtId}`).on("value", (snapshot) => {
      let data = snapshot.val();
      const users = Object.keys(data).map((key) => ({ ...data[key], uid: key }));
      setUsers(users);
    });
  }

  useEffect(() => {
    getUsers();
  }, []);

  return <UserContext.Provider value={{ users }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);

export default UserProvider;
