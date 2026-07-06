package com.example.backend.controller;

import com.example.backend.dto.TodoCompletedRequest;
import com.example.backend.dto.TodoRequest;
import com.example.backend.dto.TodoResponse;
import com.example.backend.service.TodoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
public class TodoController {
    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public List<TodoResponse> getTodos(@RequestParam(required = false) String keyword,
                                       @RequestParam(required = false) Boolean completed) {
        return todoService.getTodos(keyword, completed);
    }

    @GetMapping("/{id}")
    public TodoResponse getTodo(@PathVariable Long id) {
        return todoService.getTodo(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TodoResponse createTodo(@Valid @RequestBody TodoRequest request) {
        return todoService.createTodo(request);
    }

    @PutMapping("/{id}")
    public TodoResponse updateTodo(@PathVariable Long id, @Valid @RequestBody TodoRequest request) {
        return todoService.updateTodo(id, request);
    }

    @PatchMapping("/{id}/completed")
    public TodoResponse updateCompleted(@PathVariable Long id, @Valid @RequestBody TodoCompletedRequest request) {
        return todoService.updateCompleted(id, request.getCompleted());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTodo(@PathVariable Long id) {
        todoService.deleteTodo(id);
    }
}
