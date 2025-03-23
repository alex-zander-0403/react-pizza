import React, { JSX, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

//
function FullPizza(): JSX.Element {
  //
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
    rating: number;
  }>();

  const { id } = useParams();
  const navigate = useNavigate();

  //
  useEffect(() => {
    //
    async function getFullPizza() {
      try {
        const res = await axios.get(
          "https://67c6fc1ec19eb8753e78293c.mockapi.io/items/" + id
        );
        setPizza(res.data);
      } catch (error) {
        console.log(`Ошибка получения информации о пицце ${id}`, error);
        navigate("/");
      }
    }
    //
    getFullPizza();
    //
  }, [id]);

  //
  if (!pizza) {
    return <div>Загрузка...</div>;
  }

  //
  return (
    <>
      <div className="container">
        <img src={pizza.imageUrl} alt="pizza" />
        <h1>{pizza.title}</h1>
        <h2>Цена: {pizza.price} руб</h2>
        <p>Рейтинг: {pizza.rating}</p>
      </div>
    </>
  );
}

export default FullPizza;
