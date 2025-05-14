import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import JPUser from "../components/JPUser";
import UserContext from "../utils/context/userContext";

describe("render context values", () => {
  const mockUserCtxData = {
    id: 1000,
    name: "Johny",
    username: "jj",
    email: "j@gmail.com",
    setUser: () => {},
  };

  it("should match snapshot", () => {
    const { container } = render(
      <UserContext.Provider value={mockUserCtxData}>
        <JPUser />
      </UserContext.Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it("should display correct user name", () => {
    render(
      <UserContext.Provider value={mockUserCtxData}>
        <JPUser />
      </UserContext.Provider>
    );

    expect(screen.queryByText("Name: Johny")).exist;
  });
});
