import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders heading and subheading", () => {
  render(<App />);
  // Check if main heading is present
  expect(screen.getByText(/React Jenkins/i)).toBeInTheDocument();
  // Check if subheading is present
  expect(
    screen.getByText(/This is my React app for Jenkins CI\/CD/i)
  ).toBeInTheDocument();
});

test("increments counter when button is clicked", () => {
  render(<App />);
  const button = screen.getByRole("button", { name: /count is 0/i });
  fireEvent.click(button);
  expect(
    screen.getByRole("button", { name: /count is 1/i })
  ).toBeInTheDocument();
});
