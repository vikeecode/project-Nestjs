import React from "react";
import Header from "../../../components/AuthFormCompent/Header";
import LoginFrom from "../../../components/AuthFormCompent/loginFrom";
import AnimatedAuthCard from "../../../components/ui/cardAnimation/CardAnimation";

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <AnimatedAuthCard>
        <Header
          heading="Login to your account"
          paragraph="Don't have an account yet? "
          linkName="Signup"
          linkUrl="/register"
        />
        <LoginFrom />
      </AnimatedAuthCard>
    </div>
  );
}

export default Login;
