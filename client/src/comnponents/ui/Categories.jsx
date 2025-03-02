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
        {/* <li onClick={() => setCategory(0)} className={activeCategory === 0 ? "active" : ""}>Все</li> */}
        {categories.map((el, i) => (
          <li
            onClick={() => setCategory(i)}
            className={activeCategory === i ? "active" : ""}
          >
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
}
