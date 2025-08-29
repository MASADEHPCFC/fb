import React from 'react';
import { Card, Row, Col, Typography, Steps, List, Button } from 'antd';
import { CheckCircleOutlined, BulbOutlined, RocketOutlined, BarChartOutlined, FileTextOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import HeroSlider from '../shared/HeroSlider';

const { Title, Paragraph } = Typography;
const { Step } = Steps;

const Home: React.FC = () => {
    const entrepreneurTools = [
        {
            title: 'Business Plan Generator',
            description: 'Create a professional business plan with our step-by-step guide.',
            features: [
                'Executive Summary Builder',
                'Market Analysis Tools',
                'Financial Projections',
                'Marketing Strategy',
                'Implementation Timeline'
            ]
        },
        {
            title: 'Company Setup Wizard',
            description: 'Set up your business in Dubai',
            features: [
                'License Selection',
                'Activity Configuration',
                'Shareholder Management',
                'Cost Estimation',
                'Document Generation'
            ]
        },
        {
            title: 'Entrepreneur Resources',
            description: 'Access comprehensive resources to support your business journey.',
            features: [
                'Business Templates',
                'Market Research Tools',
                'Legal Guidelines',
                'Financial Planning',
                'Growth Strategies'
            ]
        }
    ];

    const benefits = [
        'Step-by-step business planning',
        'Professional document generation',
        'Market analysis tools',
        'Financial projections',
        'Implementation roadmap',
        'Expert guidance',
        'Success tracking',
    ];

    return (
        <>
            <HeroSlider />

            <div style={{ maxWidth: 1200, margin: '0 auto', marginTop: 32 }}>
                {/* Entrepreneur Tools */}
                <Title level={2} className="text-center mb-4">Start Your Entrepreneurial Journey</Title>
                <Row gutter={[24, 24]} className="mb-5">
                    {entrepreneurTools.map((tool, index) => (
                        <Col xs={24} md={8} key={index}>
                            <Card 
                                title={tool.title}
                                className="h-100"
                                hoverable
                                extra={
                                    <Link to={index === 0 ? "/business-plan" : index === 1 ? "/company-setup" : "#"}>
                                        <Button type="link">Get Started</Button>
                                    </Link>
                                }
                            >
                                <Paragraph>{tool.description}</Paragraph>
                                <List
                                    dataSource={tool.features}
                                    renderItem={item => (
                                        <List.Item>
                                            <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                                            {item}
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* Benefits Section */}
                <Card className="mb-5">
                    <Title level={2} className="text-center mb-4">Why Use Our Business Planning Tools?</Title>
                    <Row gutter={[24, 24]}>
                        <Col xs={24} md={12}>
                            <List
                                dataSource={benefits}
                                renderItem={item => (
                                    <List.Item>
                                        <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                                        {item}
                                    </List.Item>
                                )}
                            />
                        </Col>
                        <Col xs={24} md={12}>
                            <div className="p-4 bg-light rounded">
                                <Title level={4}>Business Planning Process</Title>
                                <Steps direction="vertical" current={-1}>
                                    <Step title="Create Business Plan" description="Use our step-by-step business plan generator" />
                                    <Step title="Analyze Market" description="Research your market and competition" />
                                    <Step title="Set Up Company" description="Register and establish your business" />
                                    <Step title="Launch & Grow" description="Implement your plan and track success" />
                                </Steps>
                            </div>
                        </Col>
                    </Row>
                </Card>

                {/* Features Section */}
                <Row gutter={[24, 24]} className="mb-5">
                    <Col xs={24} md={6}>
                        <Card>
                            <BulbOutlined style={{ fontSize: '2rem', color: '#1890ff' }} />
                            <Title level={4}>Idea Validation</Title>
                            <Paragraph>
                                Tools and resources to validate your business idea and identify market opportunities.
                            </Paragraph>
                        </Card>
                    </Col>
                    <Col xs={24} md={6}>
                        <Card>
                            <RocketOutlined style={{ fontSize: '2rem', color: '#1890ff' }} />
                            <Title level={4}>Launch Strategy</Title>
                            <Paragraph>
                                Develop a comprehensive strategy to successfully launch your business.
                            </Paragraph>
                        </Card>
                    </Col>
                    <Col xs={24} md={6}>
                        <Card>
                            <BarChartOutlined style={{ fontSize: '2rem', color: '#1890ff' }} />
                            <Title level={4}>Growth Planning</Title>
                            <Paragraph>
                                Plan and track your business growth with financial projections and KPIs.
                            </Paragraph>
                        </Card>
                    </Col>
                    <Col xs={24} md={6}>
                        <Card>
                            <FileTextOutlined style={{ fontSize: '2rem', color: '#1890ff' }} />
                            <Title level={4}>Documentation</Title>
                            <Paragraph>
                                Generate professional business documents and presentations.
                            </Paragraph>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Home;