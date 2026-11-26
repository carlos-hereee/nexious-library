import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import LegalConsentCheckbox from "./LegalConsentCheckbox";

// LegalConsentCheckbox (2026-11 item 337, Phase 5): the agreement sentence built from separate
// strings with real links. The words here are placeholders; the caller passes its own legal copy.
const meta: Meta<typeof LegalConsentCheckbox> = {
  title: "Molecules/LegalConsentCheckbox",
  component: LegalConsentCheckbox,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LegalConsentCheckbox>;

const sentence = {
  prefix: "I agree to the",
  terms: { label: "Terms", href: "#terms" },
  join: "and the",
  privacy: { label: "Privacy Policy", href: "#privacy" },
};

const Controlled = () => {
  const [isChecked, setChecked] = useState(false);
  return <LegalConsentCheckbox {...sentence} checked={isChecked} onChange={setChecked} />;
};

export const Interactive: Story = { render: () => <Controlled /> };

export const WithError: Story = {
  args: { ...sentence, checked: false, onChange: () => undefined, error: "Agree to continue" },
};
