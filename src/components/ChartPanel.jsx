import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#4ade80', '#f87171']; // Active - Green, Inactive - Red

const ChartPanel = ({ employees }) => {
  // Prepare Data for Department Count (Bar Chart)
  const departmentCounts = employees.reduce((acc, emp) => {
    acc[emp.Department] = (acc[emp.Department] || 0) + 1;
    return acc;
  }, {});

  const departmentData = Object.keys(departmentCounts).map(dept => ({
    department: dept,
    count: departmentCounts[dept],
  }));

  // Prepare Data for Active vs Inactive Ratio (Pie Chart)
  const statusCounts = employees.reduce((acc, emp) => {
    acc[emp.Status] = (acc[emp.Status] || 0) + 1;
    return acc;
  }, {});

  const statusData = Object.keys(statusCounts).map(status => ({
    name: status,
    value: statusCounts[status],
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8 px-2 md:px-0">
      {/* Bar Chart */}
      <div className="w-full h-72">
        <h2 className="text-xl font-semibold mb-2">Employee Count per Department</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={departmentData}>
            <XAxis dataKey="department" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="w-full h-72">
        <h2 className="text-xl font-semibold mb-2">Active vs Inactive Employees</h2>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartPanel;
