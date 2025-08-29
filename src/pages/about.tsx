import React from 'react';
import { Row, Col, Typography, Card, Statistic } from 'antd';
import { 
    RocketOutlined,
    BulbOutlined,
    BarChartOutlined,
    TeamOutlined,
    TrophyOutlined,
    CheckCircleOutlined,
    FileTextOutlined,
    CompassOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const About: React.FC = () => {
    const stats = [
        { title: 'Business Plans Created', value: '5,000+', icon: <FileTextOutlined /> },
        { title: 'Successful Startups', value: '2,500+', icon: <RocketOutlined /> },
        { title: 'Market Analysis Reports', value: '10,000+', icon: <BarChartOutlined /> },
        { title: 'Success Rate', value: '95%', icon: <TrophyOutlined /> }
    ];

    const features = [
        {
            title: 'Business Planning',
            description: 'Step-by-step guidance to create comprehensive and professional business plans that attract investors.',
            icon: <FileTextOutlined style={{ fontSize: '2rem', color: '#1890ff' }} />
        },
        {
            title: 'Market Intelligence',
            description: 'Data-driven insights about business locations, competition, and market opportunities in Dubai.',
            icon: <CompassOutlined style={{ fontSize: '2rem', color: '#1890ff' }} />
        },
        {
            title: 'Competitor Analysis',
            description: 'Detailed analysis of market competition and strategic positioning for your business.',
            icon: <BarChartOutlined style={{ fontSize: '2rem', color: '#1890ff' }} />
        },
        {
            title: 'Strategic Guidance',
            description: 'Expert insights and recommendations for business success in Dubai dynamic market.',
            icon: <BulbOutlined style={{ fontSize: '2rem', color: '#1890ff' }} />
        }
    ];

    const benefits = [
        {
            title: 'Data-Driven Decisions',
            description: 'Make informed business decisions with real-time market data and competitor analysis.',
            icon: <CheckCircleOutlined />
        },
        {
            title: 'Professional Planning',
            description: 'Create investor-ready business plans with our comprehensive tools and templates.',
            icon: <FileTextOutlined />
        },
        {
            title: 'Market Insights',
            description: 'Understand market dynamics and identify prime business locations in Dubai.',
            icon: <CompassOutlined />
        },
        {
            title: 'Growth Strategy',
            description: 'Develop effective strategies for business growth and market expansion.',
            icon: <RocketOutlined />
        }
    ];

    return (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 20px' }}>
            {/* Hero Section */}
            <div className="text-center mb-5">
                <Title level={1}>Empowering Entrepreneurs</Title>
                <Paragraph className="lead" style={{ fontSize: '1.2rem', maxWidth: 800, margin: '0 auto' }}>
                    Your comprehensive platform for business planning, market analysis, and entrepreneurial success in Dubai's dynamic business landscape.
                </Paragraph>
            </div>

            {/* Platform Overview */}
            <Row gutter={[24, 24]} className="mb-5">
                <Col xs={24} md={12}>
                    <Title level={2}>Our Platform</Title>
                    <Paragraph>
                        FounderBase is a cutting-edge platform designed to empower entrepreneurs with the tools 
                        and insights they need to succeed. We combine advanced market analytics, comprehensive 
                        business planning tools, and location-based insights to help you make informed decisions 
                        about your business.
                    </Paragraph>
                    <Paragraph>
                        Whether you're planning to start a new business, analyzing market competition, or 
                        choosing the perfect location for your venture, our platform provides the data-driven 
                        insights and tools you need to succeed in Dubai's competitive market.
                    </Paragraph>
                </Col>
                <Col xs={24} md={12}>
                    <Title level={2}>Our Mission</Title>
                    <Paragraph>
                        To empower entrepreneurs with data-driven insights and professional tools that transform 
                        business ideas into successful ventures in Dubai's thriving business ecosystem.
                    </Paragraph>
                    <Title level={2}>Our Vision</Title>
                    <Paragraph>
                        To be the leading platform for entrepreneurial success, making business planning and 
                        market analysis accessible, insightful, and actionable for entrepreneurs worldwide.
                    </Paragraph>
                </Col>
            </Row>

            {/* Statistics */}
            <Row gutter={[24, 24]} className="mb-5">
                {stats.map((stat, index) => (
                    <Col xs={24} sm={12} md={6} key={index}>
                        <Card hoverable>
                            <Statistic
                                title={stat.title}
                                value={stat.value}
                                prefix={stat.icon}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Key Features */}
            <Title level={2} className="text-center mb-4">Platform Features</Title>
            <Row gutter={[24, 24]} className="mb-5">
                {features.map((feature, index) => (
                    <Col xs={24} md={6} key={index}>
                        <Card hoverable className="h-100">
                            <div className="text-center mb-3">
                                {feature.icon}
                            </div>
                            <Title level={4} className="text-center">{feature.title}</Title>
                            <Paragraph className="text-center">
                                {feature.description}
                            </Paragraph>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Benefits */}
            <Card className="mb-5">
                <Title level={2} className="text-center mb-4">Why Choose FounderBase</Title>
                <Row gutter={[24, 24]}>
                    {benefits.map((benefit, index) => (
                        <Col xs={24} md={6} key={index}>
                            <div className="text-center">
                                <div style={{ 
                                    background: '#e6f7ff',
                                    borderRadius: '50%',
                                    width: '80px',
                                    height: '80px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 24px',
                                }}>
                                    {React.cloneElement(benefit.icon, { 
                                        style: { fontSize: '32px', color: '#1890ff' } 
                                    })}
                                </div>
                                <Title level={4}>{benefit.title}</Title>
                                <Paragraph>
                                    {benefit.description}
                                </Paragraph>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Card>
        </div>
    );
};

export default About;