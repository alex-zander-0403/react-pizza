import React, { useEffect, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import qs from "qs";
//
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../../redux/slices/filterSlice";
//
import Categories from "../ui/Categories";
import Sort, { sortList } from "../ui/Sort";
import PizzaCard from "../ui/PizzaCard";
import PizzaCardSkeleton from "../ui/PizzaCardSkeleton";
import Search from "../ui/Search/Search";
import Pagination from "../Pagination/Pagination";
import { Link, useNavigate } from "react-router-dom";
import { fetchPizzas } from "../../redux/slices/pizzaSlice";

//
//
export default function Home() {
  //
  const { items, status } = useSelector((state) => state.pizzaSlice);

  const isMounted = useRef(false); // первый рендер еще не выполнен
  const isSearch = useRef(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // --------------------------------------

  // const categoryId = useSelector((state) => state.filterSlice.categoryId);
  // const sortType = useSelector((state) => state.filterSlice.sort.sortProperty);
  const { categoryId, sort, currentPage, searchValue } = useSelector(
    (state) => state.filterSlice
  );

  //
  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (num) => {
    dispatch(setCurrentPage(num));
  };

  //
  const getPizzas = async () => {
    // setIsLoading(true);

    const category = categoryId > 0 ? `&category=${categoryId}` : "";
    const sortBy = sort.sortProperty.replace("-", ""); //
    const order = sort.sortProperty.includes("-") ? "desc" : "asc"; //
    const search = searchValue ? `&search=${searchValue}` : "";

    try {
      dispatch(fetchPizzas({ category, sortBy, order, search, currentPage }));
    } catch (error) {
      console.error("Ошибка при запросе данных:", error);
    }

    window.scrollTo(0, 0);
  };

  //
  // 1 - Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true; // первый рендер = true
  }, [categoryId, sort.sortProperty, currentPage]);

  //
  // 2 - Если был первый рендер, то проверяем URl-параметры и сохраняем в редуксе
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  //
  // 3 - Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    // if (!isSearch.current) {
    getPizzas();
    // }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  //
  const pizzas = items
    .filter((el) => {
      if (el.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((el) => (
      <Link to={`/pizza/${el.id}`} key={el.id}>
        <PizzaCard el={el} />
      </Link>
    ));

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
            onChangeCategory={onChangeCategory}
          />
          {/* ----- */}
          <Sort />
          {/* ----- */}
        </div>
        <div className="content__header">
          <h2 className="content__title">Все пиццы</h2>
          <Search />
        </div>

        {status === "error" ? (
          <div className="content__error-info">
            <h2>Что то пошло не так 😐</h2>
            <p>Мож ошибка? Глянь консоль..</p>
          </div>
        ) : (
          <div className="content__items">
            {status === "loading" ? skeletons : pizzas}
          </div>
        )}

        <Pagination onChangePage={onChangePage} />
      </div>
    </>
  );
}
