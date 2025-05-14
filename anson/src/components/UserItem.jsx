import React, { useState } from "react";

import UserFavoriteFood from "./UserFavoriteFood";

const UserItem = ({ user, setUsers }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSaveUser = () => {
    setUsers((currentUsersState) =>
      currentUsersState.map((currentUser) =>
        currentUser.id === user.id
          ? { ...currentUser, name, email }
          : currentUser
      )
    );
    setIsEditing(false);
  };

  const handleDeleteUSer = () => {
    setUsers((currentUsersState) =>
      currentUsersState.filter((currentUser) => currentUser.id !== user.id)
    );
  };

  return (
    <div data-testid={`user-item-${user.id}`}>
      <div>
        {isEditing ? (
          <button type="button" onClick={handleSaveUser}>
            Save
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsEditing((currSt) => !currSt)}
          >
            Edit
          </button>
        )}
        <button type="button" onClick={handleDeleteUSer}>
          Delete
        </button>
      </div>
      <div>
        <div>
          <b>Username:</b>
          {isEditing ? (
            <input
              aria-label="name"
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(ev) => {
                setName(ev.target.value);
              }}
            />
          ) : (
            <span>{user.name}</span>
          )}
        </div>
        <div>
          <span>Email:</span>
          {isEditing ? (
            <input
              aria-label="email"
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(ev) => {
                setEmail(ev.target.value);
              }}
            />
          ) : (
            <span>{user.email}</span>
          )}
        </div>
        <section>
          <UserFavoriteFood food={user.favoriteFood} />
        </section>
      </div>

      <br />
    </div>
  );
};

export default UserItem;
