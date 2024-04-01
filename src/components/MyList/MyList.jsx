import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./MyList.scss";

function MyList({ id }) {
  const [dataByRelativeId, setDataByRelativeId] = useState({});
  const [sumByItemName, setSumByItemName] = useState({});
  const [checkedItems, setCheckedItems] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Organize data by relationship_id
  function organizeDataByRelativeId(data) {
    return data.reduce((acc, item) => {
      const { relationship } = item;
      if (!acc[relationship]) {
        acc[relationship] = [];
      }
      acc[relationship].push(item);
      return acc;
    }, {});
  }

  // Sum quantities by item_name
  function sumQuantitiesByItemName(data) {
    return data.reduce((acc, item) => {
      const { item_name, quantity } = item;
      if (!acc[item_name]) {
        acc[item_name] = { quantity: 0, img: item.img ,item_id: item.item_id }; ;
      }
      acc[item_name].quantity += quantity;
      return acc;
    }, {});
  }

    // Handle checkbox change
    const handleCheckboxChange = (itemName) => {
        setCheckedItems(prev => ({
          ...prev,
          [itemName]: !prev[itemName],
        }));
      };

  useEffect(() => {
    document.title = "My List| Flyinghome Helper";
    const fetchLists = async () => {
      const baseUrl = "http://localhost:8080";
      try {
        const response = await axios.get(`${baseUrl}/api/shoppinglist/${id}`);
        setIsLoading(false);
        const organizedData = organizeDataByRelativeId(response.data);
        setDataByRelativeId(organizedData);
        const summedData = sumQuantitiesByItemName(response.data);
        setSumByItemName(summedData);
      } catch (error) {
        setIsLoading(false);
        console.error(`"error: " ${error.response.data}`);
      }
    };
    fetchLists();
  }, [id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="table__sum">
        <h2>Sum of Quantities by Item</h2>
        <table className="table__wrapper">
          <thead>
            <tr className="table__header">
              <th>Img</th>
              <th>Item Name</th>
              <th className="table__quantity">Quantity</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(sumByItemName).map(
              ([itemName, {quantity,img, item_id}], index) => (
                <tr key={index} className={checkedItems[itemName] ? 'table__itemdone' : ''}>
                  <td>
                  <Link to={`/healthsupplements/${item_id}`}>
                    <img src={img} alt={itemName} className="table__img"/>
                  </Link>
                  </td>
                  <td>{itemName}</td>
                  <td className="table__quantity">{quantity}</td>
                  <td>
                  <input
                    type="checkbox"
                    checked={!!checkedItems[itemName]}
                    onChange={() => handleCheckboxChange(itemName)}
                  />
                </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      {Object.keys(dataByRelativeId).map((relativeId) => (
        <div key={relativeId}>
          <h2>Table for Relative: {relativeId}</h2>
          <table className="table__wrapper--relative">
            <thead>
              <tr className="table__header">
                <th className="table__imgheader">Img</th>
                <th className="table__name">Name</th>
                <th className="table__quantity">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {dataByRelativeId[relativeId].map((item, index) => (
                <tr key={index}>
                  <td>
                    <img src={item.img} alt={item.item_name}className="table__img table__imgheader"></img>
                  </td>
                  <td className="table__name">{item.item_name}</td>
                  <td className="table__quantity">{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default MyList;
