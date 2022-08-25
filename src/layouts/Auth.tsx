import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const AuthLayoutWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #d9d9d9;
`;

const AuthLayout = () => {
  return (
    <AuthLayoutWrapper>
      <Outlet />
    </AuthLayoutWrapper>
  );
};

export default AuthLayout;
