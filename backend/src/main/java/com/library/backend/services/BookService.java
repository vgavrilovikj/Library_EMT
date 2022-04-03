package com.library.backend.services;

import com.library.backend.models.Book;
import com.library.backend.models.dto.BookDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface BookService {
    Page<Book> findAll(Integer limit, Integer offset);
    Optional<Book> findById(Long id);
    Optional<Book> save(BookDto bookDto);
    Optional<Book> lendBookById(Long id);
    Optional<Book> edit (Long id, BookDto bookDto);
    void delete(Long id);
}
