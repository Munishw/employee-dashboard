import './App.css'
import EmployeeTable from './components/EmployeeTable';
import ChartPanel from './components/ChartPanel';
import employees from './assets/employee.json';
import { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

function App() {
 const [darkMode, setDarkMode] = useState(false);

  // Persist Theme on Reload
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };
  return (
     <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl md:text-3xl font-bold">Employee Management Dashboard</h1>
           <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
          >
            {darkMode ? <FaSun className="w-6 h-6 text-yellow-400" /> : <FaMoon className="w-6 h-6 text-gray-800" />}
          </button>
        </div>
        <ChartPanel employees={employees} />
        <EmployeeTable />
      </div>
    </div>
  )
}

export default App
