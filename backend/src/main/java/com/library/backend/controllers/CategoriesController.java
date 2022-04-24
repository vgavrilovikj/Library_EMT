package com.library.backend.controllers;

import com.library.backend.models.Country;
import com.library.backend.models.enumartions.Category;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/categories")
public class CategoriesController {

    @GetMapping
    public List<Category> findAll() {
        return Arrays.asList(Category.values());
    }
}
