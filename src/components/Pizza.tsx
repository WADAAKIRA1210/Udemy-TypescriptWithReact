import React from "react";
import PizzaCSS from "./Pizza.module.css";
import { useSetState } from "./AppState";

interface Pizza {
  id: number;
  name: string;
  description: string;
  price: number;
}
interface Prop {
  pizza: Pizza;
}

const Pizza: React.FC<Prop> = ({ pizza }) => {
  const setState = useSetState();
  const handleAddToCartClick = () => {
    setState((state) => {
      const itemExits = state.cart.items.find((item) => item.id === pizza.id);
      return {
        ...state,
        cart: {
          ...state.cart,
          items: itemExits
            ? state.cart.items.map((item) => {
                if (item.id === pizza.id) {
                  return { ...item, quantity: item.quantity + 1 };
                }
                return item;
              })
            : [
                ...state.cart.items,
                {
                  id: pizza.id,
                  name: pizza.name,
                  price: pizza.price,
                  quantity: 1,
                },
              ],
        },
      };
    });
  };
  return (
    <ul className={PizzaCSS.container}>
      <h2>{pizza.name}</h2>
      <p>{pizza.description}</p>
      <p>{pizza.price}</p>
      <button type="button" onClick={handleAddToCartClick}>
        Add to Cart
      </button>
    </ul>
  );
};

export default Pizza;
