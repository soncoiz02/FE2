import { Col, Form, Input, message, Row, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getCategories } from "../../../api/category";
import { createProduct, getProduct, updateProduct } from "../../../api/product";
import UploadImage from "../../../components/UploadImage";
import { CategoryType } from "../../../types/category";
import { ProductCreateType } from "../../../types/product";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ProductForm = () => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "code", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "code",
  ];

  const productId = useParams().id;

  const navigate = useNavigate();

  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [imageLink, setImageLink] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<string>("");

  const [form] = useForm();

  const onFinish = async (values: any) => {
    if (!imageLink)
      return message.success("Đăng ảnh trước khi tạo sản phẩm", 5);

    const productData: ProductCreateType = {
      ...values,
      price: +values.price,
      salePrice: +values.salePrice,
      img: imageLink,
      status: 1,
    };
    if (productId) return handleUpdateProduct(productData, productId);
    handleCreateProduct(productData);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleGetCategories = async () => {
    try {
      const { data } = await getCategories();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateProduct = async (productData: ProductCreateType) => {
    try {
      const { data } = await createProduct(productData);
      if (data.id) {
        message.success("Tạo mới sản phẩm thành công");
        navigate("/admin/product");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateProduct = async (
    productData: ProductCreateType,
    id: any
  ) => {
    try {
      const { data } = await updateProduct(productData, id);
      if (data.id) {
        message.success("Cập nhật sản phẩm thành công");
        navigate("/admin/product");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetProduct = async () => {
    try {
      const { data } = await getProduct(productId);
      const initialData = {
        name: data.name,
        price: data.price.toString(),
        salePrice: data.salePrice.toString(),
        specialDesc: data.specialDesc,
        shortDesc: data.shortDesc,
        longDesc: data.longDesc,
        categoryId: data.categoryId,
      };
      setPreviewImage(data.img);
      setImageLink(data.img);
      form.setFieldsValue(initialData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetCategories();
    if (productId) handleGetProduct();
  }, [productId]);

  return (
    <Container>
      <Title>{productId ? "Cập nhật sản phẩm" : "Thêm mới sản phẩm"}</Title>
      <FormWrapper
        initialValues={{
          name: "",
          price: "",
          salePrice: "",
          specialDesc: "",
          shortDesc: "",
          longDesc: "",
          categoryId: 0,
        }}
        layout="vertical"
        size="large"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
      >
        <ImgSide>
          <UploadImage
            getImgLink={setImageLink}
            previewImg={previewImage}
            setPreviewImg={setPreviewImage}
          />
          <CustomsFormItem name="shortDesc">
            <ShortDescInput placeholder="Mô tả ngắn"></ShortDescInput>
          </CustomsFormItem>
        </ImgSide>
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
                  {
                    minLength: 6,
                    message: "Tên sản phẩm phải có ít nhất 6 ký tự",
                  },
                ]}
              >
                <CustomsInput placeholder="Nhập tên sản phẩm" />
              </CustomsFormItem>
            </Col>
            <Col span={12}>
              <CustomsFormItem
                name="price"
                label="Giá gốc"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập giá gốc",
                  },
                  {
                    min: 0,
                    message: "Giá gốc phải lớn hơn 0",
                  },
                  {
                    pattern: /^\d+$/,
                    message: "Giá gốc phải là số",
                  },
                ]}
              >
                <CustomsInput placeholder="Nhập giá sản phẩm" />
              </CustomsFormItem>
            </Col>
            <Col span={12}>
              <CustomsFormItem
                name="salePrice"
                label="Giá khuyến mãi"
                rules={[
                  {
                    pattern: /^\d+$/,
                    message: "Giá khuyến mãi phải là số",
                  },
                  ({ getFieldValue }: any) => ({
                    validator: (_: any, value: any) => {
                      if (value && +value > +getFieldValue("price")) {
                        return Promise.reject(
                          "Giá khuyến mãi phải nhỏ hơn giá gốc"
                        );
                      }
                    },
                  }),
                ]}
              >
                <CustomsInput placeholder="Nhập giá khuyến mãi" />
              </CustomsFormItem>
            </Col>
            <Col span={12}>
              <CustomsFormItem
                name="categoryId"
                label="Danh mục"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn danh mục",
                  },
                ]}
              >
                <Select placeholder="Chọn danh mục">
                  {categories.map((category: CategoryType) => (
                    <Select.Option value={category.id} key={category.id}>
                      {category.name}
                    </Select.Option>
                  ))}
                </Select>
              </CustomsFormItem>
            </Col>
            <Col span={24}>
              <CustomsFormItem name="specialDesc" label="Đặc điểm nổi bật">
                <ReactQuill
                  theme="snow"
                  modules={modules}
                  formats={formats}
                  placeholder="Mô tả đặc điểm nổi bật"
                />
              </CustomsFormItem>
            </Col>
            <Col span={24}>
              <CustomsFormItem name="longDesc" label="Mô tả dài">
                <ReactQuill
                  theme="snow"
                  modules={modules}
                  formats={formats}
                  placeholder="Mô tả sản phẩm"
                />
              </CustomsFormItem>
            </Col>
            <Col span={24}>
              <ButtonSubmit type="primary" htmlType="submit">
                {productId ? "Cập nhật" : "Thêm mới"}
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

const ImgSide = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
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

  .ql-toolbar.ql-snow {
    border-radius: 5px 5px 0 0;
    border: 1px solid #d9d9d9;
  }

  .ql-container {
    border-radius: 0 0 5px 5px;
    border: 1px solid #d9d9d9;
  }

  .ql-editor {
    min-height: 200px;
  }
`;

const CustomsInput = styled(Input)`
  border-radius: 5px;
  border: 1px solid #e1e5eb;
`;

const ShortDescInput = styled(Input.TextArea)`
  border-radius: 0 0 10px 10px !important;
`;

const ButtonSubmit = styled.button`
  background: #00b0d7;
  border-radius: 5px;
  padding: 10px 25px;
  color: white;
  border: none;
  cursor: pointer;
`;

export default ProductForm;
