import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reducer from "./redux/reducer";
import {createStore} from "redux";
import {Provider} from "react-redux";
import App from "./components/App";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const store = createStore(reducer)
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);


//TODO переделать удаление на айди
//TODO сделать формы для добавления/редактирования событий
//TODO сделать страницу списка событий на день
//TODO сделать страницу для календаря
//TODO сделать события на месяц
//TODO добавить роутинг
//TODO добавить лоадеры
//TODO добавить уведомления


