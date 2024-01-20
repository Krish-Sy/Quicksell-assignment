import React from 'react';

const GroupingOrderingControls = ({ onGroupingChange, onOrderingChange }) => {
  return (
    <div className="grouping-ordering-controls" >
      <div className="dropdown">
        <label htmlFor="grouping">Grouping</label>
        <select id="grouping" onChange={e => onGroupingChange(e.target.value)}>
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>
      </div>
      <div className="dropdown">
        <label htmlFor="ordering">Ordering</label>
        <select id="ordering" onChange={e => onOrderingChange(e.target.value)}>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>
    </div>
  );
};

export default GroupingOrderingControls;
