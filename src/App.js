import React, { useState } from 'react';

import { Layout, theme } from 'antd';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
const { Header: AntHeader } = Layout;
//const { Content, Footer, Sider } = Layout;


const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Header />
      <Layout>
        <AntHeader
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Outlet />



      </Layout>
    </Layout>
  );
};
export default App;