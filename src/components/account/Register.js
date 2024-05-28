import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Input, Select, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { accountsService } from '../../services/accounts.service';
import { groupsService } from '../../services/groups.service';

export default function Register() {
    const [groups, setGroups] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadGroups();
    }, []);

    const loadGroups = async () => {
        try {
            const res = await groupsService.getAll();
            const options = res.data.map(group => ({ label: group.name, value: group.id }));
            setGroups(options);
        } catch (error) {
            console.error('Failed to load groups:', error);
            message.error('Failed to load groups');
        }
    };

    const onFinish = async (values) => {
        console.log('Success:', values);

        try {
            const res = await accountsService.register(values);

            if (res.status >= 300) {
                message.error("Something went wrong!");
                return;
            }

            message.success("You're registered successfully!");
            navigate(-1);
        } catch (error) {
            console.error('Registration failed:', error);
            message.error('Registration failed!');
        }
    };

    return (
        <>
            <h1 style={center}>Register Form</h1>
            <Form
                name="basic"
                style={{
                    maxWidth: 400,
                    margin: "auto"
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
                layout='vertical'
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The passwords do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Birthdate"
                    name="birthdate"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your birthdate!',
                        },
                    ]}
                >
                    <DatePicker style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                    label="Phone Number"
                    name="phoneNumber"
                    rules={[
                        {
                            required: false,
                            message: 'Please input your phone number!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Group"
                    name="groupId"
                    rules={[
                        {
                            required: true,
                            message: 'Please select a group!',
                        },
                    ]}
                >
                    <Select
                        placeholder="Select a group"
                        options={groups}
                    />
                </Form.Item>

                <Form.Item
                    style={center}
                >
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

const center = {
    textAlign: "center"
}
