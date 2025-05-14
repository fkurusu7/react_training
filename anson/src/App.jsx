import { useEffect, useState } from "react";
import JPPosts from "./components/JPPosts";
import JPUser from "./components/JPUser";
import UserContext from "./utils/context/userContext";
import { useFetchUser } from "./hooks/useFetchUser";

/* import { useState } from "react";
import UserItem from "./components/UserItem";
 */
// export default function App({ usersData }) {
export default function App() {
  /* const [users, setUsers] = useState(usersData);

  return (
    <div>
      {users.map((user) => (
        <UserItem user={user} setUsers={setUsers} key={user.id} />
      ))}
    </div>
  ); */
  const { userData, error, isLoading } = useFetchUser(2);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (!isLoading && !error && userData) setUser(userData);
  }, [userData, error, isLoading]);

  return (
    <UserContext.Provider value={{ ...user, setUser }}>
      <div>
        <h1>JSON PlaceHolder Users</h1>
        <div>
          {isLoading ? "Loading..." : <JPUser />}
          {!error && <p>{error}</p>}
        </div>
        <JPPosts />
      </div>
    </UserContext.Provider>
  );
}
