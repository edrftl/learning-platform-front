import React, { useState } from 'react';

import { Layout, theme } from 'antd';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
const { Header: AntHeader } = Layout;
//const { Content, Footer, Sider } = Layout;


const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout hasSider>
      <Header />
      <Layout
        style={{
          marginLeft: 200,
        }}
      >
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