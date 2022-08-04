import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("should launch with defaults", () => {
    render(<App />);
    expect(screen.queryByText(/Grocery List/)).toBeTruthy();
  });
});
