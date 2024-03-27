import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import add from '../../assets/images/add.svg';
import minus from '../../assets/images/minus.svg';
import './HealthSupplementDetailPage.scss'

function HealthSupplementDetailPage() {
  const params = useParams();
  const [activeHealthSupplement, setActiveHealthSupplement] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] =useState(0);
  const baseUrl = "http://localhost:8080";

  useEffect(() => {
    const fetchDetailbyId = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/healthsupplements/${Number(params.id)}`
        );
        document.title = `${response.data.item_name} | Flyinghome Helper`;
        setIsLoading(false);
        setActiveHealthSupplement(response.data);
      } catch (error) {
        setIsLoading(false);
        console.error(`error:  ${error}`);
      }
    };
    fetchDetailbyId();
  }, [params.id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  function handleAdd(){
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
  }
  function handleMinus(){
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
  }

  function handleSubmit(){
    console.log(typeof(`${params.id}_quantity`));
    sessionStorage.setItem(`${params.id}_quantity`,quantity);
  }

  const {
    item_name,
    img: image,
    function_description,
    daily_usage,
    function_in_Chinese,
    usage_in_Chinese,
  } = activeHealthSupplement;

  return (
    <div>
      <img src={image} alt={item_name}></img>
      <div className="add-cart-wrapper">
        <div className="add-cart-wrapper__quantity">
          <img src={minus} alt="minus" className="add-cart-wrapper__icon" onClick={handleMinus}/>
          <input type="text" className="add-cart-wrapper__input" placeholder={quantity} name="quantity"/>
          <img src={add} alt="add" className="add-cart-wrapper__icon" onClick={handleAdd}/>
        </div>
        <button className="add-cart-wrapper__button" onClick={handleSubmit}>Add to Cart</button>
      </div>
      <h2>function:</h2>
      <p>{function_description}</p>
      <h2>daily usage:</h2>
      <p>{daily_usage}</p>
      <h2>功能：</h2>
      <p>{function_in_Chinese}</p>
      <h2>用法用量：</h2>
      <p>{usage_in_Chinese}</p>
    </div>
  );
}

export default HealthSupplementDetailPage;
