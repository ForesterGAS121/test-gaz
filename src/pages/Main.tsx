import React from 'react';
import { Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import Notification from '../components/Notification';

export const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea',
};

export const contentStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#fff',
  padding: '30px',
};

const Main = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={headerStyle}>
        <div style={{ width: '1280px', display: 'flex', alignItems: 'center', height: '100%' }}>
          <h1 style={{ margin: 0, fontSize: '22px' }}>
            <Link style={{ color: 'white', margin: 0 }} to={'/'}>
              Календарь
            </Link>
          </h1>
        </div>
      </Header>
      <Content style={contentStyle}>
        <Outlet />
      </Content>
      <Notification />
    </Layout>
  );
};

export default Main;
