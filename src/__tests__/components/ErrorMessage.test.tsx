import { render, screen } from "@testing-library/react";
import ErrorMessage from "@nxs-atoms/texts/ErrorMessage";
import ErrorMessages from "@nxs-molecules/errors/ErrorMessages";
import Hero from "@nxs-molecules/assets/Hero";
import IconButton from "@nxs-molecules/buttons/IconButton";
import { setDevMode } from "@nxs-utils/app/devMode";
import { formatReceived, buildErrorReport } from "@nxs-utils/app/buildErrorReport";

// jest runs with NODE_ENV="test", so the env probe reports dev and the panels render by
// default. Each test that changes the app-wide switch resets it, or the module-level
// override would leak into every later test in the file.
afterEach(() => setDevMode(undefined));

describe("ErrorMessage dev panel", () => {
  const heroError = { code: "missingProps", prop: "hero", value: undefined, component: "Hero" };

  // ── what the reader actually sees ──────────────────────────────────────────
  it("names the component and the prop in the headline", () => {
    render(<ErrorMessage error={heroError} />);

    expect(screen.getByRole("alert")).toHaveTextContent("<Hero> is missing a required prop: hero");
  });

  it("shows the required shape so the reader does not need the docs", () => {
    render(<ErrorMessage error={heroError} />);

    expect(screen.getByText(/url\?: string; alt\?: string/)).toBeInTheDocument();
    expect(screen.getByText("AssetProps")).toBeInTheDocument();
  });

  it("shows a copy-pasteable working example and its import", () => {
    render(<ErrorMessage error={heroError} />);

    expect(screen.getByText(/<Hero hero=\{\{ url: "\/banner\.jpg"/)).toBeInTheDocument();
    expect(screen.getByText('import { Hero } from "nexious-library";')).toBeInTheDocument();
  });

  it("reports what was actually received, not the error record", () => {
    render(<ErrorMessage error={{ ...heroError, value: "/banner.jpg" }} />);

    expect(screen.getByRole("alert")).toHaveTextContent('"/banner.jpg"');
  });

  it("lists the common causes as the escape path", () => {
    render(<ErrorMessage error={heroError} />);

    expect(screen.getByText(/Hero takes an object, not a string/)).toBeInTheDocument();
  });

  it("links the component's own docs page last", () => {
    render(<ErrorMessage error={heroError} />);
    const link = screen.getByRole("link", { name: /Full API reference for Hero/ });

    expect(link).toHaveAttribute("href", "https://www.companyuno.com/docs/hero");
  });

  it("degrades to the docs home for a component with no spec yet", () => {
    render(<ErrorMessage error={{ code: "missingProps", prop: "thing", value: undefined, component: "NotSpecced" }} />);

    expect(screen.getByText(/no inline guide yet/)).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "https://www.companyuno.com/docs");
  });

  it("appends a runtime hint when one is supplied", () => {
    render(<ErrorMessage error={{ ...heroError, hint: "Currently registered keys: close, check." }} />);

    expect(screen.getByText("Currently registered keys: close, check.")).toBeInTheDocument();
  });

  // ── the production gate ────────────────────────────────────────────────────
  it("renders nothing when the isDev prop is false", () => {
    const { container } = render(<ErrorMessage error={heroError} isDev={false} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("renders nothing when setDevMode(false) was called at boot", () => {
    setDevMode(false);
    const { container } = render(<ErrorMessage error={heroError} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("lets the isDev prop override setDevMode in both directions", () => {
    setDevMode(false);
    render(<ErrorMessage error={heroError} isDev />);
    expect(screen.getByRole("alert")).toBeInTheDocument();

    setDevMode(true);
    const { container } = render(<ErrorMessage error={heroError} isDev={false} />);
    expect(container).toBeEmptyDOMElement();
  });
});

describe("ErrorMessages list", () => {
  const errors = [
    { prop: "menu", code: "missingProps", name: "menu", value: undefined, isAProp: true },
    { prop: "updateMenu", code: "missingProps", name: "updateMenu", value: undefined, isAProp: true },
  ];

  it("renders one panel per error, each naming the component", () => {
    render(<ErrorMessages errors={errors} component="Header" />);
    const panels = screen.getAllByRole("alert");

    expect(panels).toHaveLength(2);
    expect(panels[0]).toHaveTextContent("<Header> is missing a required prop: menu");
    expect(panels[1]).toHaveTextContent("<Header> is missing a required prop: updateMenu");
  });

  it("forwards isDev to every panel", () => {
    const { container } = render(<ErrorMessages errors={errors} component="Header" isDev={false} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("preserves an error's own code instead of forcing missingProps", () => {
    render(<ErrorMessages errors={[{ ...errors[0], code: "iconNotFound" }]} component="Header" />);

    expect(screen.getByRole("alert")).toHaveTextContent("not in the registry");
  });
});

describe("components route their own failures through the panel", () => {
  it("Hero names itself when hero is missing", () => {
    // @ts-expect-error deliberately omitting the required prop, which is the case under test
    render(<Hero />);

    expect(screen.getByRole("alert")).toHaveTextContent("<Hero> is missing a required prop: hero");
  });

  it("IconButton reports the failed key and lists the registered ones", () => {
    render(<IconButton icon={{ icon: "definitely-not-registered" }} />);
    const panel = screen.getByRole("alert");

    expect(panel).toHaveTextContent("<IconButton> was given an icon key that is not in the registry");
    expect(panel).toHaveTextContent('"definitely-not-registered"');
    expect(panel).toHaveTextContent(/Currently registered keys:/);
  });

  it("IconButton no longer leaks a bare paragraph past the dev gate", () => {
    // The old code rendered <p>Double check icon prop</p> unconditionally, so this string
    // reached production users. It must now be gated like every other diagnostic.
    // (IconButtonProps.icon is optional, so omitting it is a compile-clean runtime mistake,
    // which is exactly the case the panel exists to catch.)
    const { container } = render(<IconButton isDev={false} />);

    expect(container).toBeEmptyDOMElement();
  });
});

describe("formatReceived", () => {
  it("distinguishes the empty values that all read as 'nothing'", () => {
    expect(formatReceived(undefined)).toBe("undefined");
    expect(formatReceived(null)).toBe("null");
    expect(formatReceived("")).toBe('"" (empty string)');
    expect(formatReceived([])).toBe("[] (empty array)");
    expect(formatReceived({})).toBe("{} (empty object)");
  });

  it("never throws on a circular value", () => {
    const circular: Record<string, unknown> = {};
    circular.self = circular;

    expect(() => formatReceived(circular)).not.toThrow();
    expect(formatReceived(circular)).toMatch(/could not be serialized/);
  });

  it("truncates a very large value rather than flooding the panel", () => {
    const big = { note: "x".repeat(500) };

    expect(formatReceived(big).length).toBeLessThan(250);
  });
});

describe("buildErrorReport", () => {
  it("omits the prop suffix for codes that already name their prop", () => {
    const report = buildErrorReport({
      code: "missingInitialValues",
      prop: "initialValues",
      value: undefined,
      component: "Form",
    });

    expect(report.headline).toBe("<Form> is missing initialValues, so it has no fields to build");
  });

  it("matches a spec despite call-site casing drift", () => {
    expect(buildErrorReport({ code: "missingProps", prop: "menu", value: undefined, component: "header" }).hasSpec).toBe(
      true
    );
  });

  it("stays useful when no component name was passed at all", () => {
    const report = buildErrorReport({ code: "missingProps", prop: "data", value: undefined });

    expect(report.headline).toBe("A nexious-library component is missing a required prop: data");
    expect(report.hasSpec).toBe(false);
  });
});
