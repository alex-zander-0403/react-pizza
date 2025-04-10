import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
//
import "./scss/app.scss";
import MainLayout from "./layouts/MainLayout";
import Home from "./comnponents/pages/Home";
import Loader from "./comnponents/ui/Loader/Loader";
//
const Cart = lazy(() => import(/* webpackChunkName: "[CartChunk]"*/ "./comnponents/pages/Cart"));
const FullPizza = lazy(() => import(/* webpackChunkName: "[FullPizzaChunk]"*/ "./comnponents/pages/FullPizza"));
const NotFound = lazy(() => import(/* webpackChunkName: "[NotFoundChunk]"*/ "./comnponents/pages/NotFound"));

//
function App() {
  //
  return (
    //
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<Loader />}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<Loader />}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<Loader />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

//
export default App;
