import { UserResponse } from "./../apollo/types";
import { createContext } from "react";

const authContext = createContext<{
  authenticated: UserResponse | undefined;
  setAuthenticated: (auth: UserResponse) => void;
}>({
  authenticated: undefined,
  setAuthenticated: (auth: UserResponse) => {},
});

export default authContext;
