import React, { useState } from "react";

export default function Categories() {
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
  const [activeCategory, setActiveCategory] = useState(0);

  //
  function setCategory(index) {
    setActiveCategory(index);
  }

  //
  return (
    <div className="categories">
      <ul>
        {categories.map((el, i) => (
          <li
            className={activeCategory === i ? "active" : ""}
            key={i}
            onClick={() => setCategory(i)}
          >
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
}
