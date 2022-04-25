import {useEffect, useState} from "react";
import Book from "../models/Book";
import BookService from "../services/BookService";
import CategoryService from "../services/CategoryService";
import AuthorService from "../services/AuthorService";

const AddBook = () => {
    const initialBookState = {
        id: null,
        name: undefined,
        category: undefined,
        authorId: null,
        availableCopies: 1,
    }

    const [book, setBook] = useState(initialBookState)
    const [submitted, setSubmitted] = useState(false)
    const [categories, setCategories] = useState([])
    const [authors, setAuthors] = useState([])

    useEffect(() => {
        getCategories()
        getAuthors()
    }, [])

    const getCategories = () => {
        CategoryService.getAll()
            .then(response => {
                setCategories(response.data)
            })
            .catch(e => {
                console.log(e)
            })
    }

    const getAuthors = () => {
        AuthorService.getAll()
            .then(response => {
                setAuthors(response.data)
            })
            .catch(e => {
                console.log(e)
            })
    }

    const handleInputChange = event => {
        const name = event.target.name
        const value = event.target.value
        setBook({...book, [name]: value})
    }

    const saveBook = event => {
        event.preventDefault()

        const bookToSave = new Book(book.name, book.category, book.authorId, book.availableCopies)
        BookService.add(bookToSave)
            .then(response => {
                setBook({
                    id: response.data.id,
                    name: response.data.name,
                    category: response.data.category,
                    authorId: response.data.author.id,
                    availableCopies: response.data.availableCopies,
                })

                setSubmitted(true)
            })
            .catch(e => {
                console.log(e)
            })
    }

    const newBook = () => {
        setBook(initialBookState)
        setSubmitted(false)
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-12 mb-3">
                    <div className="row">
                        <div className="col-12">
                            <h2>Add Book</h2>
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <div className="submit-form">
                        {
                            submitted ? (
                                <div>
                                    <h3>Book added successfully</h3>
                                    <button className="btn btn-success" onClick={newBook}>Add Book</button>
                                </div>
                            ) : (
                                <div>
                                    <form onSubmit={saveBook}>
                                        <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                required
                                                value={book.name}
                                                onChange={handleInputChange}
                                                name="name"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="category">Category</label>
                                            <select name="category" id="category" className="form-control"
                                                    onChange={handleInputChange}>
                                                {categories.map((category) =>
                                                    <option value={book.category = category} key={category}>{category}</option>
                                                )}
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="authorId">Author</label>
                                            <select name="authorId" id="authorId" className="form-control"
                                                    onChange={handleInputChange}>
                                                {authors.map((author) =>
                                                    <option value={book.authorId = author.id}
                                                            key={author.id}>{author.name} {author.surname}</option>
                                                )}
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="availableCopies">Available Copies</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="availableCopies"
                                                required
                                                value={book.availableCopies}
                                                onChange={handleInputChange}
                                                name="availableCopies"
                                                min={1}
                                            />
                                        </div>

                                        <button type="submit" className="btn btn-success mt-3">Save</button>
                                    </form>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )

}

export default AddBook