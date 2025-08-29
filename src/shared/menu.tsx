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
    { id: 6, title: "Pricing Tool", path: "/cal" },
    { id: 8, title: "Business Plan", path: "/business-plan" },
    { id: 2, title: "About", path: "/about" },
    { id: 7, title: "Contact Us", path: "/contact" },

  ];
  const privateLinks = [
    { id: 5, title: "Requests", path: "/requests" },
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
    !isLoggedIn
      ? {
          key: "login",
          label: (
            <Link to="/login" className="nav-link px-2 link-secondary" >
              Login
            </Link>
          ),
        }
      : {
          key: "logout",
          label: (
            <Link to="/" className="nav-link px-2 link-secondary" onClick={logout}>
              logout
            </Link>
          ),
        },
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
          <Button
            type="primary"
            size="middle"
            className="header-setup-btn"
            onClick={() => navigate('/company-setup')}
          >
            Start Company Setup
          </Button>
        </div>
      </div>
    </Header>
  );
};

export default Menu;
