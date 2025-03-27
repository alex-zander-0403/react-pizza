import React, { JSX, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  CartItemType,
  selectCartItemById,
} from "../../redux/slices/cartSlice";
import { Link } from "react-router-dom";

//
type PizzaCardPropsType = {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

//
const typeNames = ["тонкое", "традиционное"];

//
function PizzaCard({
  id,
  imageUrl,
  title,
  types,
  sizes,
  price,
  category,
  rating,
}: PizzaCardPropsType): JSX.Element {
  //
  const [activeSize, setActiveSize] = useState<number>(0);
  const [activeType, setActiveType] = useState<number>(0);

  //
  const dispatch = useDispatch();

  // находим item в с который el.id
  const cartItem = useSelector(selectCartItemById(id));
  // проверка cartItem
  const addedItem = cartItem ? cartItem.count : 0;

  //
  const onClickAdd = () => {
    const item: CartItemType = {
      id,
      title,
      imageUrl,
      price,
      type: typeNames[activeType],
      size: sizes[activeSize],
      count: 0, // опционально
    };
    dispatch(addItem(item));
  };

  //
  return (
    <div className="pizza-card-wrapper">
      <div className="pizza-card">
        <Link to={`/pizza/${id}`} key={id}>
          <img className="pizza-card__image" src={imageUrl} alt="Pizza" />
        </Link>
        <h4 className="pizza-card__title">{title}</h4>
        <div className="pizza-card__selector">
          {/*  */}
          <ul>
            {types.map((type, i) => (
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
            {sizes.map((size, i) => (
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
          <div className="pizza-card__price">от {price} ₽</div>
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

export default PizzaCard;
