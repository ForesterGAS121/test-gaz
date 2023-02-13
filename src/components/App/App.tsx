import React, {useEffect} from 'react';
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Main from "../pages/Main";
import List from "../List";
import {notification} from "antd";
import {useSelector} from "react-redux";
import {EventType, StoreType} from "../../redux/reducer.typing";
import dayjs from "dayjs";

function App() {

    const [api, contextHolder] = notification.useNotification();
    const listToday = useSelector((store: StoreType) => store.events[dayjs(new Date()).format('YYYY-MM-DD')])
    const firstEvent = listToday ? listToday.sort((a, b) => a.start.unix() - b.start.unix())[0] : null
    console.log(firstEvent)
    useEffect(() => {
        if (firstEvent) {
            setTimeout(() => openNotification(firstEvent), firstEvent.notification.valueOf() - Date.now())
        }
    }, [listToday])
    const openNotification = (event: EventType) => {
        api.info({
            message: `Notification`,
            description: <div>{event.title}</div>,
            placement: 'topRight',
        });
    };

    const router = createBrowserRouter([{
        path: '/',
        element: <Main/>
    },
        {
            path: '/:day',
            element: <List/>
        }])
    return (
        <>
            {contextHolder}
            <RouterProvider router={router}/>
        </>
    )

}

export default App;
