import React from 'react';
import { Button, Typography, Row, Col, Card, Space } from 'antd';
import { Link } from 'react-router-dom';
import {
  RocketOutlined,
  BarChartOutlined,
  BulbOutlined,
  ArrowRightOutlined,
  FileTextOutlined,
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <div 
        style={{ 
          background: 'linear-gradient(135deg, #1890ff 0%, #001529 100%)',
          padding: '80px 0',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
          <Title style={{ color: 'white', fontSize: '48px', marginBottom: '24px' }}>
            Turn Your Vision Into Reality
          </Title>
          <Paragraph style={{ color: 'white', fontSize: '20px', maxWidth: 800, margin: '0 auto 40px' }}>
            Create a professional business plan and launch your company with our
            comprehensive suite of entrepreneurial tools.
          </Paragraph>
          <Space size="large">
            <Link to="/business-plan">
              <Button type="primary" size="large" icon={<FileTextOutlined />}>
                Create Business Plan
              </Button>
            </Link>
            <Link to="/company-setup">
              <Button size="large" ghost icon={<RocketOutlined />}>
                Setup Company
              </Button>
            </Link>
          </Space>
        </div>
      </div>

      {/* Main Features */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 20px' }}>
        <Row gutter={[32, 32]} justify="center">
          <Col xs={24} md={8}>
            <Card 
              hoverable 
              style={{ height: '100%', textAlign: 'center' }}
              bodyStyle={{ padding: '40px 24px' }}
            >
              <BulbOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '24px' }} />
              <Title level={3}>Business Plan Generator</Title>
              <Paragraph style={{ fontSize: '16px', marginBottom: '24px' }}>
                Create a comprehensive business plan with our step-by-step guide and professional templates.
              </Paragraph>
              <Link to="/business-plan">
                <Button type="link" icon={<ArrowRightOutlined />}>
                  Get Started
                </Button>
              </Link>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card 
              hoverable 
              style={{ height: '100%', textAlign: 'center' }}
              bodyStyle={{ padding: '40px 24px' }}
            >
              <RocketOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '24px' }} />
              <Title level={3}>Business Explorer</Title>
              <Paragraph style={{ fontSize: '16px', marginBottom: '24px' }}>
                Explore business distribution across Dubai's key areas and make informed location decisions.
              </Paragraph>
              <Link to="/business-explorer">
                <Button type="link" icon={<ArrowRightOutlined />}>
                  Explore Now
                </Button>
              </Link>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card 
              hoverable 
              style={{ height: '100%', textAlign: 'center' }}
              bodyStyle={{ padding: '40px 24px' }}
            >
              <BarChartOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '24px' }} />
              <Title level={3}>Competitor Analysis</Title>
              <Paragraph style={{ fontSize: '16px', marginBottom: '24px' }}>
                Analyze your competition and market potential in Dubai's key business areas.
              </Paragraph>
              <Link to="/competitor-analysis">
                <Button type="link" icon={<ArrowRightOutlined />}>
                  Analyze Now
                </Button>
              </Link>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Call to Action Section */}
      <div 
        style={{ 
          background: '#f5f5f5',
          padding: '80px 20px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Title level={2}>Ready to Start Your Business?</Title>
          <Paragraph style={{ fontSize: '18px', marginBottom: '32px' }}>
            Join thousands of entrepreneurs who have successfully launched their
            businesses using our platform.
          </Paragraph>
          <Space size="large">
            <Link to="/business-plan">
              <Button type="primary" size="large">
                Start Now
              </Button>
            </Link>
            <Link to="/about">
              <Button size="large">
                Learn More
              </Button>
            </Link>
          </Space>
        </div>
      </div>

      {/* Key Benefits */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 20px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '48px' }}>
          Why Choose Our Platform
        </Title>
        <Row gutter={[48, 48]}>
          <Col xs={24} sm={12} md={6}>
            <div style={{ textAlign: 'center' }}>
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
                <BulbOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
              </div>
              <Title level={4}>Step-by-Step Guidance</Title>
              <Paragraph>
                Clear instructions and templates to help you create a professional business plan
              </Paragraph>
            </div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <div style={{ textAlign: 'center' }}>
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
                <RocketOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
              </div>
              <Title level={4}>Quick Setup</Title>
              <Paragraph>
                Streamlined process to get your business up and running quickly
              </Paragraph>
            </div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <div style={{ textAlign: 'center' }}>
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
                <FileTextOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
              </div>
              <Title level={4}>Professional Documents</Title>
              <Paragraph>
                Generate high-quality business documents and presentations
              </Paragraph>
            </div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <div style={{ textAlign: 'center' }}>
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
                <BulbOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
              </div>
              <Title level={4}>Expert Resources</Title>
              <Paragraph>
                Access to comprehensive guides and business tools
              </Paragraph>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Home;