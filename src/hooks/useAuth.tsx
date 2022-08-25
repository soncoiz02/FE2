import React, { useEffect, useState } from "react";
import { getCookie } from "../utils/cookie";

export type User_Type = {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  role: number;
};

const useAuth = () => {
  const token = getCookie("token");
  return { token };
};

export default useAuth;
