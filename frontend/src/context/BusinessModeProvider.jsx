import { useState } from "react";
import BusinessModeContext from "./BusinessModeContext";

const BusinessModeProvider = ({ children }) => {
  const [mode, setMode] = useState("retail"); // default retail

  const toggleMode = () => {
    setMode((prev) => (prev === "retail" ? "wholesale" : "retail"));
  };

  return (
    <BusinessModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </BusinessModeContext.Provider>
  );
};

export default BusinessModeProvider;
