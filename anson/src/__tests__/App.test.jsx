// import { within } from "@testing-library/dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import App from "../App";

describe("App", () => {
  /* it("should make a snapshot ", () => {
    const { container } = render(<App usersData={[]} />);
    expect(container).toMatchSnapshot();
  });

  describe("When there is only 1 user", () => {
    describe("Edit button is clicked", () => {
      it("should render save button", async () => {
        render(
          <App
            usersData={[
              {
                id: 1,
                name: "baru",
                email: "baru@barudesu.com",
                favoriteFood: ["sushi", "pizza"],
              },
            ]}
          />
        );

        const editButton = screen.getByRole("button", { name: "Edit" });
        await userEvent.click(editButton);

        const saveButton = screen.getByRole("button", { name: "Save" });
        expect(saveButton).exist;
      });

      it("should display user name & email input fields", async () => {
        render(
          <App
            usersData={[
              {
                id: 1,
                name: "baru",
                email: "baru@barudesu.com",
                favoriteFood: ["sushi", "pizza"],
              },
            ]}
          />
        );
        const editButton = screen.getByRole("button", { name: "Edit" });
        await userEvent.click(editButton);

        expect(screen.getByRole("textbox", { name: "name" })).exist;
        expect(screen.getByRole("textbox", { name: "email" })).exist;
      });
    });
  });

  describe("When there are 2 users", () => {
    it("shoudl have two users", () => {
      render(
        <App
          usersData={[
            {
              id: 1,
              name: "baru",
              email: "baru@barudesu.com",
              favoriteFood: ["sushi", "pizza"],
            },
            {
              id: 2,
              name: "kuru",
              email: "kuru@barudesu.com",
              favoriteFood: ["pizza"],
            },
          ]}
        />
      );

      expect(screen.getByText("baru")).exist;
      expect(screen.getByText("kuru")).exist;
    });

    it("should click edit button for 1st user and show save button", async () => {
      render(
        <App
          usersData={[
            {
              id: 1,
              name: "baru",
              email: "baru@barudesu.com",
              favoriteFood: ["sushi", "pizza"],
            },
            {
              id: 2,
              name: "kuru",
              email: "kuru@barudesu.com",
              favoriteFood: ["pizza"],
            },
          ]}
        />
      );

      const userDetails = screen.getByTestId("user-item-1");
      expect(within(userDetails).queryByText("kuru")).toBeNull;
      const editButton = within(userDetails).getByRole("button", {
        name: "Edit",
      });
      await userEvent.click(editButton);
      expect(within(userDetails).getByRole("button", { name: "Save" }));
    });

    it("should edit 2nd username and save", async () => {
      render(
        <App
          usersData={[
            {
              id: 1,
              name: "baru",
              email: "baru@barudesu.com",
              favoriteFood: ["sushi", "pizza"],
            },
            {
              id: 2,
              name: "kuru",
              email: "kuru@barudesu.com",
              favoriteFood: ["pizza"],
            },
          ]}
        />
      );

      const userDetails = screen.getByTestId("user-item-2");
      expect(within(userDetails).queryByText("baru")).toBeNull;

      // click button
      await userEvent.click(
        within(userDetails).getByRole("button", { name: "Edit" })
      );

      await userEvent.clear(
        within(userDetails).getByRole("textbox", { name: "name" }),
        "kuru"
      );
      await userEvent.type(
        within(userDetails).getByRole("textbox", { name: "name" }),
        "kurusito"
      );
      await userEvent.click(
        within(userDetails).getByRole("button", { name: "Save" })
      );

      expect(within(userDetails).queryByText("kuru")).toBeNull();
      expect(within(userDetails).getByText("kurusito")).exist;
    });
  }); */

  describe("rendering context data", () => {
    it("should match snapshot", () => {});

    it("should render correct email", async () => {
      const { container } = render(<App />);
      expect(await screen.findByText("Email: mina@mina.com"));
      expect(container).toMatchSnapshot();
    });
  });
});
