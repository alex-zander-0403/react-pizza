import React, { JSX, memo } from "react";
import { useWhyDidYouUpdate } from "ahooks";

//
type CategoriesPropsType = {
  categoryId: number;
  onChangeCategory: (arg: number) => void;
};

const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

//
const Categories = memo(({ categoryId, onChangeCategory }: CategoriesPropsType): JSX.Element => {
  useWhyDidYouUpdate("Categories", { categoryId, onChangeCategory });

  return (
    <div className="categories">
      <ul>
        {categories.map((el, i) => (
          <li className={categoryId === i ? "active" : ""} key={i} onClick={() => onChangeCategory(i)}>
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
