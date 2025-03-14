import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../App";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
//
import { setCategoryId, setCurrentPage } from "../../redux/slices/filterSlice";
//
import Categories from "../ui/Categories";
import Sort from "../ui/Sort";
import PizzaCard from "../ui/PizzaCard";
import PizzaCardSkeleton from "../ui/PizzaCardSkeleton";
import Search from "../ui/Search/Search";
import Pagination from "../Pagination/Pagination";

//
//
export default function Home() {
  //
  const { searchValue } = useContext(SearchContext);
  //
  const [pizzasArr, setPizzasArr] = useState([]); // main массив пицц
  const [isLoading, setIsLoading] = useState(true); // загрузка?
  // const [currentPage, setCurrentPage] = useState(1); // страница

  // --------------------------------------

  // const categoryId = useSelector((state) => state.filterSlice.categoryId);
  // const sortType = useSelector((state) => state.filterSlice.sort.sortProperty);
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filterSlice
  );

  //
  const dispatch = useDispatch();

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (num) => {
    dispatch(setCurrentPage(num));
  };

  //
  useEffect(() => {
    setIsLoading(true);
    //
    const category = categoryId > 0 ? `&category=${categoryId}` : "";
    const sortBy = sort.sortProperty.replace("-", ""); //
    const order = sort.sortProperty.includes("-") ? "desc" : "asc"; //
    const search = searchValue ? `&search=${searchValue}` : "";

    axios
      .get(
        `https://67c6fc1ec19eb8753e78293c.mockapi.io/items?page=${currentPage}&limit=8&sortBy=${sortBy}&order=${order}${category}${search}`
      )
      .then((res) => {
        setPizzasArr(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка при запросе данных:", error);
        setIsLoading(false);
      });

    window.scroll(0, 0); // скролл в начало
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  // console.log(categoryId, sort.sortProperty, searchValue, currentPage);

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

  //
  return (
    <>
      <div className="container">
        <div className="content__top">
          {/* ----- */}
          <Categories
            categoryId={categoryId}
            // onChangeCategory={(i) => setCategoryId(i)}
            onChangeCategory={onChangeCategory}
          />
          {/* ----- */}
          {/* <Sort value={sortType} onClickType={(i) => setSortType(i)} /> */}
          <Sort />
          {/* ----- */}
        </div>
        <div className="content__header">
          <h2 className="content__title">Все пиццы</h2>
          <Search />
        </div>
        <div className="content__items">
          {/*  */}
          {isLoading ? skeletons : pizzas}
          {/*  */}
        </div>
        <Pagination onChangePage={onChangePage} />
      </div>
    </>
  );
}
