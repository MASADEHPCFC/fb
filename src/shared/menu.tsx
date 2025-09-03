import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu as AntMenu, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import tokenService from "../services/token.service";
import logoUrl from '../assets/image.jpg';
import { useState, useEffect } from 'react';
import './menu.css';
const { Header } = Layout;

interface MenuProps {
  isTransparent?: boolean;
}

const Menu: React.FC<MenuProps> = ({ isTransparent = false }) => {
  const navigate = useNavigate();
  const isLoggedIn = tokenService.LoggedIn();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const logout = () => {
    tokenService.removeToken();
    navigate("/login");
  };
  const publicLinks = [
    { id: 1, title: "Home", path: "/" },
    { id: 2, title: "Business Plan", path: "/business-plan" },
    { id: 4, title: "Business Explorer", path: "/business-explorer" },
    { id: 5, title: "Competitor Analysis", path: "/competitor-analysis" },
    { id: 3, title: "About", path: "/about" },
    { id: 6, title: "Contact", path: "/contact" },
  ];
  const privateLinks = [
    { id: 7, title: "Dashboard", path: "/dashboard" },
    { id: 8, title: "My Plans", path: "/my-plans" },
    { id: 9, title: "Requests", path: "/requests" },
  ];
  const Links = isLoggedIn ? [...publicLinks, ...privateLinks] : [...publicLinks];
  // Build Ant Design Menu items array
  const menuItems = [
    ...Links.map((d) => ({
      key: d.id,
      label: (
        <Link to={d.path} className="nav-link px-2 link-secondary" >
          {d.title}
        </Link>
      ),
    })),
    ...(isLoggedIn ? [{
      key: "logout",
      label: (
        <Link to="/" className="nav-link px-2 link-secondary" onClick={logout}>
          Sign Out
        </Link>
      ),
    }] : []),
  ];

  return (
    <Header className={`main-header ${isMobileMenuOpen ? 'mobile-open' : ''} ${isTransparent ? 'transparent-header' : ''}`}>
      <div className="header-content">
        <div className="header-left">
          {isMobile && (
            <Button
              className="mobile-menu-toggle"
              icon={<MenuOutlined />}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="text"
            />
          )}
          <Link to="/" className="header-logo">
            {/* <img src={logoUrl} style={{ width: 160, height: 65 }} alt="logo" /> */}
          </Link>
        </div>
        <div className={`header-menu-actions ${isMobileMenuOpen ? 'mobile-visible' : ''}`}>
          <AntMenu
            mode={isMobile ? "vertical" : "horizontal"}
            selectedKeys={[]}
            className="header-menu"
            items={menuItems}
            onClick={() => isMobile && setIsMobileMenuOpen(false)}
          />
          <div className="header-buttons">
            {!isLoggedIn && (
              <Button
                type="default"
                size="middle"
                onClick={() => {
                  navigate('/login');
                  isMobile && setIsMobileMenuOpen(false);
                }}
                style={{ 
                  marginRight: 16,
                  borderColor: '#1890ff',
                  color: '#1890ff'
                }}
              >
                Sign In
              </Button>
            )}
            <Button
              type="primary"
              size="middle"
              onClick={() => {
                navigate('/business-plan');
                isMobile && setIsMobileMenuOpen(false);
              }}
              style={{
                background: '#1890ff',
                borderColor: '#1890ff',
                transition: 'all 0.3s'
              }}
            >
              Create Business Plan
            </Button>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default Menu;
