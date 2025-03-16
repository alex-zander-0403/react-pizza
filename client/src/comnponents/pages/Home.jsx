import React, { useContext, useEffect, useRef, useState } from "react";
import { SearchContext } from "../../App";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
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
import { useNavigate } from "react-router-dom";

//
//
export default function Home() {
  //
  const [pizzasArr, setPizzasArr] = useState([]); // main массив пицц
  const [isLoading, setIsLoading] = useState(true); // загрузка?
  // const [currentPage, setCurrentPage] = useState(1); // страница

  const { searchValue } = useContext(SearchContext);
  const isMounted = useRef(false); // первый рендер еще не выполнен
  const isSearch = useRef(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // --------------------------------------

  // const categoryId = useSelector((state) => state.filterSlice.categoryId);
  // const sortType = useSelector((state) => state.filterSlice.sort.sortProperty);
  const { categoryId, sort, currentPage } = useSelector(
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
  const fetchPizzas = () => {
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
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

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
