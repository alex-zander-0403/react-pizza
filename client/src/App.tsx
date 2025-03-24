import React from "react";
import { Routes, Route } from "react-router-dom";
//
// useSelector == useContext
// useDispatch == сделай action
// import { useSelector, useDispatch } from 'react-redux'
//
import "./scss/app.scss";
//
import MainLayout from "./layouts/MainLayout";
import Home from "./comnponents/pages/Home";
import Cart from "./comnponents/pages/Cart";
import NotFound from "./comnponents/pages/NotFound";
import FullPizza from "./comnponents/pages/FullPizza";

//
function App() {
  //
  return (
    //
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

//
export default App;
