import React from "react";
import Layout from "../components/Layout/Layout";
import LoginForm from "../components/Login/LoginForm";
import Header from "../components/Header/Header";

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
