import { useContext } from "react";
import UserContext from "../utils/context/userContext";

function JPUser() {
  const userCtxData = useContext(UserContext);

  return (
    <div>
      <>
        <span>ID: {userCtxData.id}</span>
        <h2>Name: {userCtxData.name}</h2>
        <p>Username: {userCtxData.username}</p>
        <p>Email: {userCtxData.email?.toLowerCase()}</p>
      </>

      {/* {error && <p>{error}</p>} */}
    </div>
  );
}

export default JPUser;
