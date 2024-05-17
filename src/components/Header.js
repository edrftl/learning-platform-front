import React, { useState } from 'react';
import {
    BarChartOutlined,
    RiseOutlined,
    UserOutlined,
    CalendarOutlined,
    BookOutlined,
    HomeOutlined
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
    }
    // getItem('Main', '1', <BarChartOutlined />),
    // getItem('Progress', '2', <RiseOutlined />),
    // getItem('Homework', '3', <HomeOutlined />),
    // getItem('Educational Materials', '4', <BookOutlined />),
    // getItem('Schedule', '5', <CalendarOutlined />),
    // getItem('Profile', '6', <UserOutlined />),
];
const Header = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className="demo-logo-vertical" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>

    );
};
export default Header;