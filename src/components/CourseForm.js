import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Select, Upload, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { coursesService } from '../services/course.service';
import { useForm } from 'antd/es/form/Form';

export default function CourseForm() {

    const [categories, setCategories] = useState([]);
    const params = useParams();
    const [form] = Form.useForm();
    const [editMode, setEditMode] = useState(false);
    const [course, setCourse] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        loadCourse();

        // TODO: use service
        fetch(process.env.REACT_APP_API + "Course/categories")
            .then(res => res.json())
            .then(data => {
                const options = data.map(x => { return { label: x.name, value: x.id }; });
                setCategories(options);
            });
    }, []);

    const loadCourse = async () => {
        if (params.id) {
            setEditMode(true);

            const res = await coursesService.get(params.id);
            setCourse(res.data);
            form.setFieldsValue(res.data);


        }
    };

    const onFinish = async (values) => {
        if (editMode) {
            // add neccessary data
            values.id = course.id;
            values.url = course.url;

            const res = await coursesService.edit(values);
            console.log(res);

            if (res.status < 300) {
                message.success("Product updated successfully!");
                navigate(-1);
            }
            else
                alert("Something went wrong!");
        }
        else {
            console.log(values);
            const res = await coursesService.create(values);

            if (res.status < 300) {
                message.success("Product created successfully!");
                navigate(-1);
            }
            else
                alert("Something went wrongwqew!");
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        // set original file
        return e?.file.originFileObj;
    };


    return (
        <>
            <Button onClick={() => navigate(-1)} type="text" icon={<ArrowLeftOutlined />}></Button>
            <h2 style={{ textAlign: "center" }}>{editMode ? "Edit" : "Create"} Course</h2>
            <Form
                name="basic"
                form={form}
                style={{
                    maxWidth: "90%",
                    width: "800px",
                    margin: "auto",
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout='vertical'
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Course name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Course price!',
                        },
                    ]}
                >
                    <InputNumber style={{ width: "100%" }} suffix="$" />
                </Form.Item>

                <Form.Item
                    label="Discount"
                    name="discount"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Course discount!',
                        },
                    ]}
                >
                    <InputNumber style={{ width: "100%" }} suffix="%" />
                </Form.Item>

                <Form.Item
                    label="Category"
                    name="categoryId"
                    rules={[
                        {
                            required: true,
                            message: 'Please select a Course category!',
                        },
                    ]}
                >
                    <Select
                        placeholder="Select a Course category"
                        options={categories}
                    />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                >
                    <TextArea />
                </Form.Item>
                <Form.Item
                    name="url"
                    label="url"
                    valuePropName="file"
                    getValueFromEvent={normFile}
                    rules={[
                        {
                            required: editMode ? false : true,
                            message: 'Please select product image!',
                        },
                    ]}
                >
                    <Upload>
                        <Button icon={<UploadOutlined />}>Click to Choose a File</Button>
                    </Upload>
                </Form.Item>

                <Form.Item style={{ textAlign: "center" }}>
                    <Button type="primary" htmlType="submit">
                        {editMode ? "Edit" : "Create"}
                    </Button>
                </Form.Item>
            </Form >
        </>
    );
}
