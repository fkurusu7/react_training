import React, { useState } from "react";

/* 
{
  id: 1,
  name: "sam",
  email: "sam@test.com",
  password: "password",
  favoriteFood: ["sushi"],
},
*/

const initialState = {
  id: 0,
  name: "",
  email: "",
  password: "",
  favoriteFood: [],
};
const AddUserForm = ({ setUsers }) => {
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (ev) => {
    let { id, value } = ev.target;
    if (id === "favoriteFood") {
      const foodArray = value.trim().split(",");
      value = foodArray;
    }
    setFormData((currentState) => ({ ...currentState, [id]: value }));
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const id = crypto.randomUUID();
    setUsers((currentState) => [...currentState, { ...formData, id }]);
    setFormData(initialState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="favoriteFood">Favorite Food</label>
        <input
          type="text"
          id="favoriteFood"
          name="favoriteFood"
          value={formData.favoriteFood}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Add USer</button>
    </form>
  );
};

export default AddUserForm;
