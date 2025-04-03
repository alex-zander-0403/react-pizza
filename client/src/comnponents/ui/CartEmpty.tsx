import React, { JSX } from "react";
import { Link } from "react-router-dom";
//
import cartEmptyImg from "../../assets/img/empty-cart.png";

//
//
function CartEmpty(): JSX.Element {
  //
  return (
    <div className="cart cart--empty">
      <h2>
        Корзина пустая <span>😕</span>
      </h2>
      <p>Для того, чтобы заказать пиццу, перейди на главную страницу.</p>
      <img src={cartEmptyImg} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
}

export default CartEmpty;
