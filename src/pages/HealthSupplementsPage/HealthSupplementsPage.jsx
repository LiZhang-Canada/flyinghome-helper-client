import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './HealthSupplementsPage.scss';

function HealthSupplementsPage(){
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      const fetchItems = async () => {
        const baseUrl = "http://localhost:8080";
        try{
        const response = await axios.get(`${baseUrl}/api/healthsupplements`);
        setIsLoading(false);
        setItems(response.data);
    }catch(error){
        setIsLoading(false);
        console.error(`"error: " ${error}`);
    }
      };
      fetchItems();
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
      }

    return (
        <main className="items-list-wrapper">
        <ul className="items-list">
        {items.map((item) => (
          
          <li key={item.id} className="items-list__item">
            <div className="items-list__card">
            <Link to={`/healthsupplements/${item.id}`}>
                <img src={item.img} alt={item.item_name} className="items-list__img"/>
            </Link>
            </div>
          </li>
          
        ))}
      </ul>
      </main>
    );
}

export default HealthSupplementsPage;