import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Pass query to parent component
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search by Name, Email, or Department"
        value={query}
        onChange={handleInputChange}
        className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
      />
    </div>
  );
};

export default SearchBar;
