import { fireEvent, render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import Card from "@nxs-organism/card/Card";
import CardGrid from "@nxs-molecules/card/CardGrid";

expect.extend(toHaveNoViolations);

// Card has two branches (2026-11 item 337). With `data` it is the 4.x legacy markup that
// nexious-client's AppPage renders today, and that markup is pinned byte for byte because the
// client's CSS targets it. Without `data` it is the nxs-card recipe, pinned by its parts, its
// heading level, its root element and the rule that the card itself is never a button.

const AXE_OPTIONS = { rules: { region: { enabled: false } } };

describe("Card legacy data branch (the compatibility rule)", () => {
  // Captured from the 4.x Card on library staging before the rebuild. CTA renders twice because
  // CardHeader renders data.cta as well; that is the 4.x behavior AppPage ships with, kept as is.
  const LEGACY_WITH_CTA =
    '<div class="card w-full"><div class="card-header"><div class="card-header"><h1 class="heading">About us</h1>' +
    '<h4 class="heading">Who we are</h4><button type="button" class="nxs-btn nxs-btn-primary nxs-btn-large btn-main btn-cta">Join</button>' +
    '</div></div><div class="card-body"><p class="card-body-p">We build things.</p></div>' +
    '<button type="button" class="nxs-btn nxs-btn-primary nxs-btn-large btn-main btn-cta">Join</button></div>';
  const LEGACY_PLAIN =
    '<div class="card w-full"><div class="card-header"><div class="card-header"><h1 class="heading">About us</h1></div></div>' +
    '<div class="card-body"><p class="card-body-p">We build things.</p></div></div>';

  it("renders the AppPage call (data and className) exactly as 4.x did", () => {
    const { container } = render(<Card data={{ title: "About us", body: "We build things." }} className="w-full" />);
    expect(container.innerHTML).toBe(LEGACY_PLAIN);
  });

  it("renders CardHeader, CardBody and the CTA row exactly as 4.x did, and reports the pressed CTA", () => {
    const onClick = jest.fn();
    const cta = { uid: "c1", name: "join", label: "Join" };
    const { container } = render(
      <Card
        data={{ title: "About us", subtitle: "Who we are", body: "We build things.", cta: [cta] }}
        className="w-full"
        onClick={onClick}
      />
    );
    expect(container.innerHTML).toBe(LEGACY_WITH_CTA);
    fireEvent.click(container.querySelectorAll("button")[1]);
    expect(onClick).toHaveBeenCalledWith(cta);
  });

  it("gains no nxs-card class on the legacy branch", () => {
    const { container } = render(<Card data={{ title: "About us" }} />);
    expect(container.querySelector("[class*='nxs-card']")).toBeNull();
    expect(container.firstElementChild).toHaveClass("card");
  });
});

describe("Card nxs-card branch", () => {
  it("renders media, header, body and footer in that order, each in its part class", () => {
    const { container } = render(
      <Card
        title="Spring sale"
        subtitle="Ends Friday"
        media={<img src="/sale.png" alt="" />}
        footer={<button type="button">Shop</button>}
      >
        <p>Every sticker half off.</p>
      </Card>
    );
    const card = container.firstElementChild as HTMLElement;
    expect(card.tagName).toBe("DIV");
    expect(card).toHaveAttribute("class", "nxs-card");
    const parts = Array.from(card.children).map((part) => part.getAttribute("class"));
    expect(parts).toEqual(["nxs-card-media", "nxs-card-header", "nxs-card-body", "nxs-card-footer"]);
    expect(screen.getByRole("heading", { level: 3, name: "Spring sale" })).toHaveClass("nxs-card-title");
    expect(container.querySelector(".nxs-card-subtitle")?.tagName).toBe("P");
  });

  it("leaves out every part it was not given", () => {
    const { container } = render(<Card>Body only</Card>);
    const card = container.firstElementChild as HTMLElement;
    expect(Array.from(card.children).map((part) => part.className)).toEqual(["nxs-card-body"]);
    expect(screen.queryByRole("heading")).toBeNull();
  });

  it.each([2, 3, 4, 5, 6] as const)("renders the title at heading level %i", (level) => {
    render(<Card title="Title" headingLevel={level} />);
    expect(screen.getByRole("heading", { level, name: "Title" })).toBeInTheDocument();
  });

  it.each(["div", "article", "li"] as const)("renders the root as %s", (element) => {
    const ui = <Card as={element} title="Title" />;
    const { container } = render(element === "li" ? <ul>{ui}</ul> : ui);
    const root = element === "li" ? container.querySelector("li") : container.firstElementChild;
    expect(root?.tagName).toBe(element.toUpperCase());
    expect(root).toHaveClass("nxs-card");
  });

  it("adds the selected class only while selected, and appends className last", () => {
    const { container, rerender } = render(<Card title="Pro" className="plan-card" />);
    expect(container.firstElementChild).toHaveAttribute("class", "nxs-card plan-card");
    rerender(<Card title="Pro" className="plan-card" isSelected />);
    expect(container.firstElementChild).toHaveAttribute("class", "nxs-card nxs-card-selected plan-card");
  });

  it("is never a button itself, and is clickable only through the child link or button", () => {
    const onOpen = jest.fn();
    const { container } = render(
      <Card
        title={
          <button type="button" className="nxs-card-link" onClick={onOpen}>
            Iron Forge
          </button>
        }
        footer={<a href="#settings">Settings</a>}
      />
    );
    const card = container.firstElementChild as HTMLElement;
    expect(card).not.toHaveAttribute("role");
    expect(card).not.toHaveAttribute("tabindex");
    expect(container.querySelector("[role='button']")).toBeNull();
    fireEvent.click(card);
    expect(onOpen).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Iron Forge" }));
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it("puts the title control and then the footer controls in the tab order, and nothing else", () => {
    const { container } = render(
      <Card
        title={
          <a href="#app" className="nxs-card-link">
            Iron Forge
          </a>
        }
        footer={
          <>
            <button type="button">Manage</button>
            <button type="button">Disable</button>
          </>
        }
      >
        <p>A strength gym in Houston.</p>
      </Card>
    );
    const focusable = Array.from(container.querySelectorAll<HTMLElement>("a[href], button, [tabindex]"));
    expect(focusable.map((element) => element.textContent)).toEqual(["Iron Forge", "Manage", "Disable"]);
    focusable.forEach((element) => {
      element.focus();
      expect(element).toHaveFocus();
    });
    // The heading still names the card through the link it holds.
    expect(screen.getByRole("heading", { name: "Iron Forge" })).toContainElement(
      screen.getByRole("link", { name: "Iron Forge" })
    );
  });

  it("sits in a CardGrid beside the grid's own classes", () => {
    const { container } = render(
      <CardGrid>
        <Card title="One" />
        <Card title="Two" />
      </CardGrid>
    );
    expect(container.firstElementChild).toHaveClass("nxs-card-grid");
    expect(container.querySelectorAll(".nxs-card-grid > .nxs-card")).toHaveLength(2);
  });

  it("has no axe violations as a content card, a linked card, a selected card and a list of cards", async () => {
    const { container } = render(
      <div>
        <Card title="Spring sale" subtitle="Ends Friday" media={<img src="/sale.png" alt="" />}>
          <p>Every sticker half off.</p>
        </Card>
        <Card
          as="article"
          title={
            <a href="#app" className="nxs-card-link">
              Iron Forge
            </a>
          }
          footer={<button type="button">Manage</button>}
        />
        <Card
          title={
            <button type="button" className="nxs-card-link" aria-pressed="true">
              Pro plan
            </button>
          }
          isSelected
        />
        <ul>
          <Card as="li" title="Listed" headingLevel={4} />
        </ul>
      </div>
    );
    expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
  });
});
