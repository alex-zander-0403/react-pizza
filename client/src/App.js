import React from "react";
//
import Header from "./comnponents/ui/Header";
import Categories from "./comnponents/ui/Categories";
import Sort from "./comnponents/ui/Sort";
import PizzaCard from "./comnponents/ui/PizzaCard";
//
import "./scss/app.scss";

//
function App() {
  //

  //
  return (
    <div class="wrapper">
      {/*  */}
      <Header />
      {/*  */}
      <div class="content">
        <div class="container">
          <div class="content__top">
            {/*  */}
            <Categories />
            {/*  */}
            <Sort />
          </div>
          <h2 class="content__title">Все пиццы</h2>
          <div class="content__items">
            {/*  */}
            <PizzaCard />
            <PizzaCard />
            <PizzaCard />
            {/*  */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
