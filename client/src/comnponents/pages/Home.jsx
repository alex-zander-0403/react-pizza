import React, { useEffect, useState } from "react";
//
import Categories from "../ui/Categories";
import Sort from "../ui/Sort";
import PizzaCard from "../ui/PizzaCard";
import PizzaCardSkeleton from "../ui/PizzaCardSkeleton";

//
export default function Home() {
  //
  const [isLoading, setIsLoading] = useState(true);
  const [pizzasArr, setPizzasArr] = useState([]); // main массив пицц

  // получение main массив пицц
  function getAllItems() {
    fetch("https://67c6fc1ec19eb8753e78293c.mockapi.io/items")
      .then((res) => res.json())
      .then((json) => {
        setPizzasArr(json);
        setIsLoading(false);
        // setTimeout(() => {
        //   setIsLoading(false);
        // }, 500);
      });
  }

  //
  useEffect(() => {
    getAllItems();
    window.scroll(0, 0); // скролл в начало
  }, []);

  //
  return (
    <>
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
          {isLoading
            ? [...new Array(9)].map((el, i) => <PizzaCardSkeleton key={i} />)
            : pizzasArr.map((el) => <PizzaCard key={el.id} el={el} />)}
          {/*  */}
        </div>
      </div>
    </>
  );
}
