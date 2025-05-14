import { useContext } from "react";
import UserFavoriteFood from "./UserFavoriteFood";
import UserName from "./UserName";
import UserContext from "../utils/context/userContext";

const UserProfile = ({ user }) => {
  // Consume the context
  const userContextData = useContext(UserContext);

  return (
    <div id={`user-profile${user.id}`}>
      <UserName username={user.name} />
      <div>
        <span>Email:</span>
        <span>{user.email}</span>
      </div>
      <section>
        <UserFavoriteFood food={user.favoriteFood} />
      </section>
      <section>
        <h3>{userContextData.name}</h3>
        <p>Phone: {userContextData.phone}</p>
      </section>
    </div>
  );
};

export default UserProfile;
