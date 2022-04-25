import {useEffect, useState} from "react";
import CategoryService from "../services/CategoryService";

const CategoryList = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategories()
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

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-12 mb-3">
                    <div className="row">
                        <div className="col-12">
                            <h2>Categories</h2>
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
                                </tr>
                                </thead>
                                <tbody>
                                {categories.map((category, i) => {
                                    return (
                                        <tr>
                                            <td>{category.toString()}</td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryList