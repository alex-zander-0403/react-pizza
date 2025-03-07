import React from "react";

export default function Categories({ categoryId, onClickCategory }) {
  //
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  //
  return (
    <div className="categories">
      <ul>
        {categories.map((el, i) => (
          <li
            className={categoryId === i ? "active" : ""}
            key={i}
            onClick={() => onClickCategory(i)}
          >
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
}
