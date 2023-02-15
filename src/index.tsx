import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reducer from './redux/reducer';
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import { StoreType } from './redux/reducer.typing';
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';
import Main from './pages/Main';
import { Button, Result } from 'antd';
import Calendar from './components/Calendar';
import EventList from './components/EventList';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

function saveToLocalStorage(state: StoreType) {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem('persistantState', serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem('persistantState');
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}
const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: (
      <Result
        status="404"
        title="Страница не найдена"
        subTitle="Что-то пошло не так"
        extra={
          <Link to={'/'}>
            <Button type="primary">Вернуться на домашнюю страницу</Button>
          </Link>
        }
      />
    ),
    children: [
      { path: '/', element: <Calendar /> },
      { path: '/:day', element: <EventList /> },
    ],
  },
]);

const store = createStore(reducer, loadFromLocalStorage());
store.subscribe(() => saveToLocalStorage(store.getState()));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
