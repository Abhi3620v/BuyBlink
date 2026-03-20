import { useState } from "react";
import CustomerAuthContext from "./CustomerAuthContext";

const CUSTOMER_KEY = "buyblink-customer-user";
const CUSTOMERS_KEY = "buyblink-customer-users";

function CustomerAuthProvider({ children }) {
  const [customer, setCustomer] = useState(() => {
    const savedCustomer = localStorage.getItem(CUSTOMER_KEY);
    return savedCustomer ? JSON.parse(savedCustomer) : null;
  });

  const registerCustomer = (newCustomer) => {
    const customers = JSON.parse(localStorage.getItem(CUSTOMERS_KEY)) || [];

    const exists = customers.find((entry) => entry.email === newCustomer.email);

    if (exists) {
      alert("Customer account already exists");
      return false;
    }

    customers.push(newCustomer);
    localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(customers));
    setCustomer(newCustomer);
    localStorage.setItem(CUSTOMER_KEY, JSON.stringify(newCustomer));
    return true;
  };

  const loginCustomer = (email, password) => {
    const customers = JSON.parse(localStorage.getItem(CUSTOMERS_KEY)) || [];

    const foundCustomer = customers.find(
      (entry) => entry.email === email && entry.password === password,
    );

    if (!foundCustomer) {
      alert("No customer account found");
      return false;
    }

    setCustomer(foundCustomer);
    localStorage.setItem(CUSTOMER_KEY, JSON.stringify(foundCustomer));
    return true;
  };

  const logoutCustomer = () => {
    setCustomer(null);
    localStorage.removeItem(CUSTOMER_KEY);
  };

  const updateCustomerProfile = (profileUpdates) => {
    if (!customer) {
      return false;
    }

    const customers = JSON.parse(localStorage.getItem(CUSTOMERS_KEY)) || [];
    const updatedCustomer = {
      ...customer,
      ...profileUpdates,
      email: customer.email,
    };

    const updatedCustomers = customers.map((entry) =>
      entry.email === customer.email ? updatedCustomer : entry,
    );

    setCustomer(updatedCustomer);
    localStorage.setItem(CUSTOMER_KEY, JSON.stringify(updatedCustomer));
    localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(updatedCustomers));
    return true;
  };

  return (
    <CustomerAuthContext.Provider
      value={{
        customer,
        registerCustomer,
        loginCustomer,
        logoutCustomer,
        updateCustomerProfile,
      }}
    >
      {children}
    </CustomerAuthContext.Provider>
  );
}

export default CustomerAuthProvider;
