import React, { useCallback, useRef, useState } from "react";
import debounce from "lodash.debounce";
//
import styles from "./Search.module.scss";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../../redux/slices/filterSlice";

//
export default function Search() {
  //
  const dispatch = useDispatch();
  const inputRef = useRef();

  const [localValue, setLocalValue] = useState("");


  // при изменении input меняем значение локально
  const onChangeInput = (event) => {
    const searchStr = event.target.value;
    setLocalValue(searchStr);
    updateSearchValue(searchStr);
  };

  // localValue передаем в main searchValue
  const updateSearchValue = useCallback(
    debounce((searchStr) => {
      dispatch(setSearchValue(searchStr));
    }, 1000),
    []
  );

  // очистка поиска
  const onClickClear = () => {
    setSearchValue("");
    setLocalValue("");
    inputRef.current.focus();
  };

  //
  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        fill="none"
        height="24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" x2="16.65" y1="21" y2="16.65" />
      </svg>
      <input
        ref={inputRef}
        className={styles.input}
        value={localValue}
        // onChange={(event) => setSearchValue(event.target.value)}
        onChange={onChangeInput}
        placeholder="поиск"
      />
      {localValue && (
        <div className={styles.clear} onClick={onClickClear}>
          <svg
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="18" x2="6" y1="6" y2="18" />
            <line x1="6" x2="18" y1="6" y2="18" />
          </svg>
        </div>
      )}
    </div>
  );
}

//
// export default Search;
