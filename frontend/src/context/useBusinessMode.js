import { useContext } from "react";
import BusinessModeContext from "./BusinessModeContext";

const useBusinessMode = () => {
  return useContext(BusinessModeContext);
};

export default useBusinessMode;