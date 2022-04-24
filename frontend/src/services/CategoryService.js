import axios from "../utils/axios";

const getAll = () => {
    return axios.get("/categories")
}

const CategoryService = {
    getAll
}

export default CategoryService