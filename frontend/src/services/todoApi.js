import axios from 'axios';

// Thiết lập instance axios với base URL từ biến môi trường.
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const todoApi = {
  // Lấy danh sách todos, có thể truyền keyword và trạng thái completed
  getTodos: async (keyword, completed) => {
    const params = {};
    if (keyword) params.keyword = keyword;
    if (completed !== undefined && completed !== null) params.completed = completed;
    
    const response = await apiClient.get('/todos', { params });
    return response.data;
  },

  // Lấy chi tiết 1 todo
  getTodo: async (id) => {
    const response = await apiClient.get(`/todos/${id}`);
    return response.data;
  },

  // Tạo todo mới
  createTodo: async (todoData) => {
    const response = await apiClient.post('/todos', todoData);
    return response.data;
  },

  // Cập nhật toàn bộ todo
  updateTodo: async (id, todoData) => {
    const response = await apiClient.put(`/todos/${id}`, todoData);
    return response.data;
  },

  // Cập nhật trạng thái hoàn thành (Patch)
  updateCompleted: async (id, completed) => {
    const response = await apiClient.patch(`/todos/${id}/completed`, { completed });
    return response.data;
  },

  // Xóa todo
  deleteTodo: async (id) => {
    await apiClient.delete(`/todos/${id}`);
  }
};
