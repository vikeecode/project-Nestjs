import React from "react";
import Header from "../../../components/AuthFormCompent/Header";
import LoginFrom from "../../../components/AuthFormCompent/loginFrom";

function Login() {
  return (
    <>
      <Header
        heading="Login to your account"
        paragraph="Don't have an account yet? "
        linkName="Signup"
        linkUrl="/register"
      />
      <LoginFrom />
    </>
  );
}

export default Login;
