import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import TodoForm from '../components/TodoForm';
import SearchBar from '../components/SearchBar';
import FilterSelect from '../components/FilterSelect';
import TodoList from '../components/TodoList';
import { todoApi } from '../services/todoApi';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [loading, setLoading] = useState(true);

  // Fetch todos từ backend khi component mount hoặc khi search/filter thay đổi
  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, filterStatus]);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      // Ánh xạ trạng thái filter thành boolean nếu cần
      let completedParam = null;
      if (filterStatus === 'Completed') completedParam = true;
      if (filterStatus === 'Pending') completedParam = false;
      
      const data = await todoApi.getTodos(searchQuery || null, completedParam);
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Thêm Task mới
  const handleAddTask = async ({ title, description }) => {
    try {
      const newTask = await todoApi.createTodo({ title, description });
      setTodos([newTask, ...todos]);
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  // Toggle trạng thái hoàn thành
  const handleToggleTask = async (id) => {
    try {
      const todoToUpdate = todos.find(t => t.id === id);
      if (!todoToUpdate) return;
      
      const updatedTodo = await todoApi.updateCompleted(id, !todoToUpdate.completed);
      setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  // Sửa Task
  const handleEditTask = async (id, updatedData) => {
    try {
      // Backend update endpoint yêu cầu toàn bộ field (PUT)
      // Lấy data hiện tại gộp với updateData
      const todoToUpdate = todos.find(t => t.id === id);
      if (!todoToUpdate) return;

      const requestData = {
        title: updatedData.title,
        description: updatedData.description,
        completed: todoToUpdate.completed
      };

      const updatedTodo = await todoApi.updateTodo(id, requestData);
      setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  // Xóa Task
  const handleDeleteTask = async (id) => {
    try {
      await todoApi.deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const totalTasks = todos.length;
  const completedTasks = todos.filter(t => t.completed).length;

  return (
    <div className="container">
      <Header 
        totalTasks={totalTasks} 
        completedTasks={completedTasks} 
      />
      
      <TodoForm onAddTask={handleAddTask} />
      
      <div className="controls-row">
        <SearchBar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />
        <FilterSelect 
          filterStatus={filterStatus} 
          setFilterStatus={setFilterStatus} 
        />
      </div>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
          Loading tasks...
        </div>
      ) : (
        <TodoList 
          todos={todos} 
          onToggle={handleToggleTask}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
};

export default Home;
