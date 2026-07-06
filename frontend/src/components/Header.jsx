import React from 'react';

const Header = ({ totalTasks, completedTasks }) => {
  return (
    <header className="header">
      <h1 className="header-title">Todo Manager</h1>
      <div className="header-stats">
        <span className="stat-badge">Total Tasks: {totalTasks}</span>
        <span className="stat-badge completed">Completed: {completedTasks}</span>
      </div>
    </header>
  );
};

export default Header;
