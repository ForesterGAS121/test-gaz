import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Result } from 'antd';

const ErrorPage = () => {
  return (
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
  );
};

export default ErrorPage;
