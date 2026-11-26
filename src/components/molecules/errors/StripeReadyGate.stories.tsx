import type { Meta, StoryObj } from "@storybook/react";
import StripeReadyGate from "./StripeReadyGate";

// StripeReadyGate (2026-11 item 337, Phase 5): the no store and unfinished Stripe states in front
// of a money surface. It decides nothing; the caller passes the store facts and the copy.
const meta: Meta<typeof StripeReadyGate> = {
  title: "Molecules/StripeReadyGate",
  component: StripeReadyGate,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StripeReadyGate>;

const copy = {
  storeMissingTitle: "Set up your store first",
  storeMissingBody: "Memberships are sold through your store.",
  storeMissingAction: "Set up store",
  stripeTitle: "Finish setting up Stripe",
  stripeBody: "Until Stripe is finished, nothing here can take payments.",
  stripeAction: "Finish Stripe",
};
const renderContent = (isViewOnly: boolean) => <p>{isViewOnly ? "Your plans, view only" : "Your plans"}</p>;
const baseArgs = { setUpStorePath: "#store", finishStripe: () => undefined, copy, children: renderContent };

export const NoStore: Story = {
  args: { ...baseArgs, storeMissing: true, storeNotReady: false },
};

export const StripeUnfinished: Story = {
  args: { ...baseArgs, storeMissing: false, storeNotReady: true },
};

export const Ready: Story = {
  args: { ...baseArgs, storeMissing: false, storeNotReady: false },
};
