import React from 'react';
import { Typography, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'antd';
import firstSlide from '../assets/1.jpg'
import secondSlide from '../assets/2.jpg'
import thirdSlide from '../assets/3.jpg'
import fourthSlide from '../assets/4.jpg'


const { Title, Paragraph } = Typography;

const HeroSlider: React.FC = () => {
    const navigate = useNavigate();

    const slides = [
        {
            image: firstSlide,
            title: 'Welcome to PCFC BizHub',
            description: 'Your gateway to establishing a successful business in Dubai\'s thriving free zone',
            buttonText: 'Start Company Setup',
            buttonLink: '/company-setup'
        },
        {
            image: secondSlide,
            title: 'Business Growth Opportunities',
            description: 'Access world-class facilities and a business-friendly environment',
            buttonText: 'Learn More',
            buttonLink: '/about'
        },
        {
            image: thirdSlide,
            title: 'Expert Support & Guidance',
            description: 'Get comprehensive assistance throughout your business setup journey',
            buttonText: 'Contact Us',
            buttonLink: '/contact'
        },
        {
            image: fourthSlide,
            title: 'Seamless Paperwork',
            description: 'Experience hassle-free documentation and licensing for your new business.',
            buttonText: 'See How It Works',
            buttonLink: '/about'
        }
    
    ];

    return (
        <div style={{ 
            width: '100vw',
            position: 'relative',
            left: '50%',
            right: '50%',
            marginLeft: '-50vw',
            marginRight: '-50vw',
            marginBottom: '2rem'
        }}>
            <Carousel autoplay>
                {slides.map((slide, index) => (
                    <div key={index}>
                        <div 
                            className="hero-slide"
                            style={{
                                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${slide.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '600px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                color: 'white'
                            }}
                        >
                            <div className="hero-content">
                                <Title level={1} style={{ color: 'white', marginBottom: '1rem' }}>
                                    {slide.title}
                                </Title>
                                <Paragraph style={{ color: 'white', fontSize: '1.2rem', marginBottom: '2rem' }}>
                                    {slide.description}
                                </Paragraph>
                                <Button 
                                    type="primary" 
                                    size="large"
                                    onClick={() => navigate(slide.buttonLink)}
                                >
                                    {slide.buttonText}
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default HeroSlider; 