import { Card, Col, Row } from 'antd'
import Meta from 'antd/es/card/Meta'
import React, { useEffect, useState } from 'react'
import { coursesService } from '../services/course.service';

export default function Catalog() {
    const [courses, setCourses] = useState([]);
    const loadCourses = async () => {
        const res = await coursesService.getAll();
        setCourses(res.data);
    };
    useEffect(() => {
        loadCourses();
    }, []);

    return (
        <Row gutter={[16, 16]} justify="center">
            {courses.map(course => (
                <Col key={course.id} span={8}>
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={<img alt={course.name} src={course.url || 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'} />}
                    >
                        <Meta title={course.name} description={course.price + '$'} />
                    </Card>
                </Col>
            ))}
        </Row>
    )
}
