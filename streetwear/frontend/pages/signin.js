import React from "react";
import RequestReset from "../components/RequestReset";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import { SignInPageGrid } from "../styles/SignInPageStyles";

const SignInPage = () => {
  return (
    <SignInPageGrid>
      <SignIn />
      <SignUp />
      <RequestReset />
    </SignInPageGrid>
  );
};

export default SignInPage;
