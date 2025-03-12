import React, { useContext, useRef } from "react";
import { SearchContext } from "../../../App";
//
import styles from "./Search.module.scss";

//
//
export default function Search() {
  //
  const { searchValue, setSearchValue } = useContext(SearchContext);

  const inputRef = useRef();

  const onClickClear = () => {
    setSearchValue("");
    inputRef.current.focus();
  };

  //
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
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        placeholder="поиск"
      />
      {searchValue && (
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
