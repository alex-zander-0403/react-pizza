import React, { useEffect, useState } from "react";
//
import Header from "./comnponents/ui/Header";
import Categories from "./comnponents/ui/Categories";
import Sort from "./comnponents/ui/Sort";
import PizzaCard from "./comnponents/ui/PizzaCard";
// import pizzasArr from "./assets/pizzasArray.json";
//
import "./scss/app.scss";

//
function App() {
  //
  const [pizzasArr, setPizzasArr] = useState([]); // main массив пицц

  //
  useEffect(() => {
    fetch("https://67c6fc1ec19eb8753e78293c.mockapi.io/items")
      .then((res) => res.json())
      .then((json) => {
        setPizzasArr(json);
      });
  }, []);

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
            <Categories />
            {/*  */}
            <Sort />
            {/*  */}
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {/*  */}
            {pizzasArr.map((el) => (
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
