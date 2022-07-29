import { Route, Routes } from "react-router-dom";
import AdminLayout from "../layouts/Admin";
import ClientLayout from "../layouts/Client";
import Category from "../pages/admin/category/Category";
import CategoryForm from "../pages/admin/category/CategoryForm";
import AdminProduct from "../pages/admin/product/Product";
import ProductForm from "../pages/admin/product/ProductForm";
import Cart from "../pages/client/cart/Cart";
import Home from "../pages/client/home/Home";
import Detail from "../pages/client/product/Detail";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<Home />} />
        <Route path="product/:id" element={<Detail />} />
        <Route path="cart" element={<Cart />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="category">
          <Route index element={<Category />} />
          <Route path="create" element={<CategoryForm />} />
          <Route path=":id/edit" element={<CategoryForm />} />
        </Route>
        <Route path="product">
          <Route index element={<AdminProduct />} />
          <Route path="create" element={<ProductForm />} />
          <Route path=":id/edit" element={<ProductForm />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
