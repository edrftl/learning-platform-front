import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { coursesService } from '../../services/course.service';
//import { useForm } from 'antd/es/form/Form';
import { Button, Descriptions, Form, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
// 

export default function CourseInfo() {
    const params = useParams();
    const [course, setCourse] = useState(null);

    const navigate = useNavigate();
    const [form] = Form.useForm();

    const loadCourse = async () => {

        try {
            const res = await coursesService.get(params.id);
            setCourse(res.data);
            form.setFieldsValue(res.data);
            console.info(course.imageUrl)
        } catch (error) {
            console.error('Failed to load course:', error);
            message.error('Failed to load course data');
        }
    };

    useEffect(() => {
        loadCourse();
    }, []);


    if (!course) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Button onClick={() => navigate(-1)} type="text" icon={<ArrowLeftOutlined />}></Button>

            <Descriptions title="Course Info" bordered>
                <Descriptions.Item label="Name">{course.name}</Descriptions.Item>
                <Descriptions.Item label="Price">{course.price}$</Descriptions.Item>
                <Descriptions.Item label="Discount">{course.discount}%</Descriptions.Item>
                <Descriptions.Item label="Category">{course.CategoryName}</Descriptions.Item>
                <Descriptions.Item label="Description">{course.description}</Descriptions.Item>
            </Descriptions>
        </>

    );
}
