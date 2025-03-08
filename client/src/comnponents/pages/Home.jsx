import React, { useContext, useEffect, useState } from "react";
//
import Categories from "../ui/Categories";
import Sort from "../ui/Sort";
import PizzaCard from "../ui/PizzaCard";
import PizzaCardSkeleton from "../ui/PizzaCardSkeleton";
import Search from "../ui/Search/Search";
import Pagination from "../Pagination/Pagination";
import { SearchContext } from "../../App";

//
//
export default function Home() {
  //
  const { searchValue, setSearchValue } = useContext(SearchContext);
  //
  const [isLoading, setIsLoading] = useState(true);
  const [pizzasArr, setPizzasArr] = useState([]); // main массив пицц

  // выбранная категория по id
  const [categoryId, setCategoryId] = useState(0);

  // текущая страница
  const [currentPage, setCurrentPage] = useState(1);

  // тип сортировки
  const [sortType, setSortType] = useState({
    name: "популярности (убывание)",
    sortProperty: "-rating",
  });

  //
  useEffect(() => {
    setIsLoading(true);
    //
    const category = categoryId ? `category=${categoryId}` : "";
    const sortBy = sortType.sortProperty.replace("-", "");
    const order = sortType.sortProperty.includes("-") ? "desc" : "asc";
    const search = searchValue ? `&search=${searchValue}` : "";

    //
    fetch(
      `https://67c6fc1ec19eb8753e78293c.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => res.json())
      .then((json) => {
        setPizzasArr(json);
        setIsLoading(false);
      });
    window.scroll(0, 0); // скролл в начало
  }, [categoryId, sortType, searchValue, currentPage]);

  //
  const pizzas = pizzasArr
    .filter((el) => {
      if (el.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((el) => <PizzaCard key={el.id} el={el} />);

  //
  const skeletons = [...new Array(9)].map((el, i) => (
    <PizzaCardSkeleton key={i} />
  ));

  // console.log(currentPage);

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
        <div className="content__header">
          <h2 className="content__title">Все пиццы</h2>
          <Search searchValue={searchValue} setSearchValue={setSearchValue} />
        </div>
        <div className="content__items">
          {/*  */}
          {isLoading ? skeletons : pizzas}
          {/*  */}
        </div>
        <Pagination onChangePage={(num) => setCurrentPage(num)} />
      </div>
    </>
  );
}
