import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import BurgerButton from "@nxs-molecules/buttons/BurgerButton";
import IconButton from "@nxs-molecules/buttons/IconButton";
import CopyButton from "@nxs-molecules/buttons/CopyButton";

describe("BurgerButton", () => {
  it("labels itself 'open menu' and is collapsed when isBurger is false", () => {
    render(<BurgerButton isBurger={false} onClick={jest.fn()} />);
    expect(screen.getByRole("button", { name: "open menu" })).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "false");
  });

  it("labels itself 'close menu' and is expanded when isBurger is true", () => {
    render(<BurgerButton isBurger onClick={jest.fn()} />);
    expect(screen.getByRole("button", { name: "close menu" })).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
  });
});

describe("IconButton accessible name", () => {
  it("uses an explicit aria-label", () => {
    render(<IconButton icon={{ icon: "copy" }} aria-label="Copy link" onClick={jest.fn()} />);
    expect(screen.getByRole("button", { name: "Copy link" })).toBeInTheDocument();
  });

  it("falls back to the title when no aria-label is given", () => {
    render(<IconButton icon={{ icon: "copy" }} title="Copy" onClick={jest.fn()} />);
    expect(screen.getByRole("button", { name: "Copy" })).toBeInTheDocument();
  });
});

describe("CopyButton", () => {
  it("renders an accessible copy button and a polite live region for the success announcement", () => {
    const { container } = render(<CopyButton data="https://example.com" />);
    expect(screen.getByRole("button", { name: "Copy link" })).toBeInTheDocument();
    expect(container.querySelector("[aria-live='polite']")).toBeInTheDocument();
  });
});
