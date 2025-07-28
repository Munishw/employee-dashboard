import { useState, useEffect } from "react";
import data from "../assets/employee.json";
import SearchBar from "./SearchBar";
import Filters from "./Filters";
import EmployeeModal from "./EmployeeModal";
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setEmployees(data);
    setFilteredEmployees(data);
  }, []);

  const uniqueDepartments = [...new Set(data.map(emp => emp.Department))];

  // Combined Filter Logic (AND condition)
  useEffect(() => {
    let filtered = [...employees];

    // Search Filter
    if (searchQuery) {
      filtered = filtered.filter(emp =>
        emp.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.Email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.Department.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status Filter
    if (statusFilter) {
      filtered = filtered.filter(emp => emp.Status === statusFilter);
    }

    // Department Filter
    if (departmentFilter) {
      filtered = filtered.filter(emp => emp.Department === departmentFilter);
    }

    setFilteredEmployees(filtered);
    setCurrentPage(1);
  }, [searchQuery, statusFilter, departmentFilter, employees]);

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";

    const sortedData = [...filteredEmployees].sort((a, b) => {
      let aValue = a[field];
      let bValue = b[field];

      // Handle Date Sorting
      if (field === "Joining_Date") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) return order === "asc" ? -1 : 1;
      if (aValue > bValue) return order === "asc" ? 1 : -1;
      return 0;
    });

    setSortField(field);
    setSortOrder(order);
    setFilteredEmployees(sortedData);
  };


  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredEmployees.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleRowClick = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleExportCSV = () => {
    const headers = ["Id", "Name", "Email", "Department", "Role", "Status", "Joining Date", "Salary"];

    const csvRows = [
      headers.join(","), // CSV Header
      ...filteredEmployees.map(emp =>
        [
          emp.Id,
          `"${emp.Name}"`, // Wrap text fields in quotes for safety
          emp.Email,
          emp.Department,
          emp.Role,

          emp.Status,
          `"${emp["Joining_Date"]}"`,
          emp.Salary
        ].join(",")
      )
    ];

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "employees.csv");
    link.click();
  };


  return (
    <div className="p-4">
      <SearchBar onSearch={setSearchQuery} />
      <Filters
        onFilterChange={(type, value) => {
          if (type === "status") setStatusFilter(value);
          if (type === "department") setDepartmentFilter(value);
        }}
        departments={uniqueDepartments}
      />
      <div className="flex justify-end mb-4">
        <button
          onClick={handleExportCSV}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Export CSV
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:border-gray-600 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 flex flex-row items-center cursor-pointer" onClick={() => handleSort("Name")}>Name <FaSort /></th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Department</th>
              <th scope="col" className="px-6 py-3">Role</th>
              <th scope="col" className="px-6 py-3 flex flex-row items-center cursor-pointer" onClick={() => handleSort("Joining_Date")}>Joining Date <FaSort /></th>
              <th scope="col" className="px-6 py-3" >Status</th>
              <th scope="col" className="px-6 py-3 flex flex-row items-center cursor-pointer" onClick={() => handleSort("Salary")}>Salary <FaSort /></th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((emp) => (
              <tr key={emp.Id} onClick={() => handleRowClick(emp)} className="bg-white cursor-pointer border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <td className="px-6 py-4">{emp.Name}</td>
                <td className="px-6 py-4">{emp.Email}</td>
                <td className="px-6 py-4">{emp.Department}</td>
                <td className="px-6 py-4">{emp.Role}</td>
                <td className="px-6 py-4">{emp.Joining_Date}</td>
                <td className="px-6 py-4">{emp.Status}</td>
                <td className="px-6 py-4">${emp.Salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-white"}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <EmployeeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} employee={selectedEmployee} />
    </div>
  );
};

export default EmployeeTable;
