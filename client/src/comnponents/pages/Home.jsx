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
  //
  // выбранная категория по id
  const [categoryId, setCategoryId] = useState(0);
  // тип сортировки
  const [sortType, setSortType] = useState({
    name: "популярности (убывание)",
    sortProperty: "-rating",
  });

  console.log("----->", categoryId, sortType);

  //
  // получение main массив пицц
  // function getAllItems() {}

  // сортировка по категории
  // https://67c6fc1ec19eb8753e78293c.mockapi.io/items?sortBy=category&order=asc

  // поиск
  // https://67c6fc1ec19eb8753e78293c.mockapi.io/items?search=Пепперони

  //
  useEffect(() => {
    setIsLoading(true);
    //
    const category = categoryId ? `category=${categoryId}` : "";
    const sortBy = sortType.sortProperty.replace("-", "");
    const order = sortType.sortProperty.includes("-") ? "desc" : "asc";
    //
    fetch(
      `https://67c6fc1ec19eb8753e78293c.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`
    )
      .then((res) => res.json())
      .then((json) => {
        setPizzasArr(json);
        setIsLoading(false);
      });
    window.scroll(0, 0); // скролл в начало
  }, [categoryId, sortType]);

  //
  return (
    <>
      <div className="container">
        <div className="content__top">
          {/* ----- */}
          <Categories
            categoryId={categoryId}
            onClickCategory={(i) => setCategoryId(i)}
          />
          {/* ----- */}
          <Sort value={sortType} onClickType={(i) => setSortType(i)} />
          {/* ----- */}
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
