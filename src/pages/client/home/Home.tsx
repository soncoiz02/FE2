import {
  LaptopOutlined,
  PhoneOutlined,
  SoundOutlined,
  TabletOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

import { Menu } from "antd";

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

const Container = styled.div`
  max-width: 1200px;
  padding: 0 30px;
  margin: 0 auto;
`;
const HeroWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
`;

const CustomsMenu = styled(Menu)`
  width: 200px;
`;

const Home = () => {
  return (
    <Container>
      <HeroWrapper>
        <CustomsMenu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          items={items}
        />
      </HeroWrapper>
    </Container>
  );
};

export default Home;
