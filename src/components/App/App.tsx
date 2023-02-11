import React from 'react';
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Main from "../pages/Main";
import List from "../List";

function App() {
    const router = createBrowserRouter([{
        path: '/',
        element: <Main/>
    },
        {
            path: '/:day',
            element: <List/>
        }])
    return (
        <RouterProvider router={router}/>
    )

}

export default App;
