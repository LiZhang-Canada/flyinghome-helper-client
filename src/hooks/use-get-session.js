import { useContext } from "react";
import { AuthContext } from "../context/auth-context.js";

export const useGetSession = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error("Context can only be accessed inside a Provider");

  return context;
};
