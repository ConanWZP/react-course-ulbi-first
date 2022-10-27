import React, {useEffect, useState} from 'react';
import {BrowserRouter, Link, NavLink, Route, Routes, Navigate} from "react-router-dom";
import Posts from "./components/UI/pages/Posts.tsx";
import About from "./components/UI/pages/About";
import Navbar from "./components/UI/Navbar/Navbar";
import Error from "./components/UI/pages/Error";
import AppRouter from "./components/AppRouter";
import {AuthContext} from "./context";

const App = () => {

    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setIsAuth(true);
        }
        setIsLoading(false)
    }, [])


    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            isLoading,
        }}>
            <BrowserRouter>
                <Navbar />
                <AppRouter />
            </BrowserRouter>
        </AuthContext.Provider>

    );
};

export default App;