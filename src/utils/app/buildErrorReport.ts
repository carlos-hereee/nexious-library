import messages from "@nxs-utils/data/messages.json";
import { getComponentSpec, getDocsUrl } from "@nxs-utils/data/componentSpecs";
import type { ErrorProp, SpecProp } from "nxs-errors";

// ONE report, TWO surfaces. The dev panel and the console warning render from this same
// object so they can never describe the same mistake differently (CLAUDE.md rule 17).
// The console copy matters as much as the panel: a component that bails early may paint
// almost nothing on screen, and the console is then the only place the reader looks.
export type ErrorReport = {
  componentName: string;
  prop: string;
  headline: string;
  summary?: string;
  importStatement?: string;
  /** The spec for the prop that FAILED. Rendered as the always-visible "expected" line. */
  expected?: SpecProp;
  /** Other required props, shown only inside the collapsible detail. Never includes `expected`. */
  props: SpecProp[];
  example?: string;
  fixes: string[];
  hint?: string;
  received: string;
  docsUrl: string;
  hasSpec: boolean;
};

/**
 * Render any received value as a short, readable literal. Never throws: a prop that
 * failed validation is exactly the kind of value likely to be circular or exotic, and a
 * diagnostic that crashes while reporting a crash is useless.
 */
export const formatReceived = (value: unknown): string => {
  if (value === undefined) return "undefined";
  if (value === null) return "null";
  if (typeof value === "string") return value.length ? `"${value}"` : '"" (empty string)';
  if (typeof value === "function") return "a function";
  if (Array.isArray(value) && value.length === 0) return "[] (empty array)";
  try {
    const json = JSON.stringify(value);
    if (json === "{}") return "{} (empty object)";
    // Truncate so one malformed prop cannot flood the panel or the console.
    return json.length > 240 ? `${json.slice(0, 240)}…` : json;
  } catch {
    return `a ${typeof value} that could not be serialized`;
  }
};

export const buildErrorReport = (error: ErrorProp): ErrorReport => {
  const spec = getComponentSpec(error.component);
  const codePhrase = (messages as Record<string, string>)[error.code] || error.code;
  // Prefer the real component name; fall back to the raw string the caller passed so the
  // reader still gets a hint, and only then to a generic noun. The old implementation
  // printed the PROP name in angle brackets here, which named a thing that does not exist.
  const componentName = error.component ? error.component : "This component";
  const label = error.component ? `<${error.component}>` : "A nexious-library component";

  // Codes that already name their prop in the phrase read wrong with the suffix appended.
  const namesPropItself = error.code === "missingInitialValues";
  const headline = namesPropItself ? `${label} ${codePhrase}` : `${label} ${codePhrase}: ${error.prop}`;

  // The failing prop leads, as the "expected" half of the received/expected pair; everything
  // else required is supporting detail. Nested props report as "icon.icon", so match on the
  // last segment too or IconButton's real failure would find no spec and lose its shape line.
  const leafProp = error.prop.split(".").pop();
  const expected = spec?.props.find((p) => p.name === error.prop || p.name === leafProp);
  const specProps = spec ? spec.props.filter((p) => p.required && p !== expected) : [];

  return {
    componentName,
    prop: error.prop,
    headline,
    summary: spec?.summary,
    importStatement: spec?.importStatement,
    expected,
    props: specProps,
    example: spec?.example,
    fixes: spec?.fixes || [],
    hint: error.hint,
    received: formatReceived(error.value),
    docsUrl: getDocsUrl(error.component),
    hasSpec: !!spec,
  };
};

/** The same report as plain text, for console.warn. Indented so it reads as one block. */
export const formatReportForConsole = (report: ErrorReport): string => {
  const lines: string[] = [`[nexious-library] ${report.headline}`, ""];

  // Same two lines, same order, same wording as the panel's leading pair.
  lines.push(`  received   ${report.received}`);
  if (report.expected) {
    lines.push(`  expected   ${report.expected.type}${report.expected.shape ? `  ${report.expected.shape}` : ""}`);
    lines.push("", report.expected.description);
  }
  if (report.summary) lines.push("", report.summary);
  if (report.props.length) {
    lines.push("", "Also required:");
    report.props.forEach((p) => {
      lines.push(`  ${p.name}: ${p.type}`);
      if (p.shape) lines.push(`    shape  ${p.shape}`);
      lines.push(`    ${p.description}`);
    });
  }
  if (report.example) lines.push("", "Working example:", report.example.replace(/^/gm, "  "));
  if (report.hint) lines.push("", report.hint);
  if (report.fixes.length) {
    lines.push("", "Common causes:");
    report.fixes.forEach((fix) => lines.push(`  • ${fix}`));
  }
  lines.push("", `Full API: ${report.docsUrl}`);
  return lines.join("\n");
};
