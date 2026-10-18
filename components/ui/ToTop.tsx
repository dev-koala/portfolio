import { Arrow } from "./Arrow";

/**
 * Fixed "Back to top" link. A plain anchor to the hero (`#top`), so it works without scripts;
 * lib/enhance/to-top.ts only hides it until the hero has scrolled away.
 */
export function ToTop() {
  return (
    <a className="to-top" href="#top" aria-label="Back to top">
      <Arrow />
    </a>
  );
}
