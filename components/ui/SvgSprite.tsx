/** Defines the shared `#i-arrow` symbol once. Rendered at the top of <body>. */
export function SvgSprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <symbol id="i-arrow" viewBox="0 0 24 24">
          <path d="M3 12h17" />
          <path d="m13 5 7 7-7 7" />
        </symbol>
      </defs>
    </svg>
  );
}
