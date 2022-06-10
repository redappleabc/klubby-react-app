import React from "react";
import { Redirect } from "react-router-dom";

// lazy load all the views
const Dashboard = React.lazy(() => import("../pages/dashboard/index"));
const StarterPage = React.lazy(() => import("../pages/StarterPage/index"));

// auth
const Index = React.lazy(() => import("../pages/Auth/Index"));
const Login = React.lazy(() => import("../pages/Auth/Login"));
const Logout = React.lazy(() => import("../pages/Auth/Logout"));
const ForgetPassword = React.lazy(() => import("../pages/Auth/ForgetPassword"));
const Register = React.lazy(() => import("../pages/Auth/Register"));
const VerifyRegister = React.lazy(() => import("../pages/Auth/VerifyRegister"));
const VerifyResetPassword = React.lazy(() => import("../pages/Auth/VerifyResetPassword"));
const LockScreen = React.lazy(() => import("../pages/Auth/LockScreen"));

// declare all routes
const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/pages-starter", component: StarterPage },

  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/dashboard" />,
  },
];

const publicRoutes = [
  { path: "/", component: Register },
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forget-password", component: ForgetPassword },
  { path: "/register", component: Register },
  { path: "/verify-register", component: VerifyRegister },
  { path: "/verify-pwd-reset", component: VerifyResetPassword },
  { path: "/lock-screen", component: LockScreen}
];

const routes = [...authProtectedRoutes, ...publicRoutes];

export { authProtectedRoutes, publicRoutes, routes };
