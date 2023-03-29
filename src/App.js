import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import About from "./pages.js/home";
import Backend from "./component.js/backend.js/index";
import Shop from "./pages.js/shop";
import Checkout from "./pages.js/checkout";
import Contact from "./pages.js/contact";
import ShopDetails from "./pages.js/shopDetails";
import ShoppingCart from "./pages.js/shoppingCart";
import Registration from "./pages.js/Registration";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages.js/logIn";
import Profile from "./pages.js/profile";
import Product from "./pages.js/newProduct";
import Modall from "./pages.js/modal";
import Payment from "./helper.js/payment";

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route element={<Backend />}>
          <Route path="/" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shopDetails/:id" element={<ShopDetails />} />
          <Route path="/shoppingCart" element={<ShoppingCart />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/log-in" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/product/add" element={<Product />} />
          <Route path="/modal" element={<Modall />} />
          <Route path="/payment" element={<Payment />} />
          
          
        </Route>
      </Routes>
    </div>
  );
}

export default App;
