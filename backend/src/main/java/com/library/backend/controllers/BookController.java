package com.library.backend.controllers;

import com.library.backend.models.Book;
import com.library.backend.models.dto.BookDto;
import com.library.backend.services.BookService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/books")
public class BookController {
    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public Page<Book> findAll(
            @RequestParam(required = false, defaultValue = "0") Integer limit,
            @RequestParam(required = false, defaultValue = "5") Integer offset
    ) {
        return this.bookService.findAll(limit, offset);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> findById(@PathVariable Long id) {
        return this.bookService.findById(id)
                .map(book -> ResponseEntity.ok().body(book))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Book> save (@Valid @RequestBody BookDto bookDto) {
        return this.bookService.save(bookDto)
                .map(book -> ResponseEntity.ok().body(book))
                .orElseThrow();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Book> edit (
            @PathVariable Long id,
            @Valid @RequestBody BookDto bookDto) {
        return this.bookService.edit(id, bookDto)
                .map(book -> ResponseEntity.ok().body(book))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/lend")
    public ResponseEntity<Book> lend (@PathVariable Long id) {
        return this.bookService.lendBookById(id)
                .map(book -> ResponseEntity.ok().body(book))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete (@PathVariable Long id) {
        this.bookService.delete(id);
        if (this.bookService.findById(id).isEmpty()) {
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.badRequest().build();
    }
}
