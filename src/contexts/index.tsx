import { FC, useState } from "react";

import UserProvider from "./user";

export const ContextProviders: FC = ({ children }) => {
  const [providers] = useState<FC<any>[]>([UserProvider]);

  return (
    <>
      {providers.map((Provider, index) => (
        <Provider key={index}>{children}</Provider>
      ))}
    </>
  );
};

export * from "./user";
