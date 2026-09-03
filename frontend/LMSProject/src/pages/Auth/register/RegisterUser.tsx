import React from "react";
import Loader from "../../../components/ui/loader/loader";
import Header from "../../../components/AuthFormCompent/Header";

function registerUser() {
  return (
    <>
      <Header
        heading="Register for an account"
        paragraph="Already have an account? "
        linkName="Login"
        linkUrl="/login"
      />
      <div className="text-2xl font-bold text-amber-500">registerUser</div>
      <Loader />
    </>
  );
}

export default registerUser;
