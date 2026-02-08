import { useState } from "react";

function ExpenseSearch({ onSearch, onClear }) {
  const [filters, setFilters] = useState({
    title: "",
    category: "",
    paymentMode: "",
    fromDate: "",
    toDate: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearchClick = () => {
    const cleanedFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== "")
    );
    onSearch(cleanedFilters);
  };

 return (
   <div style={{ marginBottom: "20px" }}>
     <h3>Search & Filter</h3>

     <div className="search-box">
       <input
         name="title"
         placeholder="Title"
         value={filters.title}
         onChange={handleChange}
       />

       <input
         name="category"
         placeholder="Category"
         value={filters.category}
         onChange={handleChange}
       />

       <select
         name="paymentMode"
         value={filters.paymentMode}
         onChange={handleChange}
       >
         <option value="">Payment Mode</option>
         <option value="Cash">Cash</option>
         <option value="UPI">UPI</option>
         <option value="Card">Card</option>
       </select>

       <input
         type="date"
         name="fromDate"
         value={filters.fromDate}
         onChange={handleChange}
       />

       <input
         type="date"
         name="toDate"
         value={filters.toDate}
         onChange={handleChange}
       />

       <button onClick={() => onSearch(filters)}>Search</button>
       <button onClick={onClear} style={{ marginLeft: "10px" }}>
         Clear
       </button>
     </div>
   </div>
 );

}

export default ExpenseSearch;
