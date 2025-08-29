import React from 'react';
import { Row, Col, Typography, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { FacebookOutlined, TwitterOutlined, LinkedinOutlined, InstagramOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { title: 'Home', path: '/' },
        { title: 'Business Plan', path: '/business-plan' },
        { title: 'Business Explorer', path: '/business-explorer' },
        { title: 'Competitor Analysis', path: '/competitor-analysis' },
        { title: 'About Us', path: '/about' },
        { title: 'Contact Us', path: '/contact' }
    ];

    const socialLinks = [
        { icon: <FacebookOutlined />, url: 'https://facebook.com' },
        { icon: <TwitterOutlined />, url: 'https://twitter.com' },
        { icon: <LinkedinOutlined />, url: 'https://linkedin.com' },
        { icon: <InstagramOutlined />, url: 'https://instagram.com' }
    ];

    return (
        <footer className="bg-light mt-5 py-4 w-100">
            <div className="footer-area px-4">
                <Row gutter={[24, 24]} justify="center">
                    {/* Company Information */}
                    <Col xs={24} md={8}>
                        <Title level={4}>FounderBase</Title>
                        <Paragraph>
                            Empowering entrepreneurs with comprehensive tools and insights 
                            for successful business planning and market analysis in Dubai. 
                            Your journey to business success starts here.
                        </Paragraph>
                    </Col>

                    {/* Quick Links */}
                    <Col xs={24} md={8}>
                        <Title level={4}>Quick Links</Title>
                        <ul className="list-unstyled">
                            {quickLinks.map((link, index) => (
                                <li key={index} className="mb-2">
                                    <Link to={link.path} className="text-decoration-none">
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Col>

                    {/* Contact Information */}
                    <Col xs={24} md={8}>
                        <Title level={4}>Contact Info</Title>
                        <Paragraph>
                            <strong>Address:</strong><br />
                            Dubai Internet City<br />
                            Dubai, United Arab Emirates
                        </Paragraph>
                        <Paragraph>
                            <strong>Phone:</strong><br />
                            +971 4 XXX XXXX<br />
                            +971 4 XXX XXXX
                        </Paragraph>
                        <Paragraph>
                            <strong>Email:</strong><br />
                            info@founderbase.com<br />
                            support@founderbase.com
                        </Paragraph>
                    </Col>
                </Row>

                <Divider />

                {/* Social Media Links and Copyright */}
                <Row justify="center" align="middle">
                    <Col xs={24} md={12} style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
                        {socialLinks.map((social, index) => (
                            <a
                                key={index}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-dark fs-4"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </Col>
                    <Col xs={24} md={12} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Paragraph className="text-center mb-0">
                            © {currentYear} FounderBase. All rights reserved.
                        </Paragraph>
                    </Col>
                </Row>
            </div>
        </footer>
    );
};

export default Footer;