import React from "react";
//
import Header from "./comnponents/ui/Header";
import Categories from "./comnponents/ui/Categories";
import Sort from "./comnponents/ui/Sort";
import PizzaCard from "./comnponents/ui/PizzaCard";
import pizzasArray from "./assets/pizzasArray.json";
//
import "./scss/app.scss";

//
function App() {
  //
  // console.log(pizzasArray);

  //
  return (
    <div className="wrapper">
      {/*  */}
      <Header />
      {/*  */}
      <div className="content">
        <div className="container">
          <div className="content__top">
            {/*  */}
            {/* <Categories /> */}
            {/*  */}
            <Sort />
            {/*  */}
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {/*  */}
            {pizzasArray.map((el) => (
              <PizzaCard key={el.id} el={el} />
            ))}
            {/*  */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
