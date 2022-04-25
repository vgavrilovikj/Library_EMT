import React from "react";

const Navigation = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container d-flex justify-content-between">
                <a className="navbar-brand" href="/">Home</a>
                <div id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-link" href="/books">Books</a>
                        <a className="nav-link" href="/categories">Categories</a>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;