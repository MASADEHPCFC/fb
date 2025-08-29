import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu as AntMenu } from "antd";
import { useState } from "react";
import tokenService from "../services/token.service";
import { Button } from "antd";
import logoUrl from '../assets/pcfc.svg'
const { Header } = Layout;

const Menu = () => {
  const navigate = useNavigate();
  const isLoggedIn = tokenService.LoggedIn();
  
  const logout = () => {
    tokenService.removeToken();
    navigate("/login");
  };
  const publicLinks = [
    { id: 1, title: "Home", path: "/" },
    { id: 2, title: "Business Plan", path: "/business-plan" },
    { id: 3, title: "Company Setup", path: "/company-setup" },
    { id: 4, title: "Business Explorer", path: "/business-explorer" },
    { id: 5, title: "About", path: "/about" },
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
    <Header className="main-header">
      <div className="header-content">
        <Link to="/" className="header-logo">
          <img src={logoUrl} alt="logo" />
        </Link>
        <div className="header-menu-actions">
          <AntMenu
            mode="horizontal"
            selectedKeys={[]}
            className="header-menu"
            items={menuItems}
          />
          <div className="header-buttons">
            {!isLoggedIn && (
              <Button
                type="default"
                size="middle"
                onClick={() => navigate('/login')}
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
              onClick={() => navigate('/business-plan')}
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
