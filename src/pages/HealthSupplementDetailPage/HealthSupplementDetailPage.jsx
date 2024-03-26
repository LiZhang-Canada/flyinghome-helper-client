import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function HealthSupplementDetailPage(){
    const params = useParams();
    const [activeHealthSupplement, setActiveHealthSupplement] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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
        <img src={image}></img>
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