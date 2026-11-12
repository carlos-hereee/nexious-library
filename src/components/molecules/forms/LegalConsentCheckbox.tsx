// Reuse record: companyuno-growth/product-planning/DESIGNS/reusable-components/legal-consent-checkbox/README.md
// The agreement checkbox, ported from nexious-client's components/legal/LegalConsentCheckbox.tsx
// (2026-11 item 337, Phase 5). The client read the sentence and the two routes from i18n and the
// router; here every word and both hrefs arrive from the caller, so the library makes no legal
// claim of its own and the signup and re-consent surfaces keep passing the same sentence.
import { useId } from "react";
import { safeUrl } from "@nxs-utils/data/safeUrl";
import type { LegalConsentCheckboxProps, LegalConsentLink } from "nxs-form";

/** One policy link: the caller's router link (receiving `to`) or a plain anchor. */
const PolicyLink = ({ link, linkComponent: LinkComponent }: { link: LegalConsentLink; linkComponent?: React.ElementType }) => {
  const href = safeUrl(link.href);
  return LinkComponent ? <LinkComponent to={href}>{link.label}</LinkComponent> : <a href={href}>{link.label}</a>;
};

/**
 * Component: LegalConsentCheckbox
 *
 * A checkbox and a label composed from separate strings with real links between them, rather than
 * one interpolated sentence: markup inside one string ships as dead text or needs raw HTML, and a
 * translator must be able to move the joining words without touching the links. The error is an
 * alert tied to the input, because the reader pressed submit and nothing visibly happened.
 */
const LegalConsentCheckbox = (props: LegalConsentCheckboxProps) => {
  const { checked, onChange, prefix, terms, join, privacy, linkComponent, error, className } = props;
  const { inputId: callerInputId, errorId: callerErrorId } = props;
  const generatedId = useId();
  const inputId = callerInputId ?? `${generatedId}-input`;
  const errorId = callerErrorId ?? `${generatedId}-error`;

  return (
    <div className={className ? `nxs-consent ${className}` : "nxs-consent"}>
      <div className="nxs-consent-row">
        <input
          id={inputId}
          type="checkbox"
          className="nxs-consent-input"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={error ? true : undefined}
        />
        <label className="nxs-consent-label" htmlFor={inputId}>
          {prefix} <PolicyLink link={terms} linkComponent={linkComponent} /> {join}{" "}
          <PolicyLink link={privacy} linkComponent={linkComponent} />
        </label>
      </div>
      {error ? (
        <p className="nxs-consent-error" id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default LegalConsentCheckbox;
