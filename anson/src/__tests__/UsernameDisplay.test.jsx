import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import UsernameDisplay from "../components/UsernameDisplay";

describe("UsernameDisplay", () => {
  it("should render username", () => {
    const username = "mish";
    const result = render(<UsernameDisplay username={username} />);
    // expect(result.container).toMatchSnapshot();
    expect(screen.getByText(username)).toBeDefined();
    expect(screen.getByText(/ish/)).toBeDefined();
    expect(screen.queryByText("nomish")).toBeNull();
  });
});
