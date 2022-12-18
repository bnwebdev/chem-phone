import { createContext, FC, PropsWithChildren } from "react";

import { Method } from "../../graphql/types";

type Context = {
  method: Method;
  refetch: () => Promise<void>;
};

export const MethodContext = createContext<Context>(null as unknown as Context);

type Props = PropsWithChildren<Context>;

export const MethodProvider: FC<Props> = ({ method, refetch, children }) => (
  <MethodContext.Provider value={{ method, refetch }}>
    {children}
  </MethodContext.Provider>
);
