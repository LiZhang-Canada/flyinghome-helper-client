import { useState, useEffect } from "react";
import axios from "axios";
import "./ShoppingCartPage.scss";
import add from "../../assets/images/add.svg";
import minus from "../../assets/images/minus.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ShoppingCartPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  //   const [value, setValue] = useState(0);

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

  function handleConfirm(event) {
    event.preventDefault();
    // console.log(event.target);

    // Validation
    if (
      !event.target.user_email.value.trim() ||
      !event.target.relation_email.value.trim()
    ) {
      setErrorMessage("All fields are required");
      return;
    }

    const postData = {
      relationship_email: event.target.relation_email.value, // String
      user_email: event.target.user_email.value, // String
      order_list: shoppingCart,
    };

    // console.log(postData);

    axios
      .post("http://localhost:8080/api/shoppinglist", postData)
      .then((response) => {
        setErrorMessage("Order List added successfully");
        console.log("Response:", response.data);
        //remove all the item keys
        const keysToRemove = [];
        for (let i = 0; i < sessionStorage.length; i++) {
          const key = sessionStorage.key(i);
          if (key !== "token") {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach((key) => {
          sessionStorage.removeItem(key);
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error:", error.response.data);
        setErrorMessage(error.response.data);
      });
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <form className="shopping-cart-wrapper" onSubmit={handleConfirm}>
      <div className="shopping-cart-wrapper__title">
        <p className="shopping-cart-wrapper__imgwrapper">Image</p>
        <span className="shopping-cart-wrapper__quantitywrapper">Quantity</span>
        {/* <p>Actions</p> */}
      </div>
      <ul className="shopping-cart-wrapper__list">
        {shoppingCart.map(({ newKey, value, img }, index) => (
          <li key={index} className="shopping-cart-wrapper__item">
            <div>
            <Link to={`/healthsupplements/${newKey}`}>
              <img
                src={img}
                alt={newKey}
                className="shopping-cart-wrapper__img"
              />
            </Link>
            </div>
            <span className="shopping-cart-wrapper__quantitywrapper">{value}</span>
          </li>
        ))}
      </ul>
      <div>
        <strong>From </strong>
        <input
          type="email"
          name="relation_email"
          placeholder="please input your email"
        ></input>
        <p>
          <strong>Send to Buy</strong>{" "}
          <input
            type="email"
            name="user_email"
            placeholder="please input email you want to send to"
          />
        </p>
        <button
          className="secondary-button shopping-cart-wrapper__cancel "
          onClick={() => {
            navigate("/");
          }}
        >
          Cancel
        </button>
        <button className="confirm-button shopping-cart-wrapper__confirm">
          Confirm
        </button>
      </div>
      <p className="error-message">{errorMessage}</p>
    </form>
  );
}

export default ShoppingCartPage;
