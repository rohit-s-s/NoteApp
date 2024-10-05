import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("useAuth Hook should be called within AuthContext");
  return authContext;
};

export default useAuth;
