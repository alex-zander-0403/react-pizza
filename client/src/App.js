import React, { useState } from "react";
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
  const [searchValue, setSearchValue] = useState("");
  //
  return (
    <div className="wrapper">
      {/*  */}
      <Header />
      {/*  */}
      <div className="content">
        {/*  */}
        <Routes>
          <Route
            path="/"
            element={
              <Home searchValue={searchValue} setSearchValue={setSearchValue} />
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/*  */}
      </div>
    </div>
  );
}

//
export default App;
