import { useEffect, useState } from "react";
import UserProfile from "./components/UserProfile";

import "./styles/main.scss";
import UserItem from "./components/UserItem";
import AddUserForm from "./components/AddUserForm";
import FetchUsersAPI from "./components/FetchUsersAPI";
import UserContext from "./utils/context/userContext";

const usersData = [
  {
    id: 1,
    name: "sam",
    email: "sam@test.com",
    password: "password",
    favoriteFood: ["sushi"],
  },
  {
    id: 2,
    name: "mish",
    email: "mish@test.com",
    password: "password",
    favoriteFood: ["sushi", "enchiladas", "burger"],
  },
  {
    id: 3,
    name: "mina",
    email: "mina@test.com",
    password: "password",
    favoriteFood: ["sushi", "pizza", "burger"],
  },
];

const authenticatedUserInitialState = {
  id: 0,
  name: "",
  password: "",
  email: "",
  favoriteFood: [],
};
const USER_KEY_LS = "user_key";
const formDataInitialState = { name: "", password: "" };
const App_v1 = () => {
  const [users, setUsers] = useState(usersData);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState(
    authenticatedUserInitialState
  );
  const [formData, setFormData] = useState(formDataInitialState);

  useEffect(() => {
    const userLS = window.localStorage.getItem(USER_KEY_LS);
    console.log(userLS);
    if (userLS) {
      setIsAuthenticated(true);
      setAuthenticatedUser(JSON.parse(userLS));
    }
  }, []);
  console.log(users);
  // Derived state
  const isDisabled = !formData.name || !formData.password;

  const handleFormChange = (ev) => {
    const { id, value } = ev.target;
    setFormData((currentState) => ({ ...currentState, [id]: value }));
    console.log(id, value);
  };

  const handleSignInSubmit = (ev) => {
    ev.preventDefault();

    const { name, password } = formData;

    let foundUser = users.find(
      (user) => user.name.toLowerCase() === name.toLowerCase()
    );

    if (!foundUser) {
      return;
    }

    let isUserValid =
      foundUser.name === name && foundUser.password === password;

    console.log("isUserValid", isUserValid);
    if (isUserValid) {
      setIsAuthenticated(isUserValid);
      setAuthenticatedUser(foundUser);
      window.localStorage.setItem(USER_KEY_LS, JSON.stringify(foundUser));
    } else {
      setFormData({ name: "", password: "" });
      setAuthenticatedUser(authenticatedUserInitialState);
    }
  };

  return (
    <UserContext.Provider
      value={{
        id: 2,
        name: "Ervin Howell",
        username: "Antonette",
        email: "Shanna@melissa.tv",
        address: {
          street: "Victor Plains",
          suite: "Suite 879",
          city: "Wisokyburgh",
          zipcode: "90566-7771",
          geo: {
            lat: "-43.9509",
            lng: "-34.4618",
          },
        },
        phone: "010-692-6593 x09125",
        website: "anastasia.net",
        company: {
          name: "Deckow-Crist",
          catchPhrase: "Proactive didactic contingency",
          bs: "synergize scalable supply-chains",
        },
      }}
    >
      <div>
        <h1>Root Component</h1>

        {isAuthenticated ? (
          <>
            <button
              type="button"
              onClick={() => {
                window.localStorage.clear();
                setIsAuthenticated(false);
                setFormData(formDataInitialState);
              }}
            >
              Sign out
            </button>
            <UserProfile
              user={{
                id: authenticatedUser.id,
                name: authenticatedUser.name,
                email: authenticatedUser.email,
                favoriteFood: authenticatedUser.favoriteFood,
              }}
            />
            <AddUserForm setUsers={setUsers} />
            <>
              <h2>Users</h2>
              <ul>
                {users.map((user) => (
                  <UserItem key={user.id} user={user} setUsers={setUsers} />
                ))}
              </ul>
            </>
          </>
        ) : (
          <>
            <div>
              <h2>Sign in</h2>
              <form onSubmit={handleSignInSubmit}>
                <label htmlFor="name">Username</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  autoFocus
                />
                <br />
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleFormChange}
                />
                <br />

                <br />
                <button type="submit" disabled={isDisabled}>
                  Login
                </button>
              </form>
            </div>
            <FetchUsersAPI />
          </>
        )}
      </div>
    </UserContext.Provider>
  );
};

export default App_v1;
