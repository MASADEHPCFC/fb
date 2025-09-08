import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu as AntMenu, Button } from "antd";
import { MenuOutlined, SolutionOutlined } from "@ant-design/icons";
import tokenService from "../services/token.service";
import { useState, useEffect, ReactElement } from "react";
import logoUrl from "../assets/logo.png";
import "./menu.css";
const { Header } = Layout;

interface MenuItem {
  id: number | string;
  title: string;
  path?: string;
  icon?: ReactElement;
  children?: {
    id: string;
    title: string;
    path: string;
  }[];
}

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

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const logout = () => {
    tokenService.removeToken();
    navigate("/login");
  };
  const publicLinks: MenuItem[] = [
    { id: 1, title: "Home", path: "/" },
    {
      id: 2,
      title: "Solutions",
      children: [
        {
          id: "business-planning",
          title: "Business Planning",
          path: "/business-plan",
        },
        {
          id: "legal",
          title: "Legal Module",
          path: "/legal",
        },
        {
          id: "finance",
          title: "Finance and Accounting",
          path: "/finance",
        },
        {
          id: "procurement",
          title: "Procurement",
          path: "/procurement",
        },
        {
          id: "hr",
          title: "HR and Payroll",
          path: "/hr",
        },
        {
          id: "growth",
          title: "Growth and Marketing",
          path: "/growth",
        },
        {
          id: "compliance",
          title: "Compliance and Governance",
          path: "/compliance",
        },
      ],
    },
    { id: 4, title: "Business Explorer", path: "/business-explorer" },
    { id: 5, title: "Competitor Analysis", path: "/competitor-analysis" },
    { id: 3, title: "About", path: "/about" },
    { id: 6, title: "Contact", path: "/contact" },
  ];
  const privateLinks: MenuItem[] = [
    { id: 7, title: "Dashboard", path: "/dashboard" },
    { id: 8, title: "My Plans", path: "/my-plans" },
    { id: 9, title: "Requests", path: "/requests" },
  ];
  const Links = isLoggedIn
    ? [...publicLinks, ...privateLinks]
    : [...publicLinks];
  // Build Ant Design Menu items array
  const menuItems = [
    ...Links.map((d) => {
      if (d.children) {
        return {
          key: d.id,
          label: d.title,
          icon: d.icon,
          children: d.children.map((child) => ({
            key: child.id,
            label: (
              <Link to={child.path} className="nav-link px-2 link-secondary">
                {child.title}
              </Link>
            ),
          })),
        };
      }
      return {
        key: d.id,
        label: (
          <Link to={d.path || "/"} className="nav-link px-2 link-secondary">
            {d.title}
          </Link>
        ),
      };
    }),
    ...(isLoggedIn
      ? [
          {
            key: "logout",
            label: (
              <Link
                to="/"
                className="nav-link px-2 link-secondary"
                onClick={logout}
              >
                Sign Out
              </Link>
            ),
          },
        ]
      : []),
  ];

  return (
    <Header
      className={`main-header ${isMobileMenuOpen ? "mobile-open" : ""} ${
        isTransparent ? "transparent-header" : ""
      }`}
    >
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
            <img
              src={logoUrl}
              style={{
                width: 115,
                height: 75,
              }}
              alt="logo"
            />
          </Link>
        </div>
        <div
          className={`header-menu-actions ${
            isMobileMenuOpen ? "mobile-visible" : ""
          }`}
        >
          <AntMenu
            mode={isMobile ? "inline" : "horizontal"}
            inlineIndent={0}
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
                  navigate("/login");
                  isMobile && setIsMobileMenuOpen(false);
                }}
                style={{
                  marginRight: 16,
                  borderColor: "#1890ff",
                  color: "#1890ff",
                }}
              >
                Sign In
              </Button>
            )}
            <Button
              type="primary"
              size="middle"
              onClick={() => {
                navigate("/business-plan");
                isMobile && setIsMobileMenuOpen(false);
              }}
              style={{
                background: "#1890ff",
                borderColor: "#1890ff",
                transition: "all 0.3s",
              }}
            >
              Start Your Business
            </Button>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default Menu;
