import { FC, useState } from "react";

import UserProvider from "./user";
import DistrictProvider from "./districts";

export const ContextProviders: FC = ({ children }) => {
  const [providers] = useState<FC<any>[]>([UserProvider /* DistrictProvider */]);

  return (
    <>
      {providers.map((Provider, index) => (
        <Provider key={index}>{children}</Provider>
      ))}
    </>
  );
};

export * from "./user";
export * from "./compose";
// export * from "./districts";
