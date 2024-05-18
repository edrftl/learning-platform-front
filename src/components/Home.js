import { Button, Space, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        render: (text) => <span>{text}$</span>,
    },
    {
        title: 'Discount',
        dataIndex: 'discount',
        key: 'discount',
        render: (text) => text > 0 ? <Tag color="geekblue">{text}%</Tag> : "-",
    },
    {
        title: 'Category',
        dataIndex: 'categoryName',
        key: 'categoryName'
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>Show</a>
                <a>Edit</a>
                <a>Delete</a>
            </Space>
        ),
    },
];

const api = "https://localhost:7019/api/Course/all";

export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(api)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                console.log(data);
                setProducts(data);
            })
            .catch(error => {
                console.error('Failed to fetch data:', error);
            });
    }, []);

    return (
        <>
            <Button style={{ marginBottom: 10 }} type="primary">
                <Link to="create">
                    Create New Product
                </Link>
            </Button>
            <Table columns={columns} pagination={{ pageSize: 20 }} dataSource={products} />
        </>
    );
}
