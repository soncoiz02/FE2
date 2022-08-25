import { SafetyOutlined } from "@ant-design/icons";
import { LoadingOutlined } from "@ant-design/icons";
import { LogoutOutlined } from "@ant-design/icons";
import { LoginOutlined, UserOutlined } from "@ant-design/icons";
import { message } from "antd";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { BsHandbagFill } from "react-icons/bs";
import { FaMapMarkerAlt, FaPhoneAlt, FaSearch } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { searchProduct } from "../api/product";
import logo from "../assets/img/logo.png";
import useAuth from "../hooks/useAuth";
import { ProductType } from "../types/product";
import { setCookie } from "../utils/cookie";

const HeaderWrapper = styled.div`
  background: #d70018;
  width: 100%;
`;

const Container = styled.div`
  max-width: 1200px;
  padding: 5px 30px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoWrapper = styled.div`
  width: 60px;
  height: 60px;
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 400px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 15px 10px 40px;
  font-size: 14px;
  background: white;
  border: none;
  outline: none;
  border-radius: 5px;
`;

const SearchIcon = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 15px;
`;

const ListInfor = styled.div`
  display: flex;
  align-items: center;
  gap: 0 10px;
`;

const InforItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0 5px;
  color: white;
  font-weight: 400;
  font-size: 14px;
  text-decoration: none;

  &:hover {
    color: white;
  }

  & > svg {
    font-size: 20px;
  }
`;

const UserInfor = styled.div`
  display: flex;
  position: relative;
  cursor: pointer;
  p {
    font-size: 18px;
    color: white;
    font-weight: 600;
    margin: 0;
  }
`;

const UserOption = styled.div`
  position: absolute;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  background: white;
  opacity: 0;
  visibility: hidden;
  top: 50px;
  transition: 0.2s;
  z-index: 50;

  p,
  a {
    display: flex;
    align-items: center;
    gap: 0 5px;
    font-size: 14px;
    font-weight: 400;
    color: #d70018;
    padding: 5px;
    white-space: nowrap;
  }

  ${UserInfor}:hover & {
    opacity: 1;
    visibility: visible;
    top: 25px;
  }
`;

const ListSearchProduct = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  width: 100%;
  min-height: 100px;
  max-height: 350px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  background: white;
  position: absolute;
  top: 50px;
  left: 0;
  z-index: 50;
`;

const SearchItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  width: 100%;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;

    p {
      color: #d70018;
    }
  }

  img {
    width: 50px;
    height: 50px;
  }

  p {
    font-size: 14px;
    color: #444444;
    margin: 0;
  }
`;

const Loading = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 50px;
    color: gray;
  }
`;

const NotFound = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const listInfor = [
  {
    icon: <FaPhoneAlt />,
    content: "Gọi mua hàng",
    path: "#",
  },
  {
    icon: <FaMapMarkerAlt />,
    content: "Cửa hàng gần bạn",
    path: "#",
  },
  {
    icon: <TbTruckDelivery />,
    content: "Tra cứu đơn hàng",
    path: "#",
  },
  {
    icon: <BsHandbagFill />,
    content: "Giỏ hàng",
    path: "/cart",
  },
];

const Header = () => {
  const { token } = useAuth();
  const [user, setUser] = useState<any>(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchProducts, setSearchProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const handleLogout = () => {
    setCookie("token", "", -1);
    localStorage.removeItem("user");
    navigate("/");
    message.success("Đăng xuất thành công");
  };

  useEffect(() => {
    if (token) {
      const getUser = localStorage.getItem("user");
      setUser(JSON.parse(getUser || "{}"));
    }
  }, [token]);

  const handleSearchProduct = async (keyword: string) => {
    try {
      const { data } = await searchProduct(keyword);
      setSearchProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const debounceSearch = useCallback(
    debounce((nextValue) => handleSearchProduct(nextValue), 1000),
    []
  );

  const handleSearch = (e: any) => {
    setSearchValue(e.target.value);
    setIsLoading(true);
    if (e.target.value.trim()) {
      debounceSearch(e.target.value);
    }
  };

  const handleNavigate = (id: number) => {
    setSearchValue("");
    navigate(`/product/${id}`);
  };

  return (
    <HeaderWrapper>
      <Container>
        <LogoWrapper>
          <Logo src={logo} />
        </LogoWrapper>
        <SearchWrapper>
          <SearchInput
            value={searchValue}
            placeholder="Tìm kiếm"
            onChange={(e: any) => handleSearch(e)}
          />
          <SearchIcon>
            <FaSearch />
          </SearchIcon>
          {searchValue && (
            <ListSearchProduct>
              {isLoading ? (
                <Loading>
                  <LoadingOutlined />
                </Loading>
              ) : searchProducts.length > 0 ? (
                searchProducts.map((product: ProductType) => (
                  <SearchItem onClick={() => handleNavigate(product.id)}>
                    <img src={product.img} alt="" />
                    <p>{product.name}</p>
                  </SearchItem>
                ))
              ) : (
                <NotFound>Không tìm thấy sản phẩm tương tự</NotFound>
              )}
            </ListSearchProduct>
          )}
        </SearchWrapper>
        <ListInfor>
          {listInfor.map((item, index) => (
            <InforItem key={index} to={item.path}>
              {item.icon} {item.content}
            </InforItem>
          ))}
          {token ? (
            <UserInfor>
              <p>
                <UserOutlined />
                {user?.fullname}
              </p>
              <UserOption>
                {user?.role === 1 && (
                  <Link to="/admin/product">
                    <SafetyOutlined />
                    Admin
                  </Link>
                )}
                <p onClick={handleLogout}>
                  <LogoutOutlined />
                  Đăng xuất
                </p>
              </UserOption>
            </UserInfor>
          ) : (
            <InforItem to="/auth/login">
              <LoginOutlined />
              Đăng nhập
            </InforItem>
          )}
        </ListInfor>
      </Container>
    </HeaderWrapper>
  );
};

export default Header;
