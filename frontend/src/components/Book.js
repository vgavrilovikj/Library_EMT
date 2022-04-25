import {Link} from "react-router-dom";

const Book = props => {
    return (
        <tr>
            <td>{props.book.name}</td>
            <td>{props.book.category}</td>
            <td>{props.book.author.name} {props.book.author.surname}</td>
            <td>{props.book.availableCopies}</td>
            <td>
                <Link className="btn btn-secondary me-3" to={`/books/${props.book.id}`}>Edit</Link>
                <button className="btn btn-warning me-3" onClick={() => props.markAsTaken(props.book.id)}>Mark as Taken</button>
                <button type="button" className="btn btn-danger" onClick={() => props.onDelete(props.book.id)}>Delete</button>
            </td>
        </tr>
    )
}

export default Book