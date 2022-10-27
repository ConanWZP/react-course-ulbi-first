import React from 'react';
import {NavLink} from "react-router-dom";
import './../../../Styles/App.css'
import MyButton from "../button/MyButton";
import {useContext} from "react";
import {AuthContext} from "../../../context";

const Navbar = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext)
    const logout = () => {
        setIsAuth(false)
        localStorage.removeItem('auth')
    }

    return (
        <div className='navbar'>
            <MyButton onClick={logout}>
                Выйти
            </MyButton>
            <div className="navbar__links">
                <NavLink to='/about'>О сайте</NavLink>
                <NavLink to='/posts'>Посты</NavLink>
            </div>
        </div>
    );
};

export default Navbar;