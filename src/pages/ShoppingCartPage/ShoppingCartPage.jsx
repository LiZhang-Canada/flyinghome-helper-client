import { useState, useEffect } from "react";
import axios from "axios";
import "./ShoppingCartPage.scss";
import add from "../../assets/images/add.svg";
import minus from "../../assets/images/minus.svg";
import { Link } from "react-router-dom";

function ShoppingCartPage() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shoppingCart, setShoppingCart] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const baseUrl = "http://localhost:8080";
      try {
        const response = await axios.get(`${baseUrl}/api/healthsupplements`);
        setIsLoading(false);
        setItems(response.data);
      } catch (error) {
        setIsLoading(false);
        console.error(`"error: " ${error}`);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const data = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key !== "token") {
        let newKey = Number(key.split("_")[0]);
        const value = sessionStorage.getItem(key);
        const matchingItem = items.find((item) => item.id === newKey);
        const img = matchingItem
          ? matchingItem.img
          : "No matching healthsupplement";
        data.push({ newKey, value, img });
      }
    }
    setShoppingCart(data);
  }, [items]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="shopping-cart-wrapper">
      <div className="shopping-cart-wrapper__title">
        <p>Image</p>
        <p>Quantity</p>
        <p>Actions</p>
      </div>
      <ul className="shopping-cart-wrapper__list">
        {shoppingCart.map(({ newKey, value, img }, index) => (
          <li key={index} className="shopping-cart-wrapper__item">
            <Link to={`/healthsupplements/${newKey}`}>
              <img
                src={img}
                alt={newKey}
                className="shopping-cart-wrapper__img"
              />
            </Link>
            <p>{value}</p>
            <div className="shopping-cart-wrapper__actions">
              <img
                src={minus}
                alt="minus"
                className="shopping-cart-wrapper__icon"
              />
              <input
                type="text"
                className="shopping-cart-wrapper__input"
                placeholder={value}
                name="quantity"
              />
              <img
                src={add}
                alt="add"
                className="shopping-cart-wrapper__icon"
              />
            </div>
          </li>
        ))}
      </ul>
      <div>
      <strong>From </strong><input type="text" name="relation_email" placeholder="please input your email"></input>
      <p><strong>Send to</strong> <input type="text" name="user_email" placeholder="please input the email you want to send the order list to" />to Buy</p> 
      <button
            className="shopping-cart-wrapper__cancel secondary-button "
            onClick={() => {
            //   onCancel(); //close modal
            }}
          >
            Cancel
          </button>
          <button
            className="confirm-button shopping-cart-wrapper__confirm"
            // onClick={handleDelete}
          >
            Confirm
          </button>
      </div>
    </main>
  );
}

export default ShoppingCartPage;
