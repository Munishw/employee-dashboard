const Filters = ({ onFilterChange, departments }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <select onChange={(e) => onFilterChange("status", e.target.value)} className="dark:bg-gray-800 dark:border-gray-700 p-2 border rounded w-full md:w-1/2">
        <option value="">All Status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      <select onChange={(e) => onFilterChange("department", e.target.value)} className="dark:bg-gray-800 dark:border-gray-700 p-2 border rounded w-full md:w-1/2">
        <option value="">All Departments</option>
        {departments.map((dept, idx) => (
          <option key={idx} value={dept}>{dept}</option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
