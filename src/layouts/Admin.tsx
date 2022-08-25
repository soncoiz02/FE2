import {
  AppstoreOutlined,
  LaptopOutlined,
  LogoutOutlined,
  PhoneOutlined,
  SearchOutlined,
  SoundOutlined,
  TabletOutlined,
} from "@ant-design/icons";
import { Input, Layout, Menu } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";

import type { MenuProps } from "antd";

import styled from "styled-components";
import { setCookie } from "../utils/cookie";

const { Header, Content, Sider } = Layout;

const items: MenuProps["items"] = [
  {
    key: "product",
    icon: <PhoneOutlined />,
    label: <Link to={"/admin/product"}>Sản phẩm</Link>,
  },
  {
    key: "category",
    icon: <AppstoreOutlined />,
    label: <Link to={"/admin/category"}>Danh mục</Link>,
  },
];

const HeaderCustoms = styled(Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 0;
  background-color: #00b0d7;
`;

const LogoWrapper = styled(Link)`
  width: 60px;
  height: 60px;
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SearchInput = styled(Input)`
  width: 800px;
  border-radius: 10px;
  overflow: hidden;

  .ant-input-group-addon {
    background: white;
    border: none;
  }

  .ant-input {
    border: none;

    &:focus {
      box-shadow: none;
    }
  }
`;

const CustomsSider = styled(Sider)`
  padding: 10px;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const CustomsMenu = styled(Menu)`
  .ant-menu-item.ant-menu-item-selected {
    background: #00b0d7;
    color: white;
    border-radius: 10px;

    &::after {
      content: none;
    }

    a {
      color: white;
    }
  }
`;

const CustomLayout = styled(Layout)`
  min-height: 100vh;
`;

const LayoutWhite = styled(Layout)`
  background: #ffffff;
`;

const UserSide = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: white;
  gap: 0 10px;
  font-size: 16px;
`;

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setCookie("token", "", -1);
    setCookie("user", "", -1);
    navigate("/");
  };
  return (
    <Layout>
      <HeaderCustoms className="header">
        <LogoWrapper to="/">
          <Logo src={logo} />
        </LogoWrapper>
        <SearchInput addonBefore={<SearchOutlined />} />
        <UserSide onClick={() => handleLogout()}>
          <LogoutOutlined />
          Đăng xuất
        </UserSide>
      </HeaderCustoms>
      <CustomLayout>
        <CustomsSider width={250}>
          <CustomsMenu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={items}
          />
        </CustomsSider>
        <LayoutWhite>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
            }}
          >
            <Outlet />
          </Content>
        </LayoutWhite>
      </CustomLayout>
    </Layout>
  );
};

export default AdminLayout;
