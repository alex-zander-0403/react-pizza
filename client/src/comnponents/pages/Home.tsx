import React, { JSX, useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import qs from "qs";
//
import { setCategoryId, setCurrentPage, setFilters } from "../../redux/filter/filterSlice";
import { useAppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
//
import Categories from "../ui/Categories";
import Sort, { sortList } from "../ui/Sort";
import PizzaCard from "../ui/PizzaCard";
import PizzaCardSkeleton from "../ui/PizzaCardSkeleton";
import Search from "../ui/Search/Search";
import Pagination from "../Pagination/Pagination";
import { selectPizza } from "../../redux/pizza/pizzaSelectors";
import { searchPizzasParams } from "../../redux/pizza/pizzaTypes";
import { selectFilter } from "../../redux/filter/filterSelectors";
import { fetchPizzas } from "../../redux/pizza/asyncActions";

//
//
function Home(): JSX.Element {
  //
  const { items, status } = useSelector(selectPizza);

  const isMounted = useRef(false); // первый рендер еще не выполнен
  const isSearch = useRef(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // --------------------------------------

  // const categoryId = useSelector((state) => state.filterSlice.categoryId);
  // const sortType = useSelector((state) => state.filterSlice.sort.sortProperty);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

  //

  const onChangeCategory = useCallback((index: number) => {
    dispatch(setCategoryId(index));
  }, []);

  const onChangePage = (num: number) => {
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
      dispatch(
        fetchPizzas({
          category,
          sortBy,
          order,
          search,
          currentPage: String(currentPage),
        })
      );
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
  // 2 - Если был первый рендер, то проверяем URl-параметры и сохраняем в редаксе
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as searchPizzasParams;
      const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || sortList[0],
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
    .filter((el: any) => {
      if (el.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((el: any) => <PizzaCard {...el} key={el.id} />);

  //
  const skeletons = [...new Array(9)].map((el, i) => <PizzaCardSkeleton key={i} />);

  //
  return (
    <>
      <div className="container">
        <div className="content__top">
          {/* ----- */}
          <Categories categoryId={categoryId} onChangeCategory={onChangeCategory} />
          {/* ----- */}
          <Sort sort={sort} />
          {/* ----- */}
        </div>
        <div className="content__header">
          <h2 className="content__title">Все пиццы</h2>
          <Search />
        </div>

        {status === "error" ? (
          <div className="content__error-info">
            <h2>Что-то пошло не так 😐</h2>
            <p>Мож ошибка? Глянь консоль..</p>
          </div>
        ) : (
          <div className="content__items">{status === "loading" ? skeletons : pizzas}</div>
        )}

        <Pagination onChangePage={onChangePage} />
      </div>
    </>
  );
}

export default Home;
