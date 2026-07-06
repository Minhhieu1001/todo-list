import React from 'react';
import TodoItem from './TodoItem';
import EmptyState from './EmptyState';

const TodoList = ({ todos, onToggle, onEdit, onDelete }) => {
  if (!todos || todos.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;
