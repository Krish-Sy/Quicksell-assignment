import React from 'react';

const Header = ({ grouping, onGroupingChange, ordering, onOrderingChange }) => {
  return (
    <div className="header">
      <div>
        <label htmlFor="grouping-select">Grouping: </label>
        <select id="grouping-select" value={grouping} onChange={(e) => onGroupingChange(e.target.value)}>
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>
      </div>
      <div className="dropdown">
        <label htmlFor="ordering-select">Ordering: </label>
        <select id="ordering-select" value={ordering} onChange={(e) => onOrderingChange(e.target.value)}>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>
    </div>
  );
};

export default Header;
