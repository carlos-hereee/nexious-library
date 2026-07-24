import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { resolveDevMode } from "@nxs-utils/app/devMode";
import { buildErrorReport, formatReportForConsole } from "@nxs-utils/app/buildErrorReport";
import { nextPanelId, registerPanel, unregisterPanel, isFirstPanel } from "@nxs-utils/app/devPanelRegistry";
import type { ErrorMessageProps } from "nxs-errors";

// ── The dev-mode teaching panel ──────────────────────────────────────────────
// WHAT: what a component renders instead of itself when it was called wrong.
// GOAL: end the interruption here. The reader sees, without clicking anything, what they
// passed and what was wanted. Opening the detail adds how the component works, a
// copy-pasteable call, and the mistakes that really cause this. The docs link is last, an
// escape hatch for the rare case the panel was not enough, not the answer itself.
//
// WHY IT IS STYLED AS A TERMINAL: this is a build-time diagnostic, never real UI, and a
// dark monospace block cannot be mistaken for one at a glance the way a red-bordered card
// can. It also lets the panel and the console.warn render from ONE report with the same
// two leading lines, so the two can never describe the same mistake differently.
//
// PRODUCTION: nothing below renders unless dev mode resolves true (prop > setDevMode > NODE_ENV),
// because a diagnostic in front of a real user is worse than the missing component.
//
// NO LIBRARY COMPONENTS INSIDE. This deliberately uses bare elements instead of Button /
// IconButton / CopyButton: those resolve icons through the registry and render an
// ErrorMessage of their own when it is empty, which is exactly the state a broken app is
// often in. Importing them here would let one missing icon recurse into an infinite tree.

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, isDev }) => {
  const showPanel = resolveDevMode(isDev);
  const report = buildErrorReport(error);
  const [copied, setCopied] = useState(false);
  // Panels start closed and the page's first one opens in a layout effect (before paint),
  // so the reader never watches a panel collapse out from under them. See devPanelRegistry.
  const [isOpen, setOpen] = useState(false);
  const panelId = useRef<number>();
  if (panelId.current === undefined) panelId.current = nextPanelId();
  // Ref-gated so a re-render (or React 18 StrictMode's double effect) does not log the
  // same mistake twice and make one error look like two.
  const hasLogged = useRef(false);

  useLayoutEffect(() => {
    if (!showPanel) return undefined;
    const id = panelId.current as number;
    registerPanel(id);
    setOpen(isFirstPanel(id));
    return () => unregisterPanel(id);
  }, [showPanel]);

  useEffect(() => {
    if (!showPanel || hasLogged.current) return;
    hasLogged.current = true;
    // eslint-disable-next-line no-console
    console.warn(formatReportForConsole(report));
  }, [showPanel, report.headline]);

  useEffect(() => {
    if (!copied) return undefined;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  if (!showPanel) return null;

  const copyExample = async () => {
    if (!report.example || !navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(report.example);
      setCopied(true);
    } catch {
      // Clipboard is blocked on insecure origins. The snippet is already on screen and
      // selectable, so a failed copy costs the reader nothing worth reporting.
    }
  };

  return (
    <div className="nxs-dev-error" role="alert" data-component={report.componentName}>
      <div className="nxs-dev-error-bar" aria-hidden="true">
        <span className="nxs-dev-error-dot nxs-dev-error-dot-red" />
        <span className="nxs-dev-error-dot nxs-dev-error-dot-amber" />
        <span className="nxs-dev-error-dot nxs-dev-error-dot-green" />
        <span className="nxs-dev-error-origin">nexious-library · dev only</span>
      </div>

      <p className="nxs-dev-error-headline">{report.headline}</p>

      {/* The whole diagnosis in two lines. Everything below is elaboration. */}
      <dl className="nxs-dev-error-pair">
        <dt>received</dt>
        <dd>
          <code className="nxs-dev-error-bad">{report.received}</code>
        </dd>
        {report.expected && (
          <>
            <dt>expected</dt>
            <dd>
              <code className="nxs-dev-error-type">{report.expected.type}</code>
              {report.expected.shape && <code className="nxs-dev-error-shape">{report.expected.shape}</code>}
            </dd>
          </>
        )}
      </dl>

      {report.hasSpec ? (
        <details className="nxs-dev-error-details" open={isOpen} onToggle={(e) => setOpen(e.currentTarget.open)}>
          <summary className="nxs-dev-error-summary">How {report.componentName} works</summary>

          {report.expected && <p className="nxs-dev-error-text">{report.expected.description}</p>}
          {report.summary && <p className="nxs-dev-error-text">{report.summary}</p>}

          {report.props.length > 0 && (
            <>
              <span className="nxs-dev-error-label">Also required</span>
              <dl className="nxs-dev-error-props">
                {report.props.map((prop) => (
                  <div className="nxs-dev-error-prop" key={prop.name}>
                    <dt>
                      <code className="nxs-dev-error-prop-name">{prop.name}</code>
                      <code className="nxs-dev-error-type">{prop.type}</code>
                    </dt>
                    <dd>
                      {prop.shape && <code className="nxs-dev-error-shape">{prop.shape}</code>}
                      <span className="nxs-dev-error-prop-desc">{prop.description}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </>
          )}

          {report.example && (
            <div className="nxs-dev-error-example">
              <div className="nxs-dev-error-example-bar">
                <span className="nxs-dev-error-label">Working example</span>
                <button type="button" className="nxs-dev-error-copy" onClick={copyExample}>
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              {report.importStatement && (
                <pre className="nxs-dev-error-code">
                  <code>{report.importStatement}</code>
                </pre>
              )}
              <pre className="nxs-dev-error-code">
                <code>{report.example}</code>
              </pre>
              <span aria-live="polite" className="sr-only">
                {copied ? "Example copied to clipboard" : ""}
              </span>
            </div>
          )}

          {report.hint && <p className="nxs-dev-error-hint">{report.hint}</p>}

          {report.fixes.length > 0 && (
            <ul className="nxs-dev-error-fixes">
              {report.fixes.map((fix) => (
                <li key={fix}>{fix}</li>
              ))}
            </ul>
          )}
        </details>
      ) : (
        // No spec for this component yet. Say so plainly rather than implying the panel is
        // complete, and send the reader somewhere useful.
        <p className="nxs-dev-error-text">
          This component has no inline guide yet. The full prop table is in the docs.
        </p>
      )}

      <a className="nxs-dev-error-docs" href={report.docsUrl} target="_blank" rel="noreferrer">
        {report.docsUrl.replace("https://www.", "")} →
      </a>
    </div>
  );
};
export default ErrorMessage;
