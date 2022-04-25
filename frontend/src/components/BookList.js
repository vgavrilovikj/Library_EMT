import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import BookService from "../services/BookService";
import Book from "./Book";
import ReactPaginate from "react-paginate";

const BookList = () => {
    const [books, setBooks] = useState([])
    const [activePage, setActivePage] = useState(0)
    const [totalPages, setTotalPages] = useState(null)

    useEffect(() => {
        getBooks(activePage)
    }, [activePage])


    const getBooks = (page) => {
        BookService.getAllPaginate(page)
            .then(response => {
                setTotalPages(response.data.totalPages)
                setBooks(response.data.content)
            })
            .catch(e => {
                console.log(e)
            })
    }

    const handlePageChange = (event) => {
        setActivePage(event.selected)
    }

    const deleteBook = id => {
        BookService.remove(id)
            .then(response => {
                console.log(response.data)
                getBooks(activePage)
            })
            .catch(e => {
                console.log(e)
            })
    }

    const markBookAsTaken = id => {
        BookService.lend(id)
            .then(response => {
                console.log(response.data)
                getBooks(activePage)
            })
            .catch(e => {
                console.log(e)
            })
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-12 mb-3">
                    <div className="row">
                        <div className="col-lg-6">
                            <h2>Books</h2>
                        </div>
                        <div className="col-lg-6">
                            <Link className="btn btn-block btn-dark float-end" to={"/books/add"}> Add new book</Link>
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <div className="row">
                        <div className="col-12">
                            <table className="table table-dark table-striped table-hover">
                                <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Categories</th>
                                    <th scope="col">Author</th>
                                    <th scope="col">Available Copies</th>
                                    <th scope="col">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {books.map((book, i) => {
                                    return (
                                        <Book
                                            key={i}
                                            book={book}
                                            onDelete={deleteBook}
                                            markAsTaken={markBookAsTaken}
                                        />
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="next >"
                            onPageChange={handlePageChange}
                            pageRangeDisplayed={5}
                            pageCount={totalPages}
                            previousLabel="< previous"
                            containerClassName={"d-flex justify-content-center list-unstyled pagination"}
                            renderOnZeroPageCount={null}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookList