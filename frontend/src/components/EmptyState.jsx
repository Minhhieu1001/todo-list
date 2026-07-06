import React from 'react';

const EmptyState = ({ message = "No tasks found" }) => {
  return (
    <div className="empty-state">
      <div className="empty-icon"></div>
      <h3 className="empty-title">All caught up!</h3>
      <p>{message}</p>
    </div>
  );
};

export default EmptyState;
