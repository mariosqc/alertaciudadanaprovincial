import { FC, useState, useContext, useEffect } from "react";
import { User } from "@alerta-ciudadana/entity";
import { createContext } from "@/utils";

import { database } from "@/firebase";

interface UserContext {
  users: User[];
}

const UserContext = createContext<UserContext>();

const UserProvider: FC = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);

  async function getUsers(): Promise<User[]> {
    return new Promise((resolve) => {
      database.ref("users").on("value", (snapshot) => {
        let data = snapshot.val();
        const users = Object.keys(data).map((userId) => Object.values(data[userId])[0]) as User[];
        resolve(users);
      });
    });
  }

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  return <UserContext.Provider value={{ users }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);

export default UserProvider;
