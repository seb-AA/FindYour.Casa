import { useEffect, useState } from "react";
import axios from "axios";

const PropertyListsPage = () => {
  const [propertyLists, setPropertyLists] = useState([]);

  useEffect(() => {
    const fetchPropertyLists = async () => {
      const response = await axios.get("/api/propertyLists");
      setPropertyLists(response.data);
    };

    fetchPropertyLists();
  }, []);

  return (
    <div>
      <h1>Your Property Lists</h1>
      <ul>
        {propertyLists.map((list) => (
          <li key={list.id}>{list.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyListsPage;
