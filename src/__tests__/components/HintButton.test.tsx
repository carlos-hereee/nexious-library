import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import HintButton from "@nxs-molecules/buttons/HintButton";
import ItemDetail from "@nxs-template/ItemDetail";

expect.extend(toHaveNoViolations);

// ── HintButton opens on its toggle alone and every string is overridable ──
// The panel once rendered only while a `data` prop was set, which ItemDetail never passed, so every
// hint showed nothing. These pin the toggle, the localizable labels and the no heading rule.

describe("HintButton", () => {
  it("opens its panel from the toggle without any data prop and closes it again", () => {
    render(<HintButton body="Mana pays for AI help." />);
    const toggle = screen.getByRole("button", { name: "show hint" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("region", { name: "Hint" })).toHaveTextContent("Mana pays for AI help.");
    fireEvent.click(screen.getByRole("button", { name: "close" }));
    expect(screen.queryByRole("region")).not.toBeInTheDocument();
  });

  it("takes every visible and spoken string from props", () => {
    render(<HintButton body="El maná paga la ayuda de IA." toggleLabel="ver ayuda" closeLabel="cerrar" label="Ayuda" />);
    fireEvent.click(screen.getByRole("button", { name: "ver ayuda" }));
    expect(screen.getByRole("region", { name: "Ayuda" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "cerrar" })).toBeInTheDocument();
  });

  it("names the panel by its title and renders the title as text, never a heading", () => {
    render(<HintButton title="Dero mana" body="Mana pays for AI help." />);
    fireEvent.click(screen.getByRole("button", { name: "show hint" }));
    expect(screen.getByRole("region", { name: "Dero mana" })).toHaveTextContent("Dero mana");
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("has no axe violations while open", async () => {
    const { container } = render(<HintButton title="Dero mana" body="Mana pays for AI help." />);
    fireEvent.click(screen.getByRole("button", { name: "show hint" }));
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("ItemDetail hint", () => {
  it("opens the hint it is given and passes its labels through", () => {
    render(
      <ItemDetail label="Stripe" hint={{ title: "Onboarding", body: "Finish setup in Stripe.", toggleLabel: "ver ayuda", closeLabel: "cerrar" }} />
    );
    fireEvent.click(screen.getByRole("button", { name: "ver ayuda" }));
    expect(screen.getByRole("region", { name: "Onboarding" })).toHaveTextContent("Finish setup in Stripe.");
    expect(screen.getByRole("button", { name: "cerrar" })).toBeInTheDocument();
  });
});
