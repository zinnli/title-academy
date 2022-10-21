import React from "react";
import Layout from "../components/Layout/Layout";
import Header from "../components/Header/Header";
import RegisterForm from "../components/Login/RegisterForm";

function Register() {
     return (
          <>
               <Header />
               <Layout>
                    <RegisterForm />
               </Layout>
          </>
     );
}

export default Register;
