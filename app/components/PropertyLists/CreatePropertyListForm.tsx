import { useState } from "react";
import axios from "axios";

const CreatePropertyListForm = () => {
  const [name, setName] = useState("");
  const [listingIds, setListingIds] = useState<number[]>([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/propertyLists", { name, listingIds });
    // Redirect or update UI
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Listing IDs</label>
        <input
          value={listingIds.join(",")}
          onChange={(e) => setListingIds(e.target.value.split(",").map(Number))}
        />
      </div>
      <button type="submit">Create List</button>
    </form>
  );
};

export default CreatePropertyListForm;
