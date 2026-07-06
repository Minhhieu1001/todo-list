package com.example.backend.service;

import com.example.backend.dto.TodoRequest;
import com.example.backend.dto.TodoResponse;

import java.util.List;

public interface TodoService {
    List<TodoResponse> getTodos(String keyword, Boolean completed);

    TodoResponse getTodo(Long id);

    TodoResponse createTodo(TodoRequest request);

    TodoResponse updateTodo(Long id, TodoRequest request);

    TodoResponse updateCompleted(Long id, boolean completed);

    void deleteTodo(Long id);
}
