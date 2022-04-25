package com.library.backend.services.impl;

import com.library.backend.models.Author;
import com.library.backend.models.Book;
import com.library.backend.models.dto.BookDto;
import com.library.backend.models.enumartions.Category;
import com.library.backend.models.exceptions.AuthorNotFoundException;
import com.library.backend.models.exceptions.BookNotFoundException;
import com.library.backend.models.exceptions.CategoryNotFoundException;
import com.library.backend.models.exceptions.CustomConflictException;
import com.library.backend.repositories.AuthorRepository;
import com.library.backend.repositories.BookRepository;
import com.library.backend.services.BookService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;

    public BookServiceImpl(BookRepository bookRepository,
                           AuthorRepository authorRepository) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
    }


    @Override
    public Page<Book> findAll(Integer limit, Integer offset) {
        Pageable pageable = PageRequest.of(limit, offset);
        return this.bookRepository.findAll(pageable);
    }

    @Override
    public Optional<Book> findById(Long id) {
        return this.bookRepository.findById(id);
    }

    @Override
    public Optional<Book> save(BookDto bookDto) {
        int categoryCount = (int) Arrays.stream(Category.values())
                .filter(c -> c.toString().equalsIgnoreCase(bookDto.getCategory().toString()))
                .count();
        if (categoryCount == 0) {
            throw new CategoryNotFoundException();
        }

        Author author = this.authorRepository.findById(bookDto.getAuthorId())
                .orElseThrow(AuthorNotFoundException::new);

        return Optional.of(this.bookRepository.save(new Book(bookDto.getName(), bookDto.getCategory(), author, bookDto.getAvailableCopies())));
    }

    @Override
    public Optional<Book> lendBookById(Long id) {
        Book book = this.bookRepository.findById(id)
                .orElseThrow(BookNotFoundException::new);

        if (book.getAvailableCopies() > 0) {
            book.setAvailableCopies(book.getAvailableCopies() - 1);
        } else {
            throw new CustomConflictException();
        }

        return Optional.of(this.bookRepository.save(book));
    }

    @Override
    public Optional<Book> edit(Long id, BookDto bookDto) {
        Book book = this.bookRepository.findById(id)
                .orElseThrow(BookNotFoundException::new);

        Author author = this.authorRepository.findById(bookDto.getAuthorId())
                .orElseThrow(AuthorNotFoundException::new);

        book.setName(bookDto.getName());
        book.setAuthor(author);
        book.setCategory(bookDto.getCategory());
        book.setAvailableCopies(bookDto.getAvailableCopies());

        return Optional.of(this.bookRepository.save(book));
    }

    @Override
    public void delete(Long id) {
        this.bookRepository.deleteById(id);
    }
}
