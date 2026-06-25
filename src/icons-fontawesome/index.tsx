import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { registerIcons } from "@nxs-atoms";
import type { IconComponent, IconRegistry, IconRenderProps } from "@nxs-atoms";
import { faMap } from "./faMap";

// Optional fontawesome adapter, published at the "nexious-library/fontawesome-icons"
// subpath. An app that wants the exact pre-v4 look registers this set at boot for zero
// visual change. This is the only module that imports fontawesome, attaching the (still
// optional) peer deps to itself rather than the core.

// Wrap one fontawesome icon object as a registry component matching the library's render
// contract. spin/pulse map to fontawesome's own props so the look is identical to the
// former Icon.tsx (<FontAwesomeIcon icon={svg[key]} spin pulse />).
const toComponent = (def: IconDefinition): IconComponent => {
  const FaIcon: IconComponent = ({ size, spin, color, className }: IconRenderProps) => (
    <FontAwesomeIcon
      icon={def}
      size={size || "1x"}
      className={className}
      color={color}
      spin={spin === "spin"}
      pulse={spin === "pulse"}
    />
  );
  return FaIcon;
};

export const fontawesomeIcons: IconRegistry = Object.fromEntries(
  Object.entries(faMap).map(([key, def]): [string, IconComponent] => [key, toComponent(def)])
);

/** Register the fontawesome-backed icon set. Call once at app boot. */
export function registerFontawesomeIcons(): void {
  registerIcons(fontawesomeIcons);
}
