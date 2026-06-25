import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "@nxs-template/Header";
import type { MenuProp } from "nxs-navigation";

const logo = { url: "/logo.svg", title: "Acme", alt: "Acme brand" };
const menu: MenuProp[] = [{ name: "Home", link: "/", icon: "home" }];

describe("Header", () => {
  // Regression: useRequiredProps was hardened after 3.0.7 to flag an empty array
  // as "missing". The header gated its whole render on that, so any menu-less page
  // (public landing, minimal app, initial load) rendered an error block instead of
  // the header chrome. An empty menu must still render the <header> with its logo.
  it("renders the header chrome with an EMPTY menu (no nav, but logo stays)", () => {
    render(<Header menu={[]} logo={logo} updateMenu={jest.fn()} />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /acme/i })).toBeInTheDocument();
    // No menu items means no navigation landmarks are drawn.
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("renders the primary and mobile nav when the menu has items", () => {
    render(<Header menu={menu} logo={logo} updateMenu={jest.fn()} />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Primary" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Mobile" })).toBeInTheDocument();
  });

  it("renders pass-through utilities alongside the header", () => {
    render(
      <Header menu={[]} logo={logo} updateMenu={jest.fn()} utilities={<button type="button">Account</button>} />
    );

    expect(screen.getByRole("button", { name: "Account" })).toBeInTheDocument();
  });
});
