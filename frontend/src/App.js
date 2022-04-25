import {BrowserRouter,Routes, Route} from 'react-router-dom'
import './App.css';
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import EditBook from "./components/EditBook";
import CategoryList from "./components/CategoryList";
import Navigation from "./components/Navigation";

function App() {
    return (
        <BrowserRouter>
           <Navigation/>
            <div>
                <Routes>
                    <Route exact path='/' element={<BookList/>}/>
                    <Route exact path='/categories' element={<CategoryList/>}/>
                    <Route exact path='/books' element={<BookList/>}/>
                    <Route exact path='/books/add' element={<AddBook/>}/>
                    <Route exact path='/books/:id' element={<EditBook/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
