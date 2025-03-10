import React from "react";

export default function Categories({ categoryId, onChangeCategory }) {
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
            onClick={() => onChangeCategory(i)}
          >
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
}
