import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("should launch with defaults", () => {
    const { container } = render(<App />);
    expect(screen.queryByText(/Grocery List/)).toBeTruthy();

    expect(
      container.querySelector('[id="headlessui-portal-root"]')
    ).toBeFalsy();
  });
});
