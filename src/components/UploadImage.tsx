import { PlusSquareOutlined } from "@ant-design/icons";
import { message } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import { upload } from "../api/image";

type PropsType = {
  getImgLink: (imgLink: string) => void;
  previewImg: string;
  setPreviewImg: (imgLink: string) => void;
};

const UploadImage = ({ getImgLink, previewImg, setPreviewImg }: PropsType) => {
  const handleChangeImage = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewImg(reader.result as string);
      uploadImage(reader.result as string);
    };
  };

  const uploadImage = async (base64Img: string) => {
    try {
      const { data } = await upload(base64Img);
      getImgLink(data.url);
      message.success("Upload ảnh thành công", 3);
    } catch (error) {
      console.log(error);
      message.error("Upload ảnh thất bại", 3);
    }
  };

  return (
    <>
      <ImgLabel htmlFor="image">
        {previewImg ? <PreviewImage src={previewImg} /> : <IconAdd />}
      </ImgLabel>
      <input
        onChange={(e) => handleChangeImage(e)}
        style={{ display: "none" }}
        type="file"
        id="image"
        accept="jpg,png,jpeg"
      />
    </>
  );
};

const ImgLabel = styled.label`
  width: 400px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #e6e6e6;
  border-radius: 10px 10px 0 0;
  cursor: pointer;
  overflow: hidden;
  padding: 30px;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const IconAdd = styled(PlusSquareOutlined)`
  font-size: 24px;
  color: #00b0d7;
`;

export default UploadImage;
