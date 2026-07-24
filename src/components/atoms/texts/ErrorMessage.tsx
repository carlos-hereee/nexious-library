import { useEffect, useRef, useState } from "react";
import { resolveDevMode } from "@nxs-utils/app/devMode";
import { buildErrorReport, formatReportForConsole } from "@nxs-utils/app/buildErrorReport";
import type { ErrorMessageProps } from "nxs-errors";

// ── The dev-mode teaching panel ──────────────────────────────────────────────
// WHAT: what a component renders instead of itself when it was called wrong.
// GOAL: end the interruption here. The panel names the component and the prop, shows the
// exact shape expected, shows what was actually received, gives a copy-pasteable call that
// works, and lists the mistakes that really cause this. The docs link is last, an escape
// hatch for the rare case the panel was not enough, not the answer itself.
//
// PRODUCTION: nothing below renders unless dev mode resolves true (prop > setDevMode > NODE_ENV),
// because a red diagnostic box in front of a real user is worse than the missing component.
//
// NO LIBRARY COMPONENTS INSIDE. This deliberately uses bare elements instead of Button /
// IconButton / CopyButton: those resolve icons through the registry and render an
// ErrorMessage of their own when it is empty, which is exactly the state a broken app is
// often in. Importing them here would let one missing icon recurse into an infinite tree.

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, isDev }) => {
  const showPanel = resolveDevMode(isDev);
  const report = buildErrorReport(error);
  const [copied, setCopied] = useState(false);
  // Ref-gated so a re-render (or React 18 StrictMode's double effect) does not log the
  // same mistake twice and make one error look like two.
  const hasLogged = useRef(false);

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
      <p className="nxs-dev-error-headline">
        <span aria-hidden="true" className="nxs-dev-error-badge">
          nexious-library
        </span>
        {report.headline}
      </p>

      <p className="nxs-dev-error-received">
        Received <code>{report.prop}</code>: <code>{report.received}</code>
      </p>

      {report.hasSpec ? (
        // Open by default: the answer should be readable without a click. Collapsible so a
        // page throwing several of these does not become an unreadable wall.
        <details className="nxs-dev-error-details" open>
          <summary className="nxs-dev-error-summary">How {report.componentName} works</summary>

          {report.summary && <p className="nxs-dev-error-text">{report.summary}</p>}

          {report.props.length > 0 && (
            <dl className="nxs-dev-error-props">
              {report.props.map((prop) => (
                <div className="nxs-dev-error-prop" key={prop.name}>
                  <dt>
                    <code className="nxs-dev-error-prop-name">{prop.name}</code>
                    <span className="nxs-dev-error-prop-type">{prop.type}</span>
                    {prop.required && <span className="nxs-dev-error-required">required</span>}
                  </dt>
                  <dd>
                    {prop.shape && <code className="nxs-dev-error-shape">{prop.shape}</code>}
                    <span className="nxs-dev-error-prop-desc">{prop.description}</span>
                  </dd>
                </div>
              ))}
            </dl>
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
            <>
              <span className="nxs-dev-error-label">Common causes</span>
              <ul className="nxs-dev-error-fixes">
                {report.fixes.map((fix) => (
                  <li key={fix}>{fix}</li>
                ))}
              </ul>
            </>
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
        Full API reference for {report.componentName} →
      </a>
    </div>
  );
};
export default ErrorMessage;
