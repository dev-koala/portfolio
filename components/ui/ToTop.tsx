import { Arrow } from "./Arrow";

/**
 * Fixed "Back to top" link, on every page (rendered from the layout). A plain anchor to `#main`, so it
 * works without scripts; lib/enhance/to-top.ts hides it near the top and scrolls smoothly on click.
 */
export function ToTop() {
  return (
    <a className="to-top" href="#main" aria-label="Back to top">
      <Arrow />
    </a>
  );
}
