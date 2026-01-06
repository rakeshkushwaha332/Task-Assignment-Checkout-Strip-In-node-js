import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Layout from "./component/Layout";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import AddProduct from "./Admin/Addproduct";
import Checkout from "./pages/Checkout";
import CancelPage from "./pages/CancelPage";
import DisplayProduct from "./Admin/displayproduct";
import ProductDetail from "./pages/ProductDeatils";
import SuccessPage from "./pages/SuccessPage";
import OrderList from "./Admin/OrderList";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<Home/>}/>
            <Route path="home" element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="success" element={<SuccessPage />} />

            <Route path="cancel" element={<CancelPage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="displayproduct" element={<DisplayProduct/>} />
            <Route path="orderlist" element={<OrderList/>} />

            
          </Route>
            <Route path="/admin" element={<AddProduct />} />
           

            
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
