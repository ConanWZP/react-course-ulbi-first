import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import About from "./UI/pages/About";
import Posts from "./UI/pages/Posts.tsx";
import Error from "./UI/pages/Error";
import PostIdPage from "./UI/pages/PostIdPage";
import {privateRoutes, publicRoutes} from "../router/routes";
import {AuthContext} from "../context";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext)
    console.log(isAuth)

    if (isLoading) {
        return <Loader />
    }

    return (
        isAuth ? <Routes>
                    {/*<Route path='/about' element={<About />} />
            <Route path='/posts/:id' element={<PostIdPage />} />
            <Route path='/posts' element={<Posts />} />
            <Route path='/error' element={<Error />} />*/}
                    {privateRoutes.map(route => (
                        <Route key={route.path} path={route.path} element={<route.element/>} />
                    ))}
                    <Route path='/*' element={<Navigate to='/posts' />} />
                </Routes>

             :   <Routes>
                    {/*<Route path='/about' element={<About />} />
            <Route path='/posts/:id' element={<PostIdPage />} />
            <Route path='/posts' element={<Posts />} />
            <Route path='/error' element={<Error />} />*/}
                    {publicRoutes.map(route => (
                        <Route key={route.path} path={route.path} element={<route.element/>} />
                    ))}
                    <Route path='/*' element={<Navigate to='/login' />} />
                </Routes>


    );
};

export default AppRouter;