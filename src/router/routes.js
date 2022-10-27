import {Navigate, Route} from "react-router-dom";
import About from "../components/UI/pages/About";
import PostIdPage from "../components/UI/pages/PostIdPage";
import Posts from "../components/UI/pages/Posts.tsx";
import Error from "../components/UI/pages/Error";
import React from "react";
import Login from "../components/UI/pages/Login";


export const privateRoutes = [
    {path: '/about', element: About},
        {path: '/posts/:id', element: PostIdPage},
        {path: '/posts', element: Posts},
        {path: '/error', element: Error},
        {path: '/*', element: Posts},
]

export const publicRoutes = [
    {path: '/login', element: Login},
]
