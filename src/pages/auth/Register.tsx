import { Form, Input, message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { register } from "../../api/auth";
import fb from "../../assets/img/fb.png";
import gg from "../../assets/img/gg.png";
import logo from "../../assets/img/logo.png";

const Box = styled.div`
  display: flex;
  width: 800px;
  position: relative;
`;

const LeftSide = styled.div`
  width: 500px;
  padding: 50px;
  background: white;
  border-radius: 20px 0 0 20px;
  display: flex;
  flex-direction: column;
`;

const RightSide = styled.div`
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8f8f8;
  border-radius: 0 20px 20px 0;
`;

const SubmitBtn = styled.button`
  padding: 10px 25px;
  background-color: #ff424e;
  color: white;
  font-size: 18px;
  border: none;
  width: 100%;
  cursor: pointer;
  border-radius: 5px;
`;

const CustomsFormItem = styled(Form.Item)`
  .ant-col .ant-form-item-label {
    padding: 0;
  }

  .ant-form-large .ant-form-item-label label {
    height: auto !important;
  }
`;

const SocialMedia = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const ListSocialMedia = styled.div`
  display: flex;
  align-items: center;
  gap: 0 20px;

  img {
    width: 58px;
    height: 58px;
  }
`;

const Register = () => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      await register({ ...values, role: 0 });
      message.success("Đăng ký thành công");
      navigate("/auth/login");
    } catch (error: any) {
      message.error(error.response.data);
    }
  };

  const onFinishFail = (errorInfo: any) => {};
  return (
    <Box>
      <LeftSide>
        <Form
          initialValues={{
            email: "",
            password: "",
            phone: "",
          }}
          layout="vertical"
          size="large"
          onFinish={onFinish}
          onFinishFailed={onFinishFail}
        >
          <CustomsFormItem
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập email",
              },
              {
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Sai định dạng email",
              },
            ]}
          >
            <Input placeholder="Nhập email" />
          </CustomsFormItem>
          <CustomsFormItem
            name="fullname"
            label="Họ tên"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập họ tên",
              },
              {
                pattern:
                  /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/gm,
                message: "Sai định dạng tên",
              },
            ]}
          >
            <Input placeholder="Nhập họ tên" />
          </CustomsFormItem>
          <CustomsFormItem
            name="phone"
            label="Số điện thoại"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại",
              },
              {
                pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                message: "Sai định dạng số điện thoại",
              },
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </CustomsFormItem>
          <CustomsFormItem
            name="password"
            label="Mật khẩu"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu",
              },
              {
                min: 6,
                message: "Mật khẩu có ít nhất 6 ký tự",
              },
            ]}
          >
            <Input type="password" placeholder="Nhập email" />
          </CustomsFormItem>
          <SubmitBtn type="primary">Đăng ký</SubmitBtn>
        </Form>
        <SocialMedia>
          <p>Hoặc đăng nhập bằng</p>
          <ListSocialMedia>
            <img src={fb} alt="fb" />
            <img src={gg} alt="gg" />
          </ListSocialMedia>
        </SocialMedia>
      </LeftSide>
      <RightSide>
        <img src={logo} />
      </RightSide>
    </Box>
  );
};

export default Register;
