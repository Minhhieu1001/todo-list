package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class TodoRequest {
    @NotBlank(message = "Tieu de cong viec khong duoc de trong")
    @Size(max = 150, message = "Tieu de cong viec khong duoc vuot qua 150 ky tu")
    private String title;

    @Size(max = 1000, message = "Mo ta cong viec khong duoc vuot qua 1000 ky tu")
    private String description;

    private Boolean completed;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }
}
