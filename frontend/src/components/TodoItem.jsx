import React, { useState } from 'react';

const TodoItem = ({ todo, onToggle, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDesc, setEditDesc] = useState(todo.description);

  const handleSave = () => {
    if (editTitle.trim()) {
      onEdit(todo.id, { title: editTitle, description: editDesc });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDesc(todo.description);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="todo-card">
        <div className="todo-content" style={{ width: '100%' }}>
          <div className="input-group">
            <input
              type="text"
              className="input-control"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              autoFocus
            />
          </div>
          <div className="input-group">
            <textarea
              className="input-control"
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <button className="btn btn-primary" onClick={handleSave}>Save</button>
            <button className="btn btn-icon" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`todo-card ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-checkbox">
        <input
          type="checkbox"
          className="checkbox-custom"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
      </div>
      
      <div className="todo-content">
        <h3 className="todo-title">{todo.title}</h3>
        {todo.description && <p className="todo-desc">{todo.description}</p>}
        
        <div className="todo-meta">
          <span className={`todo-status ${todo.completed ? 'status-completed' : 'status-pending'}`}>
            {todo.completed ? 'Completed' : 'Pending'}
          </span>
          <span className="todo-date">Created: {todo.createdAt}</span>
        </div>
      </div>

      <div className="todo-actions">
        <button className="btn-icon" onClick={() => setIsEditing(true)} title="Edit">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
          </svg>
        </button>
        <button className="btn-icon delete" onClick={() => onDelete(todo.id)} title="Delete">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
