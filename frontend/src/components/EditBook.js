import {useEffect, useState} from "react";
import BookService from "../services/BookService";
import CategoryService from "../services/CategoryService";
import AuthorService from "../services/AuthorService";
import {Link, useParams} from "react-router-dom";

const EditBook = props => {
    const {id} = useParams();

    const initialBookState = {
        id: null,
        name: undefined,
        category: undefined,
        authorId: null,
        availableCopies: 1,
    }

    const [currentBook, setCurrentBook] = useState(initialBookState)
    const [categories, setCategories] = useState([])
    const [authors, setAuthors] = useState([])
    const [message, setMessage] = useState("")

    const getBook = id => {
        BookService.get(id)
            .then(response => {
                setCurrentBook({
                    id: response.data.id,
                    name: response.data.name,
                    category: response.data.category,
                    authorId: response.data.author.id,
                    availableCopies: response.data.availableCopies
                })
            })
            .catch(e => {
                console.log(e)
            })
    }

    useEffect(() => {
        if (id)
            getBook(id)

        getCategories()
        getAuthors()
    }, [id])

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
        setCurrentBook({...currentBook, [name]: value})
    }

    const updateBook = event => {
        event.preventDefault()

        BookService.edit(currentBook.id, currentBook)
            .then(response => {
                setMessage("Book was updated succesfully")
            })
    }

    return (
        <div className="container mt-5">
            <div className="row">
                {
                    currentBook.id != null ? (
                        <div className="col-12 mb-3">
                            <div className="row">
                                <div className="col-12">
                                    <h2>Edit Book | {currentBook.name}</h2>
                                </div>
                            </div>
                        </div>
                    ) : (<></>)
                }

                <div className="col-12">
                    <div className="submit-form">
                        {
                            currentBook.id == null ? (
                                <div>
                                    <h3>Book not found</h3>
                                    <Link className="btn btn-block btn-dark mt-3" to={"/books"}>View books</Link>
                                </div>
                            ) : (
                                <div>
                                    <form onSubmit={updateBook}>
                                        <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                required
                                                value={currentBook.name}
                                                onChange={handleInputChange}
                                                name="name"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="category">Category</label>
                                            <select name="category" id="category" className="form-control"
                                                    onChange={handleInputChange}>
                                                {categories.map((category) =>
                                                    <option selected={currentBook.category === category}
                                                            value={category}
                                                            key={category}>{category}</option>
                                                )}
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="authorId">Author</label>
                                            <select name="authorId" id="authorId" className="form-control"
                                                    onChange={handleInputChange}>
                                                {authors.map((author) =>
                                                    <option selected={currentBook.authorId === author.id}
                                                            value={author.id}
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
                                                value={currentBook.availableCopies}
                                                onChange={handleInputChange}
                                                name="availableCopies"
                                                min={1}
                                            />
                                        </div>

                                        <button type="submit" className="btn btn-success mt-3">Update</button>
                                        <p>{message}</p>
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

export default EditBook