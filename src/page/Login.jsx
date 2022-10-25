import React, { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import LoginForm from "../components/Login/LoginForm";
import Header from "../components/Header/Header";
import { useNavigate } from "react-router-dom";

function Login() {
  return (
    <>
      <Header />
      <Layout>
        <LoginForm />
      </Layout>
    </>
  );
}

export default Login;
