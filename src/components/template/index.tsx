// The barrel behind the `nexious-library/@nxs-template` export subpath.
//
// Why it is being added now, in Phase 5: package.json has declared that subpath since the exports
// map was written, pointing at dist/esm/components/template/index.js and its .d.ts, and NEITHER
// FILE HAS EVER EXISTED. atoms, molecules and organism each have a barrel; template did not, so
// any consumer following the exports map to `nexious-library/@nxs-template` got a module-not-found.
// nexious-client happens never to use that path, which is the only reason it went unnoticed.
// `npm pack --dry-run` plus a check that every declared entry resolves is what surfaced it.
//
// **This adds no new public API.** Every name below is already exported from main.ts, so the
// package promises exactly what it promised before; it just now delivers it by the second path
// too. HoursOfOperation is deliberately absent for that reason: main.ts does not export it, and
// making it public is a decision, not a repair.
export { default as Calendar } from "@nxs-template/Calendar";
export { default as CalendarEvents } from "@nxs-template/CalendarEvents";
export { default as Dialog } from "@nxs-template/Dialog";
export { default as DialogOverlay } from "@nxs-template/DialogOverlay";
export { default as Footer } from "@nxs-template/Footer";
export { default as Form } from "@nxs-template/Form";
export { default as Header } from "@nxs-template/Header";
export { default as ItemDetail } from "@nxs-template/ItemDetail";
export { default as PaginateForm } from "@nxs-template/PaginateForm";
export { default as Socials } from "@nxs-template/Socials";

export type { DialogOverlayProps } from "@nxs-template/DialogOverlay";
