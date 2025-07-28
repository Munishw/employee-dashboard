import { createContext, useContext, useState, useEffect } from "react";
import data from "../assets/employee.json";

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    setEmployees(data);
    setFilteredEmployees(data);
  }, []);

  return (
    <EmployeeContext.Provider value={{ employees, filteredEmployees, setFilteredEmployees }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = () => useContext(EmployeeContext);
