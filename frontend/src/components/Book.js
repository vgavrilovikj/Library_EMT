import { Link } from "react-router-dom";

const Book = props => {
    return (
        <tr>
            <td>{props.book.name}</td>
            <td>{props.book.category}</td>
            <td>{props.book.author.name} {props.book.author.surname}</td>
            <td>{props.book.availableCopies}</td>
            {/*<td className={"text-right"}>*/}
            {/*    <button title={"Delete"} className={"btn btn-danger"} onClick={() => props.onDelete(props.book.id)}>Delete</button>*/}
            {/*    <Link title={"Edit"} className={"btn btn-info"} onClick={() => props.onEdit(props.book.id)} to={`/books/edit/${props.book.id}`}>Edit</Link>*/}
            {/*    <button title={"Mark as Taken"} className={"btn btn-success"} onClick={() => props.onMark(props.book.id)}>Mark as Taken</button>*/}
            {/*</td>*/}
        </tr>
    )
}

export default Book