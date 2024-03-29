import { useState,useEffect } from "react";
import axios from "axios";
import './MyRelative.scss'

function MyRelative({id}){
    const [relatives, setRelatives] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchRelatives = async () => {
          const baseUrl = "http://localhost:8080";
          try {
            const response = await axios.get(`${baseUrl}/api/relatives/${id}`);
            setIsLoading(false);
            setRelatives(response.data);
          } catch (error) {
            setIsLoading(false);
            console.error(`"error: " ${error.response.data}`);
          }
        };
        fetchRelatives();
      }, []);

      if (isLoading) {
        return <p>Loading...</p>;
      }

                return (
                    <ul className="myrelative">
                        <li className="myrelative__item myrelative__title">
                            <p className="myrelative__column ">EMAIL</p>
                            <p className="myrelative__column">Relationship</p>
                        </li>
                     {relatives.map((item) => (
                        <li key={item.id} className="myrelative__item">
                            <p className="myrelative__column myrelative__column--long">{item.email}</p>
                            <p className="myrelative__column">{item.relationship}</p>
                        </li>
                     ))}
                    </ul>
                );
    
}

export default MyRelative;