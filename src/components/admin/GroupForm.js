import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Select, Upload, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { groupsService } from '../../services/groups.service';
import { useForm } from 'antd/es/form/Form';

export default function GroupForm() {

    const [courses, setCourses] = useState([]);
    const params = useParams();
    const [form] = Form.useForm();
    const [editMode, setEditMode] = useState(false);
    const [group, setGroup] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        loadGroup();

        // TODO: use service
        fetch(process.env.REACT_APP_API + "Group/courses")
            .then(res => res.json())
            .then(data => {
                const options = data.map(x => { return { label: x.name, value: x.id }; });
                setCourses(options);
            });
    }, []);

    const loadGroup = async () => {
        if (params.id) {
            setEditMode(true);

            const res = await groupsService.get(params.id);
            setGroup(res.data);
            form.setFieldsValue(res.data);


        }
    };

    const onFinish = async (values) => {
        if (editMode) {
            // add neccessary data
            values.id = group.id;

            const res = await groupsService.edit(values);
            console.log(res);

            if (res.status < 300) {
                message.success("Group updated successfully!");
                navigate(-1);
            }
            else
                alert("Something went wrong!");
        }
        else {
            const res = await groupsService.create(values);

            if (res.status < 300) {
                message.success("Group created successfully!");
                navigate(-1);
            }
            else
                alert("Something went wrongwqew!");
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
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
                    label="Max Places"
                    name="maxPlaces"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Max Places!',
                        },
                    ]}
                >
                    <InputNumber style={{ width: "100%" }} suffix="$" />
                </Form.Item>


                <Form.Item
                    label="Course"
                    name="courseId"
                    rules={[
                        {
                            required: true,
                            message: 'Please select a course!',
                        },
                    ]}
                >
                    <Select
                        placeholder="Select a course"
                        options={courses}
                    />
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
