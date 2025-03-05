import React from "react";
import { Routes, Route } from "react-router-dom";
//
import Header from "./comnponents/ui/Header";
import Home from "./comnponents/pages/Home";
import Cart from "./comnponents/pages/Cart";
import NotFound from "./comnponents/pages/NotFound";
//
import "./scss/app.scss";

//
function App() {
  //
  return (
    <div className="wrapper">
      {/*  */}
      <Header />
      {/*  */}
      <div className="content">
        <div className="container">
          {/*  */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {/*  */}
        </div>
      </div>
    </div>
  );
}

//
export default App;
