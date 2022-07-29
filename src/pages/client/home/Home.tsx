import {
  LaptopOutlined,
  PhoneOutlined,
  SoundOutlined,
  TabletOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

import banner from "../../../assets/img/Rectangle.png";

import { Col, Menu, MenuProps, Row } from "antd";
import { getProducts } from "../../../api/product";
import { useEffect, useState } from "react";
import { ProductType } from "../../../types/product";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../utils/formatPrice";

const items: MenuProps["items"] = [
  {
    key: "phone",
    icon: <PhoneOutlined />,
    label: "Điện thoại",
  },
  {
    key: "laptop",
    icon: <LaptopOutlined />,
    label: "Laptop",
  },
  {
    key: "tablet",
    icon: <TabletOutlined />,
    label: "Máy tính bảng",
  },
  {
    key: "sound",
    icon: <SoundOutlined />,
    label: "Âm thanh",
  },
];

const Home = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    handleGetProducts();
  }, []);

  const handleGetProducts = async () => {
    try {
      const { data } = await getProducts();
      setProducts(data.filter((item) => item.status === 1));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <HeroWrapper>
        <CustomsMenu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          items={items}
        />
        <Banner>
          <BannerImage src={banner} />
        </Banner>
      </HeroWrapper>
      <ListProductSide>
        <Title>Danh sách điện thoại</Title>
        <Row gutter={16}>
          {products.map((product) => (
            <Col key={product.id} span={6}>
              <ProductItem>
                <ImageCover>
                  <ProductImage src={product.img} />
                </ImageCover>
                <ProductName to={`/product/${product.id}`}>
                  {product.name}
                </ProductName>
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
                {product.shortDesc && (
                  <ShortDesc>{product.shortDesc}</ShortDesc>
                )}
              </ProductItem>
            </Col>
          ))}
        </Row>
      </ListProductSide>
    </Container>
  );
};

const ShortDesc = styled.div`
  width: 100%;
  padding: 5px 10px 10px 10px;
  border-radius: 5px;
  border: 1px solid #e5e7eb;
  background-color: #f3f4f6;
  color: #444444;
  font-size: 14px;
  font-weight: 500;
  margin: 10px 0 50px 0;
  word-break: break-word;
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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

const ProductItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductName = styled(Link)`
  font-size: 16px;
  margin-bottom: 10px;
  margin-top: 10px;
  color: black;
`;

const ImageCover = styled.div`
  width: 160px;
  height: 160px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Container = styled.div`
  max-width: 1200px;
  padding: 0 30px;
  margin: 0 auto;
`;
const HeroWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const CustomsMenu = styled(Menu)`
  width: 200px;
`;

const Banner = styled.div`
  width: calc(100% - 250px);
  height: 300px;
  margin: 20px 0;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ListProductSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px 0;
  margin-top: 30px;
`;

const Title = styled.h2`
  font-size: 24px;
  text-transform: uppercase;
`;

export default Home;
