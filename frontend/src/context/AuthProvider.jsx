import { useState } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("buyblink-user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const register = (newUser) => {
    const users = JSON.parse(localStorage.getItem("buyblink-users")) || [];

    const exists = users.find((u) => u.email === newUser.email);

    if (exists) {
      alert("User already exists");
      return false;
    }

    users.push(newUser);

    localStorage.setItem("buyblink-users", JSON.stringify(users));

    return true;
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("buyblink-users")) || [];

    const foundUser = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!foundUser) {
      alert("No user found");
      return false;
    }

    setUser(foundUser);

    localStorage.setItem("buyblink-user", JSON.stringify(foundUser));

    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("buyblink-user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
