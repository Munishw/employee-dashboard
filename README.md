# Employee Management Dashboard

A responsive web dashboard to display, filter, sort, and visualize employee data using **React.js**, **Vite**, **TailwindCSS**, and **Recharts**.

## 🌐 Live Demo
👉 [https://employee-dashboard.vercel.app](https://employee-dashboard.vercel.app)

---

## 📂 Project Structure
/src
├── components/
├── assets/employees.json
├── App.jsx
└── main.jsx
tailwind.config.js
vite.config.js
package.json


---

## 🛠️ Tech Stack
- **React.js + Vite**
- **Tailwind CSS**
- **Recharts** (Data Visualization)
- **React-Icons**
- **Context API / useState** (for state management)

---

## 🚀 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/employee-dashboard.git
cd employee-dashboard
npm install
npm run dev


Features
Display Employee Data in a Table with Pagination (10 per page)

Search Filter by Name, Email, Department

Sort by Name, Joining Date, Salary

Filter by Status (Active/Inactive) and Department Dropdowns

Employee Detail Modal (Responsive)

Edit Employee Status from Table is not done because json file is not editable, we can implement it with backend connectivity, here we are using only json file.

Export Filtered Data to CSV

Active vs Inactive Pie Chart

Employee Count per Department Bar Chart

Dark/Light Mode Toggle with Icon

Fully Responsive (Mobile, Tablet, Desktop)


Dataset
src/assets/employees.json

Deployment
This project is deployed on Vercel.
https://employee-dashboard-pi-drab.vercel.app/

Munishwaran Ramasamy
https://github.com/Munishw/employee-dashboard