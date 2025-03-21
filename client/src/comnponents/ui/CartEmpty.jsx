import React from "react";
import cartEmptyImg from "../../assets/img/empty-cart.png";
import { Link } from "react-router-dom";

export default function CartEmpty() {
  return (
    <div className="cart cart--empty">
      <h2>
        Корзина пустая <icon>😕</icon>
      </h2>
      <p>Для того, чтобы заказать пиццу, перейди на главную страницу.</p>
      <img src={cartEmptyImg} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
}
