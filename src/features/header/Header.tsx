import React, { FC } from 'react';
import {
    Link
} from "react-router-dom";

import socketIOClient from 'socket.io-client'

const Header: FC = (props) => {

    console.log(props)
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Poumki</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item ">
                            <Link className="nav-link" to="/users/add">Add User</Link>
                        </li>
                        <li className="nav-item ">
                            <Link className="nav-link" to="/users">List Users</Link>
                        </li>

                        <li className="nav-item ">
                            <Link className="nav-link" to="/detection">Person Detection</Link>
                        </li>

                    </ul>
                </form>
            </div>
        </nav>
    );
};

export default Header;
