import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Space, Table, Tag, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { coursesService } from '../../services/course.service';

const getColumns = (deleteHandler) => [
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
                <Link to={`edit/${record.id}`}>
                    <Button icon={<EditOutlined />}></Button>
                </Link>

                <Popconfirm
                    title="Delete the product"
                    description={`Are you sure to delete the ${record.name}?`}
                    onConfirm={(event) => deleteHandler(record.id, event)} // Pass the event object
                    okText="Yes"
                    cancelText="No"
                >
                    <Button danger icon={<DeleteOutlined />}></Button>
                </Popconfirm>

            </Space>
        ),
    },
];

export default function Courses() {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    const deleteHandler = async (id, event) => {
        // Prevent event propagation
        event.stopPropagation();

        const res = await coursesService.delete(id);
        if (res.status < 300) {
            message.success('Course deleted successfully');
            setCourses(courses.filter(x => x.id !== id));
        } else {
            message.error('Something went wrong!');
        }
    };


    const loadCourses = async () => {
        const res = await coursesService.getAll();
        setCourses(res.data);
    };

    useEffect(() => {
        loadCourses();
    }, []);

    return (
        <>
            <Button style={{ marginBottom: 10 }} type="primary">
                <Link to="create">Create New Product</Link>
            </Button>
            <Table
                columns={getColumns(deleteHandler)}
                pagination={{ pageSize: 10 }}
                dataSource={courses}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            const actionColumnIndex = 5;
                            const targetElement = event.target;

                            let isActionColumnClicked = false;
                            let currentElement = targetElement;
                            while (currentElement) {
                                if (currentElement.tagName === 'TD' && currentElement.cellIndex === actionColumnIndex) {
                                    isActionColumnClicked = true;
                                    break;
                                }
                                currentElement = currentElement.parentElement;
                            }

                            if (!isActionColumnClicked) {
                                navigate(`info/${record.id}`);
                            }
                        }
                    };
                }}
            />

        </>
    );
}
