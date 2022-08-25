import { Col, Row } from "antd";
import React from "react";
import vpBank from "../assets/img/vpBank.png";
import citi from "../assets/img/citi.png";
import vnPay from "../assets/img/vnPay.png";
import moca from "../assets/img/moca.png";
import kredivo from "../assets/img/kredivo.png";
import dtvui from "../assets/img/dtvui.png";

import styled from "styled-components";

const footerItem1 = [
  {
    id: 1,
    children: [
      {
        content: "Tìm cửa hàng",
        style: { fontSize: 16 },
      },
      {
        content: "Tìm cửa hàng gần nhất",
      },
      {
        content: "Mua hàng từ xa",
      },
      {
        content: "Gặp trực tiếp cửa hàng gần nhất (Zalo hoặc gọi điện)",
        style: { color: "#FF0000" },
      },
      {
        content: "Phương thức thanh toán",
        style: { fontSize: 16, marginTop: 10 },
      },
      {
        listImg: [
          {
            src: citi,
          },
          {
            src: moca,
          },
          {
            src: kredivo,
          },
          {
            src: vnPay,
          },
          {
            src: vpBank,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    children: [
      {
        content: "Gọi mua hàng: 1800.2044 (8h00 - 22h00)",
      },
      {
        content: "Gọi khiếu nại: 1800.2063 (8h00 - 21h30)",
      },
      {
        content: "Gọi bảo hành: 1800.2064 (8h00 - 21h00)",
      },
      {
        content: "Đối tác dịch vụ bảo hành",
        style: { fontSize: 16, marginTop: 10 },
      },
      {
        content: "Điện Thoại - Máy tính",
      },
      {
        content: "Trung tâm bảo hành uỷ quyền Apple",
        style: { fontSize: 16, marginTop: 10 },
      },
      {
        img: dtvui,
      },
    ],
  },
  {
    id: 3,
    children: [
      {
        content: "Mua hàng và thanh toán Online",
      },
      {
        content: "Mua hàng trả góp Online",
      },
      {
        content: "Tra thông tin đơn hàng",
      },
      {
        content: "Tra điểm Smember",
      },
      {
        content: "Tra thông tin bảo hành",
      },
      {
        content: "Tra cứu hoá đơn VAT điện tử",
      },
      {
        content: "Trung tâm bảo hành chính hãng",
      },
      {
        content: "Quy định về việc sao lưu dữ liệu",
      },
      {
        content: "Dịch vụ bảo hành điện thoại",
        style: { color: "#D70018" },
      },
    ],
  },
  {
    id: 4,
    children: [
      {
        content: "Quy chế hoạt động",
      },
      {
        content: "Chính sách Bảo hành",
      },
      {
        content: "Liên hệ hợp tác kinh doanh",
      },
      {
        content: "Khách hàng doanh nghiệp (B2B)",
      },
      {
        content: "Ưu đãi thanh toán",
        style: { color: "#D70018" },
      },
      {
        content: "Tuyển dụng",
      },
    ],
  },
];

const footerItem2 = [
  {
    id: 1,
    children: [
      {
        content:
          "Điện thoại iPhone 13 - Điện thoại iPhone 12 - Điện thoại iPhone 11",
      },
      {
        content: "Điện thoại iPhone 13 Pro Max - Điện thoại iPhone 11 Pro Max",
      },
      {
        content:
          "iPhone cũ giá rẻ - iPhone 13 cũ - iPhone 12 cũ - iPhone 11 cũ",
      },
    ],
  },
  {
    id: 2,
    children: [
      {
        content:
          "Điện thoại iPhone - Điện thoại Samsung - Điện thoại Samsung A",
      },
      {
        content:
          "Điện thoại OPPO - Điện thoại Xiaomi - Điện thoại Vivo - Điện thoại Nokia",
      },
      {
        content: "Samsung Fold 3 - Samsung S22 - Samsung A73 - Samsung A53",
      },
    ],
  },
  {
    id: 3,
    children: [
      {
        content: "Laptop - Laptop HP - Laptop Dell - Laptop Acer",
      },
      {
        content: "Microsoft Surface - Laptop Lenovo - Laptop Asus",
      },
      {
        content:
          "Máy tính để bàn - Màn hình máy tính - Camera - Camera hành trình",
      },
    ],
  },
];

const Footer = () => {
  return (
    <>
      <FooterTop>
        <Container>
          <Row gutter={16}>
            {footerItem1.map((item: any) => (
              <Col span={6} key={item.id}>
                <ListItem>
                  {item?.children.map((child: any, index: number) => (
                    <>
                      <FooterText size={12} style={child.style} key={index}>
                        {child.content}
                      </FooterText>
                      {child.listImg && (
                        <Row gutter={16}>
                          {child.listImg.map((item: any, i: number) => (
                            <Col span={6}>
                              <img src={item.src} key={i} />
                            </Col>
                          ))}
                        </Row>
                      )}
                      {child.img && <img src={child.img} />}
                    </>
                  ))}
                </ListItem>
              </Col>
            ))}
          </Row>
        </Container>
      </FooterTop>
      <FooterBottom>
        <Container>
          <Row gutter={16}>
            {footerItem2.map((item: any) => (
              <Col span={8} key={item.id}>
                <ListItem>
                  {item?.children.map((child: any, index: number) => (
                    <FooterText size={10} key={index}>
                      {child.content}
                    </FooterText>
                  ))}
                </ListItem>
              </Col>
            ))}
          </Row>
          <TextInfo>
            Công ty TNHH Thương mại và dịch vụ kỹ thuật DIỆU PHÚC - GPĐKKD:
            0316172372 do sở KH & ĐT TP. HCM cấp ngày 02/03/2020. Địa chỉ:
            350-352 Võ Văn Kiệt, Phường Cô Giang, Quận 1, Thành phố Hồ Chí Minh,
            Việt Nam. Điện thoại: 028.7108.9666.
          </TextInfo>
        </Container>
      </FooterBottom>
    </>
  );
};

const TextInfo = styled.div`
  text-align: center;
  color: #00000080;
  font-size: 10px;
  margin-top: 10px;
`;

const FooterBottom = styled.div`
  background-color: #f8f8f8;
  padding: 20px 0;
  width: 100%;
`;

const FooterText = styled.div`
  font-size: ${(props: any) => props.size}px;
  margin-bottom: 0;
  color: #444444;
`;

const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px 0;
`;

const Container = styled.div`
  max-width: 1200px;
  padding: 0 30px;
  position: relative;
  margin: 0 auto;
`;

const FooterTop = styled.div`
  position: relative;
  width: 100%;
  margin-top: 30px;
  padding: 30px 0;
`;

export default Footer;
