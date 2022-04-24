import axios from "../utils/axios";

const getAll = () => {
    return axios.get("/books")
}

const getAllPaginate = (limit) => {
    return axios.get(`/books?limit=${limit}&offset=5`)
}

const get = id => {
    return axios.get(`/books/${id}`)
}

const add = book => {
    return axios.post(`/books`, book)
}

const edit = (id, book) => {
    return axios.put(`/books/${id}`, book)
}

const lend = id => {
    return axios.put(`/books/${id}/lend`)
}

const remove = id => {
    return axios.delete(`/books/${id}`)
}

const BookService = {
    getAll,
    getAllPaginate,
    get,
    add,
    edit,
    lend,
    remove
}

export default BookService