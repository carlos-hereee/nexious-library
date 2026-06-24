import type { Meta, StoryObj } from "@storybook/react";
import MerchCard from "./MerchCard";

/**
 * MerchCard renders a storefront product card (hero, title, description, price,
 * stock) with cart actions.
 *
 * Gotchas (the things that bite you):
 * - The "+ add to cart" CTA only renders when `onAddToCart` IS provided AND
 *   `data.inStock` is a number > 0. Forget `onAddToCart` and the button is
 *   silently absent (no error); set `inStock` to 0 and it shows "SOLD OUT".
 * - `canRemove` + `onRemoveFromCart` flips the card into cart-line mode: it shows
 *   a "- remove from cart" CTA instead of add-to-cart.
 * - `hideButtons` is read-only/preview mode: no cart buttons, and the price is
 *   prefixed with "Price: ". In that mode a MISSING `data` renders the literal
 *   "Missing data" (the only place the card guards an absent data prop).
 * - In the normal (buttoned) mode the whole card body is wrapped in a `<button>`
 *   with `onClick`, so do not nest interactive children inside it.
 * - Falsy `data.inStock` renders "OUT OF STOCK"; an absent `data.cost` renders "$0".
 */
const meta: Meta<typeof MerchCard> = {
  title: "Organism/MerchCard",
  component: MerchCard,
  tags: ["autodocs"],
  argTypes: {
    theme: { control: "text" },
    canRemove: { control: "boolean" },
    hideButtons: { control: "boolean" },
    onAddToCart: { action: "add-to-cart" },
    onRemoveFromCart: { action: "remove-from-cart" },
    onClick: { action: "card-click" },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 320, padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MerchCard>;

const inStockData = {
  title: "Hand-thrown mug",
  description: "Stoneware, dishwasher safe, holds 12oz.",
  cost: 28,
  inStock: 7,
};

/** Default: in stock with an add-to-cart handler, so the "+ add to cart" CTA shows. */
export const Default: Story = {
  args: { data: inStockData, onAddToCart: () => {} },
};

/** Out of stock: inStock 0 with onAddToCart still renders, but as "SOLD OUT". */
export const SoldOut: Story = {
  args: { data: { ...inStockData, inStock: 0 }, onAddToCart: () => {} },
};

/** Cart line: canRemove + onRemoveFromCart swaps in the "- remove from cart" CTA. */
export const InCart: Story = {
  name: "In cart (remove)",
  args: { data: inStockData, canRemove: true, onRemoveFromCart: () => {} },
};

/** Read-only preview: hideButtons drops the cart CTAs and prefixes the price with "Price: ". */
export const ReadOnly: Story = {
  name: "Read-only (hideButtons)",
  args: { data: inStockData, hideButtons: true },
};

/** No handlers: without onAddToCart/canRemove the buttons row renders empty (silent). */
export const NoHandlers: Story = {
  name: "No handlers (empty actions)",
  args: { data: inStockData },
};
