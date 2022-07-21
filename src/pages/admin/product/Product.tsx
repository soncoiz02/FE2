import {
  DeleteOutlined,
  EditOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { message, Select, Switch, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getCategories } from "../../../api/category";
import {
  deleteProduct,
  getProductByCategory,
  getProducts,
  updateStatus,
} from "../../../api/product";
import { CategoryType } from "../../../types/category";
import { ProductType } from "../../../types/product";

const AdminProduct = () => {
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
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Thành tiền",
      dataIndex: "price",
      key: "price",
      render: (record) => (
        <>{record.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</>
      ),
    },
    {
      title: "Mô tả",
      key: "shortDesc",
      dataIndex: "shortDesc",
      render: (text) => <CustomsDescription>{text}</CustomsDescription>,
    },
    {
      title: "Ẩn/hiện",
      key: "status",
      render: (_, record) => (
        <Switch
          unCheckedChildren="Ẩn"
          checkedChildren="Hiện"
          defaultChecked={record.status === 1 ? true : false}
          onChange={async () => {
            try {
              const { data } = await updateStatus(
                record.id,
                record.status === 1 ? 0 : 1
              );

              if (data) message.success("Cập nhật trạng thái thành công");
            } catch (error) {
              console.log(error);
            }
          }}
        />
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      dataIndex: "action",
      render: (_, record) => (
        <>
          <Link to={`/admin/product/${record.id}/edit`}>
            <IconEdit />
          </Link>
          <ButtonDelete onClick={() => handleDeleteProduct(record.id)}>
            <IconDelete />
          </ButtonDelete>
        </>
      ),
    },
  ];
  const [tableData, setTableData] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    handleGetProducts();
    handleGetCategories();
  }, []);

  const handleGetProducts = async () => {
    try {
      const { data } = await getProducts();
      setTableData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      setIsLoading(true);
      try {
        const { data } = await deleteProduct(id);
        message.success("Xóa sản phẩm thành công");
        handleGetProducts();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleGetCategories = async () => {
    try {
      const { data } = await getCategories();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetProductByCate = async (cateId: number) => {
    setIsLoading(true);
    try {
      if (cateId === 0) return handleGetProducts();
      const { data } = await getProductByCategory(cateId);
      setTableData(data.products);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Header>
        <Title>Sản phẩm</Title>
        <Link to="/admin/product/create">
          <IconAdd />
        </Link>
      </Header>
      <FillterWrapper>
        <FillterTitle>Bộ lọc</FillterTitle>
        <SelectWrapper>
          <p>Danh mục sản phẩm</p>
          <CustomsSelect
            defaultValue={0}
            size="large"
            onChange={handleGetProductByCate}
          >
            <Select.Option value={0}>Tất cả</Select.Option>
            {categories.map((cate, index) => (
              <Select.Option key={cate.id} value={cate.id}>
                {cate.name}
              </Select.Option>
            ))}
          </CustomsSelect>
        </SelectWrapper>
      </FillterWrapper>
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

const FillterWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0 30px;
  margin-bottom: 30px;
`;

const FillterTitle = styled.p`
  font-size: 18px;
  color: #5f5e61;
  font-weight: 600;
`;

const CustomsSelect = styled(Select)`
  width: 350px;
  &.ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border-radius: 5px;
  }
`;

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
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

export default AdminProduct;
