package com.library.backend.models.dto;

import com.library.backend.models.enumartions.Category;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class BookDto {
    @NotNull(message = "Book name is required")
    String name;
    @NotNull(message = "Category of the book is required")
    Category category;
    @NotNull(message = "Author is required")
    Long authorId;
    @NotNull(message = "No. of available copies is required")
    Integer availableCopies;
}
