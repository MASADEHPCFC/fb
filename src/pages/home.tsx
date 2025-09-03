import React from 'react';
import { Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Menu from '../shared/menu';
import backgroundImage from '../../public/business-finance-technology.jpg';

const { Title, Paragraph } = Typography;

const FullHeightContainer = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background: 
    linear-gradient(to bottom, 
      rgba(0, 0, 0, 0.7) 0%, 
      rgba(0, 0, 0, 0.3) 30%, 
      rgba(0, 0, 0, 0.3) 70%, 
      rgba(0, 0, 0, 0.7) 100%
    ),
    url(${backgroundImage}) center/cover no-repeat;
  margin: 0;
  padding: 0;
`;

const TransparentMenuWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  
  .ant-layout-header {
    background: transparent !important;
    border-bottom: none !important;
    box-shadow: none !important;
  }
  
  .ant-menu {
    background: transparent !important;
    border-bottom: none !important;
  }
  
  .ant-menu-item,
  .ant-menu-submenu-title,
  .ant-menu-item a,
  .ant-menu-submenu-title a,
  .ant-menu-item .nav-link,
  .ant-menu-submenu-title .nav-link,
  .nav-link.link-secondary {
    color: white !important;
    position: relative;
    
    &:hover {
      color: white !important;
      background: transparent !important;
      
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: white;
        transition: all 0.3s ease;
      }
    }
  }
  
  .ant-menu-item-selected,
  .ant-menu-item-selected a,
  .ant-menu-item-selected .nav-link {
    color: white !important;
    background: transparent !important;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: white;
    }
  }
  
  .header-logo,
  .header-logo a {
    color: white !important;
  }
  
  .ant-menu-horizontal {
    .ant-menu-item,
    .ant-menu-submenu-title {
      color: white !important;
      
      &::after {
        border-bottom-color: transparent !important;
      }
      
      &:hover::after {
        border-bottom-color: transparent !important;
      }
    }
    
    .ant-menu-item-selected::after {
      border-bottom-color: transparent !important;
    }
  }
  
  .ant-btn {
    &.header-setup-btn {
      background: linear-gradient(90deg, #1677ff 0%, #00c6ff 100%) !important;
      color: white !important;
      border: none !important;
    }
  }
`;

const ContentWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
  z-index: 2;
`;

const StyledTitle = styled(Title)`
  &.ant-typography {
    color: white;
    font-size: 64px !important;
    margin-bottom: 24px;
    font-weight: 700;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

    @media (max-width: 768px) {
      font-size: 40px !important;
      margin-bottom: 16px;
    }

    @media (max-width: 480px) {
      font-size: 32px !important;
    }
  }
`;

const StyledSubtitle = styled(Paragraph)`
  &.ant-typography {
    color: white;
    font-size: 24px;
    margin-bottom: 48px;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);

    @media (max-width: 768px) {
      font-size: 20px;
      margin-bottom: 32px;
      padding: 0 20px;
    }

    @media (max-width: 480px) {
      font-size: 18px;
      margin-bottom: 24px;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 40px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 16px;
    padding: 0 20px;
  }
`;

const StyledButton = styled(Button)`
  height: 50px;
  padding: 0 40px;
  font-size: 18px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;

  @media (max-width: 768px) {
    height: 45px;
    padding: 0 30px;
    font-size: 16px;
  }

  @media (max-width: 480px) {
    width: 100%;
    height: 45px;
    padding: 0 20px;
  }

  &.primary {
    background: #2563eb;
    border-color: #2563eb;
    color: white;
    
    &:hover {
      background: #1d4ed8;
      border-color: #1d4ed8;
    }
  }

  &.secondary {
    background: transparent;
    border: 2px solid white;
    color: white;
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }
`;

const Home: React.FC = () => {
  return (
    <FullHeightContainer>
      <TransparentMenuWrapper>
        <Menu isTransparent={true} />
      </TransparentMenuWrapper>
        <ContentWrapper>
        <StyledTitle>
          Turn Your Vision Into Reality
        </StyledTitle>
        <StyledSubtitle>
          Create a professional business plan and launch your company with our
          comprehensive suite of entrepreneurial tools.
        </StyledSubtitle>
        <ButtonContainer>
          <Link to="/business-plan">
            <StyledButton className="primary" size="large">
              Create Business Plan
            </StyledButton>
          </Link>
          <Link to="/business-explorer">
            <StyledButton className="secondary" size="large">
              Explore Business
            </StyledButton>
          </Link>
        </ButtonContainer>
      </ContentWrapper>
    </FullHeightContainer>
  );
};

export default Home;