import { RouteObject } from "react-router-dom";
import App from "../App";
import Home from "../pages/home";
import About from "../pages/about";
import { PrivateRoute } from "./privateroutes";
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login";
import CompanySetup from "../pages/company/CompanySetup";
import ContactUs from "../pages/contactus";
import Signup from "../pages/signup";
import QuickCostEstimation from "../pages/cost-estimation/QuickCostEstimation";
import Requests from "@/pages/requests/requests";
import Dashboard from "@/pages/dashboard";
import EmployeeLanding from "@/pages/employee/EmployeeLanding";
import ClientRegistration from "@/pages/employee/ClientRegistration";
import BusinessPlanGenerator from "@/pages/business-plan/BusinessPlanGenerator";
import BusinessExplorer from "@/pages/business-explorer/BusinessExplorer";
import CompetitorAnalysis from "@/pages/competitor-analysis/CompetitorAnalysis";
const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/business-plan",
        element: <BusinessPlanGenerator />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/company-setup",
        element: <CompanySetup />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/business-explorer",
        element: <BusinessExplorer />,
      },
      {
        path: "/competitor-analysis",
        element: <CompetitorAnalysis />,
      },
      {
        path: "/cal",
        element: <QuickCostEstimation />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
];

const privateRoute: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <PrivateRoute />,
        children: [
          {
            path: "/",
            element: <Requests />,
          },
         
        ],
      },
    ],
  },
];
const TRouter = createBrowserRouter([...publicRoutes]);
export default TRouter;
