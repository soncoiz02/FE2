import React from "react";
import styled from "styled-components";
import { FaSearch, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { BsHandbagFill } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import logo from "../assets/img/logo.png";

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
  width: 500px;
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

const InforItem = styled.a`
  display: flex;
  align-items: center;
  gap: 0 5px;
  color: white;
  font-weight: 400;
  font-size: 14px;
  text-decoration: none;

  & > svg {
    font-size: 20px;
  }
`;

const listInfor = [
  {
    icon: <FaPhoneAlt />,
    content: "Gọi mua hàng",
  },
  {
    icon: <FaMapMarkerAlt />,
    content: "Cửa hàng gần bạn",
  },
  {
    icon: <TbTruckDelivery />,
    content: "Tra cứu đơn hàng",
  },
  {
    icon: <BsHandbagFill />,
    content: "Giỏ hàng",
  },
];
const Header = () => {
  return (
    <HeaderWrapper>
      <Container>
        <LogoWrapper>
          <Logo src={logo} />
        </LogoWrapper>
        <SearchWrapper>
          <SearchInput />
          <SearchIcon>
            <FaSearch />
          </SearchIcon>
        </SearchWrapper>
        <ListInfor>
          {listInfor.map((item, index) => (
            <InforItem key={index} href="#">
              {item.icon} {item.content}
            </InforItem>
          ))}
        </ListInfor>
      </Container>
    </HeaderWrapper>
  );
};

export default Header;
