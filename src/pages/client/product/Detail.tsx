import { ShoppingCartOutlined, StarOutlined } from "@ant-design/icons";
import { Avatar, Breadcrumb, Button, Form, Input, List } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Dispatch } from "redux";
import styled from "styled-components";
import {
  getProduct,
  getProductByCategory,
  getProductComments,
  sendComment,
} from "../../../api/product";
import { CommentType, ProductType } from "../../../types/product";
import { formatPrice } from "../../../utils/formatPrice";
import { ADD_TO_CART } from "../../../redux/action";
import cartSlice from "../cart/CartSlice";
import parse from "html-react-parser";
import useAuth, { User_Type } from "././../../../hooks/useAuth";
const Detail = () => {
  const productId = useParams().id;
  const [products, setProducts] = useState<ProductType[]>([]);
  const [product, setProduct] = useState<ProductType>({
    id: 0,
    name: "",
    price: 0,
    salePrice: 0,
    shortDesc: "",
    longDesc: "",
    specialDesc: "",
    img: "",
    categoryId: 0,
    status: 0,
  });
  const [comments, setComments] = useState<CommentType[]>([]);
  const { token } = useAuth();
  const [user, setUser] = useState<User_Type>();

  const dispatch = useDispatch<Dispatch<any>>();

  useEffect(() => {
    handleGetProduct();
    handleGetComment();
    if (token) handleGetUserInfor();
  }, [productId]);

  const handleGetUserInfor = () => {
    localStorage.getItem("user");
    setUser(JSON.parse(localStorage.getItem("user") || "{}"));
  };

  const handleGetComment = async () => {
    try {
      const { data } = await getProductComments(productId);
      setComments(data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetProduct = async () => {
    try {
      const { data } = await getProduct(productId);
      setProduct(data);
      handleGetProductByCategory(data.categoryId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = () => {
    const data = {
      id: product.id,
      name: product.name,
      price: product.price,
      salePrice: product.salePrice,
      totalPrice: product.salePrice ? product.salePrice : product.price,
      img: product.img,
      quantity: 1,
    };

    dispatch(cartSlice.actions.add(data));
  };

  const handleGetProductByCategory = async (category: number) => {
    try {
      const { data } = await getProductByCategory(category);

      setProducts(
        data.products.filter(
          (item: ProductType, index: number) =>
            item.id !== +productId && index < 6
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendComment = async (values: any) => {
    try {
      const commentData = {
        productId: Number(productId),
        userId: user?.id,
        content: values.content,
        username: user?.fullname,
      };
      await sendComment(commentData);
      handleGetComment();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddComment = (values: any) => {
    handleSendComment(values);
  };

  return (
    <>
      {product && (
        <>
          <CustomsBreakcome>
            <Container>
              <Breadcrumb separator=">">
                <Breadcrumb.Item>
                  <Link to="/">Trang chủ</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Điện thoại</Breadcrumb.Item>
                <Breadcrumb.Item>Samsung</Breadcrumb.Item>
                <Breadcrumb.Item>{product.name}</Breadcrumb.Item>
              </Breadcrumb>
            </Container>
          </CustomsBreakcome>
          <CustomsTitle>
            <Container>
              <Title>{product.name}</Title>
            </Container>
          </CustomsTitle>
          <MainContent>
            <Container>
              <DetailSide>
                <ImgSide>
                  <ImgCover>
                    <img src={product.img} alt="" />
                  </ImgCover>
                  <ListImg>
                    <SubImg>
                      <StarOutlined />
                      Tính năng nổi bật
                    </SubImg>
                    <SubImg>
                      <img src={product.img} alt="" />
                    </SubImg>
                  </ListImg>
                </ImgSide>
                <DetailProduct>
                  <ProductPrice>
                    {product.salePrice ? (
                      <>
                        <span>{formatPrice(product.salePrice)}đ</span>
                        <span>{formatPrice(product.price)}đ</span>
                      </>
                    ) : (
                      <span>{formatPrice(product.price)}đ</span>
                    )}
                  </ProductPrice>
                  <ShortDesc>{product.shortDesc}</ShortDesc>
                  <ListBtnAddToCart>
                    <BtnBuy>Mua ngay</BtnBuy>
                    <BtnAddCart onClick={handleAddToCart}>
                      <IconCover>
                        <ShoppingCartOutlined />
                      </IconCover>
                      Thêm vào giỏ hàng
                    </BtnAddCart>
                  </ListBtnAddToCart>
                </DetailProduct>
              </DetailSide>
              {products.length > 0 && (
                <RelativeProduct>
                  <h2>Sản phẩm cùng loại</h2>
                  <ListProduct>
                    {products.map((item: ProductType, index) => (
                      <ProductItem key={item.id}>
                        <ProductImg>
                          <img src={item.img} alt="" />
                        </ProductImg>
                        <ProductName to={`/product/${item.id}`}>
                          {item.name}
                        </ProductName>
                        <ProductPrice>
                          {item.salePrice ? (
                            <>
                              <span>{formatPrice(item.salePrice)}đ</span>
                              <span>{formatPrice(item.price)}đ</span>
                            </>
                          ) : (
                            <span>{formatPrice(item.price)}đ</span>
                          )}
                        </ProductPrice>
                      </ProductItem>
                    ))}
                  </ListProduct>
                </RelativeProduct>
              )}
              <DescSide>
                {product.specialDesc && (
                  <SpecialDesc>
                    <SpecialDescTitle>Đặc điểm nổi bật</SpecialDescTitle>
                    <SpecialDescText>
                      {parse(product.specialDesc)}
                    </SpecialDescText>
                  </SpecialDesc>
                )}
                <SpecialDescText>{parse(product.longDesc)}</SpecialDescText>
              </DescSide>
              <CommentSide>
                <h2>Đánh giá</h2>
                <List
                  itemLayout="horizontal"
                  dataSource={comments}
                  locale={{ emptyText: "Không có đánh giá nào" }}
                  renderItem={(item) => (
                    <List.Item key={item.id}>
                      <List.Item.Meta
                        avatar={
                          <Avatar src="https://img.freepik.com/free-vector/cute-cat-with-love-sign-hand-cartoon-illustration-animal-nature-concept-isolated-flat-cartoon-style_138676-3419.jpg?w=740&t=st=1660031275~exp=1660031875~hmac=cffacd3bd41650f6f3f9e6f6392b9d96c90b873daeb0ccf5f934770e4774c421" />
                        }
                        title={<p>{item.username}</p>}
                        description={item.content}
                      />
                    </List.Item>
                  )}
                />
                {token && (
                  <CommentForm layout="inline" onFinish={handleAddComment}>
                    <Form.Item name="content">
                      <CustomInput placeholder="Nhập bình luận của bạn" />
                    </Form.Item>
                    <Form.Item>
                      <CustomBtn type="primary" htmlType="submit">
                        Gửi
                      </CustomBtn>
                    </Form.Item>
                  </CommentForm>
                )}
              </CommentSide>
            </Container>
          </MainContent>
        </>
      )}
    </>
  );
};

const CustomBtn = styled(Button)`
  height: 40px;
  width: 100px;
  background: #ff3945;
  border-radius: 5px;
  border: none;

  &:hover {
    background: #ff3945;
    box-shadow: 0px 3px 10px #ff3945;
  }
`;

const CustomInput = styled(Input)`
  height: 40px;
  border-radius: 5px;
  width: 500px;

  &:hover {
    border-color: #ff3945;
  }

  &:focus {
    box-shadow: none;
  }
`;

const CommentForm = styled(Form)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CommentSide = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px 0;

  h2 {
    font: 20px 400;
    color: #444444;
  }
`;

const ProductName = styled(Link)`
  color: #0a263c;
  width: 100%;
  font-size: 16px;
  margin-top: 15px;
`;

const ProductImg = styled.div`
  width: 160px;
  height: 160px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  width: calc(100% / 5.2);
  box-shadow: 0px 1px 2px rgba(60, 64, 67, 0.1);
  border-radius: 10px;
  background: white;
`;

const ListProduct = styled.div`
  display: flex;
  gap: 0 20px;
  width: 100%;
`;

const RelativeProduct = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px 0;
  position: relative;

  h2 {
    font: 20px 400;
    color: #444444;
  }
`;

const SpecialDescText = styled.div`
  width: 100%;
  text-align: left;
  color: #444444;
  margin-top: 20px;
`;

const SpecialDescTitle = styled.h3`
  font-size: 20px;
  color: #d70018;
  text-transform: uppercase;
  margin-bottom: 0;
`;

const SpecialDesc = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px 0;
  background: #f2f2f2;
  border-radius: 5px;
  padding: 10px 20px;
  width: 100%;
`;

const DescSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 30px;
`;

const IconCover = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid #d70018;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 24px;
    color: #d70018;
  }
`;

const BtnAddCart = styled.button`
  display: flex;
  align-items: center;
  gap: 0 10px;
  background: none;
  border: none;
  cursor: pointer;
`;

const BtnBuy = styled.button`
  background: #ff3945;
  color: white;
  border-radius: 5px;
  padding: 10px 55px;
  height: 50px;
  font-size: 16px;
  border: none;
  cursor: pointer;
`;

const ListBtnAddToCart = styled.div`
  display: flex;
  align-items: center;
  gap: 0 10px;
  margin-top: auto;
`;

const ShortDesc = styled.div`
  font-size: 16px;
  color: #444444;
  max-width: 900px;
  word-wrap: break-word;
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0 20px;
  span {
    color: #d70018 #707070;
    font-size: 16px;
    font-weight: 600;
    text-decoration: line-through;

    &:first-child {
      color: #d70018;
      text-decoration: none;
    }
  }
`;

const DetailProduct = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px 0;
  width: calc(100% - 400px);
`;

const SubImg = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 5px 0;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  color: gray;
  text-align: center;
  border: 1px solid #eeeeee;
  padding: 5px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ListImg = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 0 10px;
`;

const ImgCover = styled.div`
  width: 350px;
  height: 350px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImgSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px 0;
`;

const DetailSide = styled.div`
  display: flex;
  gap: 0 50px;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h2`
  color: #0a263c;
  font-size: 20px;
`;

const CustomsTitle = styled.div`
  width: 100%;
  position: relative;
  border-bottom: 1px solid #d1d5db;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 30px;
  width: 100%;
`;

const CustomsBreakcome = styled.div`
  width: 100%;
  position: relative;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

export default Detail;
