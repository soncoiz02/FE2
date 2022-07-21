import { Col, Form, Input, message, Row } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  createCategory,
  getCategory,
  updateCategory,
} from "../../../api/category";

const CategoryForm = () => {
  const cateId = useParams().id;
  const navigate = useNavigate();

  const [form] = useForm();

  const onFinish = async (values: any) => {
    if (cateId) return handleUpdateCategory(values, cateId);
    handleCreateCategory(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleUpdateCategory = async (values: any, id: any) => {
    try {
      const { data } = await updateCategory(values, cateId);
      message.success("Cập nhật thành công");
      navigate("/admin/category");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateCategory = async (values: any) => {
    try {
      const { data } = await createCategory(values);
      message.success("Tạo mới danh mục thành công");
      navigate("/admin/category");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (cateId) handleGetCategory();
  }, [cateId]);

  const handleGetCategory = async () => {
    try {
      const { data } = await getCategory(cateId);
      form.setFieldsValue(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Title>{cateId ? "Cập nhật sản phẩm" : "Thêm mới sản phẩm"}</Title>
      <FormWrapper
        initialValues={{
          name: "",
        }}
        layout="vertical"
        size="large"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
      >
        <InforSide>
          <InforTitle>Thông tin sản phẩm</InforTitle>
          <Row gutter={16}>
            <Col span={24}>
              <CustomsFormItem
                name="name"
                label="Tên sản phẩm"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên sản phẩm",
                  },
                ]}
              >
                <CustomsInput placeholder="Nhập tên sản phẩm" />
              </CustomsFormItem>
            </Col>
            <Col span={24}>
              <ButtonSubmit type="primary" htmlType="submit">
                {cateId ? "Cập nhật" : "Thêm mới"}
              </ButtonSubmit>
            </Col>
          </Row>
        </InforSide>
      </FormWrapper>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 20px 0;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #5f5e61;
`;

const FormWrapper = styled(Form)`
  display: flex;
  gap: 0 50px;
  width: 100%;
`;

const InforSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: calc(100% - 450px);
`;

const InforTitle = styled.div`
  width: 100%;
  color: #3d5170;
  padding: 15px 10px;
  border-bottom: 1px solid #e6e6e6;
  font-size: 18px;
`;

const CustomsFormItem = styled(Form.Item)`
  width: 100%;
  .ant-form-item-label {
    padding: 0;
  }
  label {
    font-size: 14px;
    color: #5a6169;
  }
  textarea.ant-input {
    border-radius: 5px;
    resize: none;
    min-height: 100px;
  }
`;

const CustomsInput = styled(Input)`
  border-radius: 5px;
  border: 1px solid #e1e5eb;
`;

const ButtonSubmit = styled.button`
  background: #00b0d7;
  border-radius: 5px;
  padding: 10px 25px;
  color: white;
  border: none;
  cursor: pointer;
`;

export default CategoryForm;
