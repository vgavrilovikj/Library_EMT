import axios from "../utils/axios";

const getAll = () => {
    return axios.get("/authors")
}

const AuthorService = {
    getAll
}

export default AuthorService