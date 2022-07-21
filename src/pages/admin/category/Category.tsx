import {
  DeleteOutlined,
  EditOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { message } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { deleteCategory, getCategories } from "../../../api/category";
import { CategoryType } from "../../../types/category";

const Category = () => {
  const columns: ColumnsType<any> = [
    {
      title: "#",
      dataIndex: "num",
      key: "num",
      render: (_, record, index) => {
        return index + 1;
      },
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <>
          <Link to={`/admin/category/${record.id}/edit`}>
            <IconEdit />
          </Link>
          <ButtonDelete onClick={() => handleDeleteCategory(record.id)}>
            <IconDelete />
          </ButtonDelete>
        </>
      ),
    },
  ];

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tableData, setTableData] = useState<CategoryType[]>([]);

  useEffect(() => {
    hanldeGetCategories();
  }, []);

  const hanldeGetCategories = async () => {
    try {
      const { data } = await getCategories();
      setTableData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      setIsLoading(true);
      try {
        const { data } = await deleteCategory(id);
        message.success("Xóa danh mục thành công");
        hanldeGetCategories();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Container>
      <Header>
        <Title>Sản phẩm</Title>
        <Link to="/admin/category/create">
          <IconAdd />
        </Link>
      </Header>
      <CustomsTable
        loading={isLoading}
        columns={columns}
        dataSource={tableData}
      />
    </Container>
  );
};

const CustomsDescription = styled.div`
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  width: 300px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;
const IconAdd = styled(PlusSquareOutlined)`
  font-size: 24px;
  color: #00b0d7;
`;
const IconEdit = styled(EditOutlined)`
  font-size: 24px;
  color: #00b0d7;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #5f5e61;
`;

const CustomsTable = styled(Table)`
  .ant-table-thead > tr > th {
    background: #fbfbfb;
  }
  .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before {
    content: none;
  }
`;

const ButtonDelete = styled.button`
  border: none;
  background: none;
  color: red;
`;

const IconDelete = styled(DeleteOutlined)`
  font-size: 24px;
  color: red;
  cursor: pointer;
`;

export default Category;
