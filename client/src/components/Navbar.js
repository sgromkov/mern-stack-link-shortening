import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

export const Navbar = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);

    const logoutHandler = () => {
        auth.logout();
        history.push('/');
    };

    return (
        <nav>
            <div class="nav-wrapper blue darken-1" style={{ padding: '0 2rem'}}>
                <span class="brand-logo">Сокращение ссылок</span>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li><NavLink to="/create">Создать</NavLink></li>
                    <li><NavLink to="/links">Ссылки</NavLink></li>
                    <li><button onClick={logoutHandler} className="btn">Выйти</button></li>
                </ul>
            </div>
        </nav>
    );
}