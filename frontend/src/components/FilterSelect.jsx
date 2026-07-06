import React from 'react';

const FilterSelect = ({ filterStatus, setFilterStatus }) => {
  return (
    <select 
      className="input-control filter-select"
      value={filterStatus}
      onChange={(e) => setFilterStatus(e.target.value)}
    >
      <option value="All">All Tasks</option>
      <option value="Pending">Pending</option>
      <option value="Completed">Completed</option>
    </select>
  );
};

export default FilterSelect;
