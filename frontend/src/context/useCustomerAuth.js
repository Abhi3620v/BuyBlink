import { useContext } from "react";
import CustomerAuthContext from "./CustomerAuthContext";

function useCustomerAuth() {
  return useContext(CustomerAuthContext);
}

export default useCustomerAuth;
