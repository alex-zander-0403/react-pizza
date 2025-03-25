import React, { JSX } from "react";

//
type CategoriesPropsType = {
  categoryId: number;
  onChangeCategory: (arg: number) => void;
};

//
function Categories({ categoryId, onChangeCategory }: CategoriesPropsType): JSX.Element {
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

export default Categories;
