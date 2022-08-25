import { instance } from "./instance";

type Register_Type = {
  email: string;
  phone: string;
  password: string;
};

type Login_Type = {
  email: string;
  password: string;
};

type UserType = {
  id: number;
  email: string;
  phone: string;
  fullname: string;
};

export const login = (data: Login_Type) => {
  return instance.post<any>("/login", data);
};

export const register = (data: Register_Type) => {
  return instance.post<any>("/register", data);
};
