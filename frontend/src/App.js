import {BrowserRouter,Routes, Route} from 'react-router-dom'
import './App.css';
import BookList from "./components/BookList";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<BookList/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
