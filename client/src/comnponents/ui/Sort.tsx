import React, { JSX, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSort, setSort, SortType } from "../../redux/slices/filterSlice";

// ---------------------------------------------------------------------

// заменен на SortType из filterSlice
// type SortItemType = {
//   name: string;
//   sortProperty: "rating" | "title" | "price" | "-rating" | "-title" | "-price";
// };

//
export const sortList: SortType[] = [
  { name: "популярности (убывание)", sortProperty: "-rating" },
  { name: "популярности (возрастание)", sortProperty: "rating" },
  { name: "цене (убывание)", sortProperty: "-price" },
  { name: "цене (возрастание)", sortProperty: "price" },
  { name: "алфавиту (убывание)", sortProperty: "-title" },
  { name: "алфавиту (возрастание)", sortProperty: "title" },
]; // список элементов списка сортировки

// ---------------------------------------------------------------------
//
export default function Sort(): JSX.Element {
  //
  const dispatch = useDispatch();

  // const sort = useSelector((state) => state.filterSlice.sort);
  const sort = useSelector(selectSort);
  const [openSort, setOpenSort] = useState(false); // popup меню вкл/выкл
  const sortRef = useRef<HTMLDivElement>(null);

  // const chosenType = sortList[sortType].name; // актуальная сортировка

  // функция по клику на элемент списка
  const onClickListElement = (obj: SortType) => {
    dispatch(setSort(obj));
    setOpenSort(false);
  };

  //
  useEffect(() => {
    // закрыть popup окно по клику мимо
    const onClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpenSort(false);
      }
    };
    // mount onClickOutside
    document.body.addEventListener("click", onClickOutside);
    // unmount onClickOutside
    return () => document.body.removeEventListener("click", onClickOutside);
  }, []);


  //
  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpenSort(!openSort)}>{sort.name}</span>
      </div>
      {openSort && (
        <div className="sort__popup">
          <ul>
            {/* ============== */}
            {sortList.map((obj, i) => (
              <li
                className={
                  sort.sortProperty === obj.sortProperty ? "active" : "" /*  */
                }
                key={i}
                onClick={() => onClickListElement(obj)}
              >
                {obj.name}
              </li>
            ))}
            {/* ============== */}
          </ul>
        </div>
      )}
    </div>
  );
}
