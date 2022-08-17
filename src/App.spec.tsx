import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { App } from "@MyList/App";

describe("launched with defaults", () => {
  it("should show title and items", () => {
    render(<App />);

    expect(screen.getByText(/Apples/)).toBeInTheDocument();
    expect(screen.getByText(/Bread/)).toBeInTheDocument();
    expect(screen.getByText(/Watermelon/)).toBeInTheDocument();
  });
});

describe("interactions", () => {
  it("should not show dialog on startup", () => {
    render(<App />);

    expect(screen.queryByRole("dialog")).toBeNull();
  });
  it("should show 'edit' and 'trash' icons on item mouseover", () => {
    render(<App />);

    fireEvent.mouseOver(screen.getByText("Apples"));
    const editIcon = screen.getByTestId("edit");
    const trashIcon = screen.getByTestId("trash");

    expect(editIcon).toBeInTheDocument();
    expect(trashIcon).toBeInTheDocument();
  });
  it("should show dialog on 'trash' icon click", async () => {
    render(<App />);

    fireEvent.mouseOver(screen.getByText("Apples"));
    const icon = screen.getByTestId("trash");
    fireEvent.click(icon);
    const dialog = await screen.findByRole("dialog");

    expect(dialog).toHaveTextContent(/Confirm your request to delete/i);
  });
});
