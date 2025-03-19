import React, { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
//
// useSelector == useContext
// useDispatch == сделай action
// import { useSelector, useDispatch } from 'react-redux'
// import { decrement, increment } from './counterSlice'
//
import Header from "./comnponents/ui/Header";
import Home from "./comnponents/pages/Home";
import Cart from "./comnponents/pages/Cart";
import NotFound from "./comnponents/pages/NotFound";
//
import "./scss/app.scss";

//
// создание контекста
// export const SearchContext = createContext({});

//
//
function App() {
  //
  // const [searchValue, setSearchValue] = useState("");

  //
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

//
export default App;
