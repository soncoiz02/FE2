import {
  LaptopOutlined,
  PhoneOutlined,
  StarFilled,
  TabletOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

import banner from "../../../assets/img/Rectangle.png";

import { MenuUnfoldOutlined } from "@ant-design/icons";
import { Col, Menu, MenuProps, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { getCategories } from "../../../api/category";
import {
  getAllComments,
  getProductByCategory,
  getProductComments,
  getProducts,
  getProductWithCommentByCate,
  sortProduct,
} from "../../../api/product";
import { CategoryType } from "../../../types/category";
import { ProductType, ProductWithCommentType } from "../../../types/product";
import { formatPrice } from "../../../utils/formatPrice";

const listIcon = [<PhoneOutlined />, <LaptopOutlined />, <TabletOutlined />];

const Home = () => {
  const [products, setProducts] = useState<ProductWithCommentType[]>([]);
  const [menuItem, setMenuItem] = useState<MenuProps["items"]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [listCommentLength, setListCommentLength] = useState<number[]>([]);
  useEffect(() => {
    if (searchParams.get("cate")) {
      handleGetProductByCategory(searchParams.get("cate"));
    } else {
      handleGetProducts();
    }
    handleGetCategory();
  }, [searchParams.get("cate")]);

  const handleGetProductByCategory = async (category: string) => {
    try {
      const { data } = await getProductWithCommentByCate(category);
      setProducts(
        data.filter((item: ProductWithCommentType) => item.status === 1)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetProducts = async () => {
    try {
      const { data } = await getProducts();
      const activeData = data.filter((item: ProductType) => item.status === 1);
      setProducts(activeData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetCategory = async () => {
    try {
      const { data } = await getCategories();
      const menuItemByCate = data.map((item: CategoryType, index: number) => {
        return {
          key: item.id + 1,
          icon: listIcon[index],
          label: <Link to={`/?cate=${item.id}`}>{item.name}</Link>,
        };
      });
      setMenuItem([
        {
          key: 1,
          icon: <MenuUnfoldOutlined />,
          label: <Link to={"/"}>Tất cả</Link>,
        },
        ...menuItemByCate,
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetSortProducts = async (sort: string, order: string) => {
    try {
      const { data } = await sortProduct(sort, order);
      setProducts(data.filter((item: ProductType) => item.status === 1));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSort = (value: string) => {
    switch (value) {
      case "price-asc":
        handleGetSortProducts("price", "asc");
        break;
      case "price-desc":
        handleGetSortProducts("price", "desc");
        break;
      case "name-asc":
        handleGetSortProducts("name", "asc");
        break;
      case "name-desc":
        handleGetSortProducts("name", "desc");
        break;
      default:
        handleGetProducts();
    }
  };

  return (
    <Container>
      <HeroWrapper>
        <CustomsMenu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          items={menuItem}
        />
        <Banner>
          <BannerImage src={banner} />
        </Banner>
      </HeroWrapper>
      <ListProductSide>
        <TitleSide>
          <Title>Danh sách sản phẩm</Title>
          <FilterSide>
            <CustomsSelect placeholder="Sắp xếp theo" onChange={handleSort}>
              <Select.Option value="all">Không</Select.Option>
              <Select.Option value="price-desc">Giá cao - thấp</Select.Option>
              <Select.Option value="price-asc">Giá thấp - cao</Select.Option>
              <Select.Option value="name-asc">Tên A - Z</Select.Option>
              <Select.Option value="name-desc">Tên Z - A</Select.Option>
            </CustomsSelect>
          </FilterSide>
        </TitleSide>
        <Row gutter={16}>
          {products.map((product: ProductType, index: number) => (
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
                <Rating>
                  <ListStar>
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                  </ListStar>
                  <p>{product.comments.length} đánh giá</p>
                </Rating>
              </ProductItem>
            </Col>
          ))}
        </Row>
      </ListProductSide>
    </Container>
  );
};

const ListStar = styled.div`
  display: flex;
  align-items: center;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  width: 100%;
  gap: 0 10px;

  p {
    margin: 0;
  }
`;

const CustomsSelect = styled(Select)`
  width: 150px;
`;

const FilterSide = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const TitleSide = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ShortDesc = styled.div`
  width: 100%;
  padding: 5px 10px 10px 10px;
  border-radius: 5px;
  border: 1px solid #e5e7eb;
  background-color: #f3f4f6;
  color: #444444;
  font-size: 14px;
  font-weight: 500;
  margin-top: 10px;
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
  margin-bottom: 20px;
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
