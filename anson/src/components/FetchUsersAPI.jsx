import React, { useEffect, useState } from "react";

const USERS_URI_API = "https://jsonplaceholder.typicode.com/users";
const FetchUsersAPI = () => {
  const [usersAPI, setUsersAPI] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchUsers = async () => {
      const apiResponse = await fetch(USERS_URI_API, {
        signal: abortController.signal,
      });
      const usersJson = await apiResponse.json();

      setUsersAPI(usersJson);
      console.log(usersJson);
    };

    fetchUsers();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div>
      <h2>Users API</h2>
      <div>
        {usersAPI.map((user) => (
          <h3 key={user.id}>{user.name}</h3>
        ))}
      </div>
    </div>
  );
};

export default FetchUsersAPI;
