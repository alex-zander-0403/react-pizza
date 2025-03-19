import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, selectCartItemById } from "../../redux/slices/cartSlice";

//
const typeNames = ["тонкое", "традиционное"];

//
export default function PizzaCard({ el }) {
  //
  // const [pizzaCount, setPizzaCount] = useState(0); // состояние количества пицц
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  //
  const dispatch = useDispatch();

  // находим item в с который el.id
  const cartItem = useSelector(
    selectCartItemById(el)
  );
  // проверка cartItem
  const addedItem = cartItem ? cartItem.count : 0;

  //
  const onClickAdd = () => {
    // const item = { ...el, type: activeType, size: activeSize };
    const item = {
      id: el.id,
      title: el.title,
      imageUrl: el.imageUrl,
      price: el.price,
      type: typeNames[activeType],
      size: el.sizes[activeSize],
    };
    dispatch(addItem(item));
  };

  //
  return (
    <div className="pizza-card-wrapper">
      <div className="pizza-card">
        <img className="pizza-card__image" src={el.imageUrl} alt="Pizza" />
        <h4 className="pizza-card__title">{el.title}</h4>
        <div className="pizza-card__selector">
          {/*  */}
          <ul>
            {el.types.map((type, i) => (
              <li
                className={activeType === i ? "active" : ""}
                key={i}
                onClick={() => setActiveType(i)}
              >
                {typeNames[type]}
              </li>
            ))}
          </ul>
          {/*  */}
          <ul>
            {el.sizes.map((size, i) => (
              <li
                className={activeSize === i ? "active" : ""}
                key={i}
                onClick={() => setActiveSize(i)}
              >
                {size} см
              </li>
            ))}
          </ul>
          {/*  */}
        </div>
        <div className="pizza-card__bottom">
          <div className="pizza-card__price">от {el.price} ₽</div>
          <button
            onClick={onClickAdd}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedItem > 0 && <i>{addedItem}</i>}
          </button>
        </div>
      </div>
    </div>
  );
}
