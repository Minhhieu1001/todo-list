package com.example.backend.service.impl;

import com.example.backend.dto.TodoRequest;
import com.example.backend.dto.TodoResponse;
import com.example.backend.entity.Todo;
import com.example.backend.repository.TodoRepository;
import com.example.backend.service.TodoService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@Transactional
public class TodoServiceImpl implements TodoService {
    private final TodoRepository todoRepository;

    public TodoServiceImpl(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<TodoResponse> getTodos(String keyword, Boolean completed) {
        String normalizedKeyword = normalizeKeyword(keyword);
        return todoRepository.search(normalizedKeyword, completed)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public TodoResponse getTodo(Long id) {
        return toResponse(findTodo(id));
    }

    @Override
    public TodoResponse createTodo(TodoRequest request) {
        Todo todo = Todo.builder()
                .title(request.getTitle().trim())
                .description(normalizeText(request.getDescription()))
                .completed(request.getCompleted() != null ? request.getCompleted() : false)
                .build();
        return toResponse(todoRepository.save(todo));
    }

    @Override
    public TodoResponse updateTodo(Long id, TodoRequest request) {
        Todo todo = findTodo(id);
        todo.setTitle(request.getTitle().trim());
        todo.setDescription(normalizeText(request.getDescription()));
        if (request.getCompleted() != null) {
            todo.setCompleted(request.getCompleted());
        }
        return toResponse(todo);
    }

    @Override
    public TodoResponse updateCompleted(Long id, boolean completed) {
        Todo todo = findTodo(id);
        todo.setCompleted(completed);
        return toResponse(todo);
    }

    @Override
    public void deleteTodo(Long id) {
        Todo todo = findTodo(id);
        todoRepository.delete(todo);
    }

    private Todo findTodo(Long id) {
        return todoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Khong tim thay cong viec voi id: " + id));
    }

    private TodoResponse toResponse(Todo todo) {
        return new TodoResponse(
                todo.getId(),
                todo.getTitle(),
                todo.getDescription(),
                todo.getCompleted(),
                todo.getCreatedAt(),
                todo.getUpdatedAt()
        );
    }

    private String normalizeKeyword(String keyword) {
        if (keyword == null || keyword.isBlank()) {
            return null;
        }
        return keyword.trim();
    }

    private String normalizeText(String text) {
        if (text == null || text.isBlank()) {
            return null;
        }
        return text.trim();
    }
}
