import React, { useState } from 'react';
import {
    BarChartOutlined,
    RiseOutlined,
    UserOutlined,
    CalendarOutlined,
    BookOutlined,
    HomeOutlined,
    ShopOutlined,
    ProductOutlined,
    GroupOutlined,
    PlusCircleOutlined,
    LoginOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom';
const { Sider } = Layout;

const items = [
    {
        key: 1,
        label: <Link to="/main">Main</Link>,
        icon: <BarChartOutlined />
    },
    {
        key: 2,
        label: <Link to="/progress">Progress</Link>,
        icon: <RiseOutlined />
    },
    {
        key: 3,
        label: <Link to="/homework">Homework</Link>,
        icon: <HomeOutlined />
    },
    {
        key: 4,
        label: <Link to="/educational-material">Educational Materials</Link>,
        icon: <BookOutlined />
    },
    {
        key: 5,
        label: <Link to="/schedule">Schedule</Link>,
        icon: <CalendarOutlined />
    },
    {
        key: 6,
        label: <Link to="/profile">Profile</Link>,
        icon: <UserOutlined />
    },
    {
        key: 7,
        label: <Link to="/catalog">Catalog</Link>,
        icon: <ShopOutlined />
    },
    {
        key: 8,
        label: <Link to="/course">Courses</Link>,
        icon: <ProductOutlined />
    },
    {
        key: 9,
        label: <Link to="/group">Groups</Link>,
        icon: <GroupOutlined />
    },
    {
        key: 10,
        label: <Link to="register">Register</Link>,
        icon: <PlusCircleOutlined />
    },
    {
        key: 11,
        label: <Link to="login">Login</Link>,
        icon: <LoginOutlined />
    },
    // getItem('Main', '1', <BarChartOutlined />),
    // getItem('Progress', '2', <RiseOutlined />),
    // getItem('Homework', '3', <HomeOutlined />),
    // getItem('Educational Materials', '4', <BookOutlined />),
    // getItem('Schedule', '5', <CalendarOutlined />),
    // getItem('Profile', '6', <UserOutlined />),
];
const Header = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Sider
            style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
            }}
        >
            <div className="demo-logo-vertical" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
        </Sider>

    );
};
export default Header;