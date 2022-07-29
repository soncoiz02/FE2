import { ShoppingCartOutlined, StarOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Dispatch } from "redux";
import styled from "styled-components";
import { getProduct } from "../../../api/product";
import { ProductType } from "../../../types/product";
import { formatPrice } from "../../../utils/formatPrice";
import { ADD_TO_CART } from "../../../redux/action";

const Detail = () => {
  const productId = useParams().id;
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

  const dispatch = useDispatch<Dispatch<any>>();
  const cartData = useSelector((state: any) => state.cart);

  useEffect(() => {
    handleGetProduct();
  }, [productId]);

  const handleGetProduct = async () => {
    try {
      const { data } = await getProduct(productId);
      setProduct(data);
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
      finalPrice: product.salePrice ? product.salePrice : product.price,
      img: product.img,
      quantity: 1,
    };
    dispatch(ADD_TO_CART(data));
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
              <DescSide>
                <SpecialDesc>
                  <SpecialDescTitle>Đặc điểm nổi bật</SpecialDescTitle>
                  <SpecialDescText>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Odio minima aut at amet placeat quos? Tempora, iure!
                    Accusantium doloremque, totam est culpa obcaecati dolore ab
                    quod dolorum, ad quis alias?
                  </SpecialDescText>
                </SpecialDesc>
              </DescSide>
            </Container>
          </MainContent>
        </>
      )}
    </>
  );
};

const SpecialDescText = styled.p`
  text-align: left;
  color: #444444;
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
