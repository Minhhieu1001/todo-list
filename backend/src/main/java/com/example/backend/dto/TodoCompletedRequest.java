package com.example.backend.dto;

import jakarta.validation.constraints.NotNull;

public class TodoCompletedRequest {
    @NotNull(message = "Trang thai completed la bat buoc")
    private Boolean completed;

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }
}
