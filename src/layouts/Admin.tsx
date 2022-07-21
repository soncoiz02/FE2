import {
  AppstoreOutlined,
  LaptopOutlined,
  PhoneOutlined,
  SearchOutlined,
  SoundOutlined,
  TabletOutlined,
} from "@ant-design/icons";
import { Input, Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";
import logo from "../assets/img/logo.png";

import type { MenuProps } from "antd";

import styled from "styled-components";

const { Header, Content, Sider } = Layout;

const items: MenuProps["items"] = [
  {
    key: "phone",
    icon: <PhoneOutlined />,
    label: <Link to={"/admin/product"}>Điện thoại</Link>,
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
  {
    key: "category",
    icon: <AppstoreOutlined />,
    label: <Link to={"/admin/category"}>Danh mục</Link>,
  },
];

const HeaderCustoms = styled(Header)`
  display: flex;
  align-items: center;
  line-height: 0;
  background-color: #00b0d7;
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

const SearchInput = styled(Input)`
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

const AdminLayout = () => {
  return (
    <Layout>
      <HeaderCustoms className="header">
        <LogoWrapper>
          <Logo src={logo} />
        </LogoWrapper>
        <SearchInput addonBefore={<SearchOutlined />} />
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
