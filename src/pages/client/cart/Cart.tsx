import { CloseCircleOutlined, LeftOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  DECREASE_QUANTITY,
  DELETE_ITEM,
  INCREASE_QUANTITY,
} from "../../../redux/action";
import { CartType } from "../../../types/product";
import { formatPrice } from "../../../utils/formatPrice";
import cartSlice from "./CartSlice";

const Cart = () => {
  const [quantity, setQuantity] = useState(1);
  const { cart } = useSelector((state: any) => state);

  const dispatch = useDispatch();

  const handleUpdateQuantity = (type: string, id: number, quantity: number) => {
    if (type === "minus") {
      if (quantity === 1) {
        handleDeleteItem(id);
        return;
      }
      dispatch(cartSlice.actions.decrease(id));
    } else if (type === "plus") {
      dispatch(cartSlice.actions.increase(id));
    }
  };

  const handleDeleteItem = (id: number) => {
    if (
      window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?")
    ) {
      return dispatch(cartSlice.actions.delete(id));
    }
  };

  return (
    <>
      <Container>
        <CartHeader>
          <BtnBack to="/">
            <LeftOutlined />
            <p>Trở về</p>
          </BtnBack>
          <Title>Giỏ hàng</Title>
        </CartHeader>
        <ListCart>
          {cart?.cart?.length > 0 &&
            cart.cart.map((item: CartType, index: number) => (
              <CartItem key={index}>
                <ImgSide>
                  <img src={item.img} alt="" />
                </ImgSide>
                <BtnDelete onClick={() => handleDeleteItem(item.id)}>
                  <CloseCircleOutlined />
                </BtnDelete>
                <DetailSide>
                  <Name>{item.name}</Name>
                  <ProductPrice>
                    {item.salePrice > 0 && (
                      <span>{formatPrice(item.salePrice)}đ</span>
                    )}
                    <span>{formatPrice(item.price)}đ</span>
                  </ProductPrice>
                  <Quantity>
                    <p>Chọn số lượng</p>
                    <QuantityInput>
                      <button
                        onClick={() =>
                          handleUpdateQuantity("minus", item.id, item.quantity)
                        }
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={item.quantity}
                        onChange={(e) => setQuantity(+e.target.value)}
                      />
                      <button
                        onClick={() =>
                          handleUpdateQuantity("plus", item.id, item.quantity)
                        }
                      >
                        +
                      </button>
                    </QuantityInput>
                  </Quantity>
                  <ProductTotalPrice>
                    <p>Tổng tiền: </p>
                    <p>{formatPrice(item.totalPrice)}đ</p>
                  </ProductTotalPrice>
                </DetailSide>
              </CartItem>
            ))}
        </ListCart>
        <TotalPriceBox>
          <TotalPrice>
            <p>Tổng tiền tạm tính</p>
            <p>{formatPrice(cart?.total)}đ</p>
          </TotalPrice>
          <BtnOrder>Tiến hành đặt hàng</BtnOrder>
          <BtnChooseAnother to="/">Chọn thêm sản phẩm khác</BtnChooseAnother>
        </TotalPriceBox>
      </Container>
    </>
  );
};

const BtnDelete = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;

  svg {
    font-size: 16px;
    color: gray;
  }
`;

const ProductTotalPrice = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0 10px;
  margin-top: auto;

  p {
    font-size: 18px;
    color: #0e2431;

    &:last-child {
      color: #d70018;
    }
  }
`;

const BtnChooseAnother = styled(Link)`
  width: 100%;
  padding: 10px;
  background: white;
  color: #d70018;
  border: 1px solid #d70018;
  cursor: pointer;
  border-radius: 5px;
  text-transform: uppercase;
  font-size: 16px;
  text-align: center;

  &:hover {
    color: #d70018;
  }
`;

const BtnOrder = styled.button`
  width: 100%;
  padding: 10px;
  background: #d70018;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  text-transform: uppercase;
  font-size: 16px;
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;

  p {
    font-size: 18px;
    color: #0e2431;

    &:last-child {
      color: #d70018;
    }
  }
`;

const TotalPriceBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px 0;
  margin-top: 20px;
  padding: 10px;
  box-shadow: 0px 1px 2px 0px #3c40431a;
  border-radius: 10px;
`;

const QuantityInput = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #dddddd;
  border-radius: 3px;

  button {
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
    cursor: pointer;
  }

  input {
    width: 30px;
    height: 25px;
    border: none;
    text-align: center;
    outline: none;
    font-size: 14px;
  }
`;

const Quantity = styled.div`
  display: flex;
  align-items: center;
  gap: 0 10px;

  p {
    font-size: 16px;
    color: #0e2431;
    margin-bottom: 0;
  }
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

const Name = styled.p`
  color: #0e2431;
  font-size: 18px;
  margin-bottom: 0;
`;

const DetailSide = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 230px);
`;

const ImgSide = styled.div`
  position: relative;
  width: 200px;
  height: 200px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CartItem = styled.div`
  position: relative;
  display: flex;
  gap: 0 30px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 1px 2px 0px #3c40431a;
`;

const ListCart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px 0;
  margin-top: 30px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 400;
  color: #d70018;
  margin-bottom: 0;
`;

const BtnBack = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 18px;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  p {
    color: #d70018;
    margin-bottom: 0;
  }
`;

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  width: 100%;
`;

const CartHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export default Cart;
