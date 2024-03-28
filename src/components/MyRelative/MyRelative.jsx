import { useState,useEffect } from "react";
import axios from "axios";
import './MyRelative.scss'

function MyRelative(){
    const [relatives, setRelatives] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchRelatives = async () => {
          const baseUrl = "http://localhost:8080";
          try {
            const response = await axios.get(`${baseUrl}/api/relatives`);
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
                        <li className="myrelative__item">
                            <p className="myrelative__email">EMAIL</p>
                            <p>Relationship</p>
                        </li>
                     {relatives.map((item) => (
                        <li key={item.id} className="myrelative__item">
                            <p className="myrelative__email">{item.email}</p>
                            <p>{item.relationship}</p>
                        </li>
                     ))}
                    </ul>
                );
    
}

export default MyRelative;