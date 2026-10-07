/**
 * The five isometric plates of the teardown drawing, top to bottom in DOM order: data-k 4 (Product)
 * is first/lowest in the stack and data-k 0 (Interface) is last/on top.
 *
 * Each plate is its own composited <svg> so the scroll script (lib/enhance/teardown.ts) can move it
 * with translate3d without repainting the others. `style` sets each plate's resting position inside
 * the 470x410 drawing box. The `.veil` polygon is the opaque dimmer that fades the non-active plates.
 * Colours come from the CSS tokens (var(--ink), var(--paper), var(--accent)...).
 */
export function Plates() {
  return (
    <>
      <svg
        className="pl"
        data-k="4"
        viewBox="-175 -62 350 132"
        aria-hidden="true"
        focusable="false"
        style={
          {
            left: "11.7021%",
            top: "68.7805%",
            width: "74.4681%",
            height: "32.1951%",
          } as React.CSSProperties
        }
      >
        <g transform="scale(.9)">
          <polygon
            points="0,-59 182,0 0,59 -182,0"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="1.6"
            strokeDasharray="7 6"
            vectorEffect="non-scaling-stroke"
          />
          <g transform="matrix(.866 .28 -.866 .28 0 0)">
            <g fill="none" stroke="var(--ink)" strokeWidth="1.7" strokeLinejoin="round">
              <circle cx="-84" cy="-64" r="7" fill="var(--ink)" />
              <path d="M-77 -64 H-58" />
              <rect x="-58" y="-76" width="40" height="24" fill="var(--paper)" />
              <path d="M-18 -64 H6" />
              <path d="M28 -88 L50 -64 L28 -40 L6 -64 Z" fill="var(--paper)" />
              <path d="M50 -64 H62" />
              <rect x="62" y="-76" width="34" height="24" fill="var(--paper)" />
              <path d="M28 -40 V-10" />
              <rect
                x="6"
                y="-10"
                width="44"
                height="26"
                fill="var(--accent)"
                stroke="var(--accent)"
              />
              <path d="M6 -52 L-34 -22" strokeDasharray="5 4" />
              <rect x="-92" y="-22" width="62" height="26" strokeDasharray="5 4" />
              <path d="M-30 -9 H-8" strokeDasharray="5 4" />
              <path d="M28 16 V46" />
              <circle cx="28" cy="54" r="8" fill="var(--ink)" />
              <path d="M-92 60 H-40 M-92 72 H-60" strokeOpacity=".5" />
            </g>
          </g>
          <polygon
            className="veil"
            points="-182,0 0,-59 182,0 182,8 0,67 -182,8"
            fill="var(--paper)"
            opacity="0"
          />
        </g>
      </svg>
      <svg
        className="pl"
        data-k="3"
        viewBox="-175 -62 350 132"
        aria-hidden="true"
        focusable="false"
        style={
          {
            left: "11.7021%",
            top: "51.7073%",
            width: "74.4681%",
            height: "32.1951%",
          } as React.CSSProperties
        }
      >
        <g transform="scale(.9)">
          <polygon points="-182,0 0,59 0,67 -182,8" fill="#000" fillOpacity=".78" />
          <polygon points="0,59 182,0 182,8 0,67" fill="#000" fillOpacity=".92" />
          <polygon points="0,-59 182,0 0,59 -182,0" fill="var(--ink)" />
          <g transform="matrix(.866 .28 -.866 .28 0 0)">
            <circle cx="-82" cy="-72" r="9" fill="none" stroke="var(--paper)" strokeWidth="1.6" />
            <circle cx="-82" cy="-44" r="9" fill="none" stroke="var(--paper)" strokeWidth="1.6" />
            <circle cx="-82" cy="-16" r="9" fill="none" stroke="var(--paper)" strokeWidth="1.6" />
            <circle cx="-82" cy="-72" r="3" fill="var(--paper)" />
            <circle cx="-82" cy="-44" r="3" fill="var(--paper)" />
            <circle cx="-82" cy="-16" r="3" fill="var(--paper)" />
            <path
              d="M-72 -72 L-32 -48 M-72 -44 H-32 M-72 -16 L-32 -40"
              stroke="var(--paper)"
              strokeWidth="1.5"
              fill="none"
            />
            <rect x="-32" y="-64" width="56" height="48" fill="var(--paper)" />
            <rect x="-26" y="-58" width="32" height="8" fill="var(--ink)" />
            <rect x="-26" y="-46" width="44" height="5" fill="var(--ink)" fillOpacity="0.45" />
            <rect x="-26" y="-37" width="36" height="5" fill="var(--ink)" fillOpacity="0.45" />
            <rect x="-26" y="-28" width="40" height="5" fill="var(--ink)" fillOpacity="0.45" />
            <path
              d="M24 -44 L52 -64 M24 -40 L52 -28"
              stroke="var(--paper)"
              strokeWidth="1.5"
              fill="none"
            />
            <rect
              x="52"
              y="-76"
              width="44"
              height="22"
              fill="none"
              stroke="var(--paper)"
              strokeWidth="1.5"
            />
            <text
              className="t"
              x="74"
              y="-61"
              fontSize="11"
              textAnchor="middle"
              fill="var(--paper)"
            >
              Next
            </text>
            <rect
              x="52"
              y="-38"
              width="44"
              height="22"
              fill="none"
              stroke="var(--paper)"
              strokeWidth="1.5"
            />
            <text
              className="t"
              x="74"
              y="-23"
              fontSize="11"
              textAnchor="middle"
              fill="var(--paper)"
            >
              Nuxt
            </text>
            <rect x="-96" y="16" width="92" height="28" fill="var(--paper)" fillOpacity="0.92" />
            <rect x="0" y="16" width="96" height="28" fill="var(--paper)" fillOpacity="0.5" />
            <rect x="-96" y="50" width="52" height="36" fill="var(--paper)" fillOpacity="0.5" />
            <rect x="-40" y="50" width="136" height="36" fill="var(--paper)" fillOpacity="0.92" />
            <rect x="-90" y="22" width="40" height="6" fill="var(--ink)" />
            <rect x="-90" y="32" width="60" height="4" fill="var(--ink)" fillOpacity="0.4" />
            <rect x="6" y="22" width="50" height="6" fill="var(--ink)" fillOpacity="0.5" />
            <rect x="-34" y="56" width="60" height="6" fill="var(--ink)" />
            <rect x="-34" y="66" width="100" height="4" fill="var(--ink)" fillOpacity="0.4" />
          </g>
          <polygon
            className="veil"
            points="-182,0 0,-59 182,0 182,8 0,67 -182,8"
            fill="var(--paper)"
            opacity="0"
          />
        </g>
      </svg>
      <svg
        className="pl"
        data-k="2"
        viewBox="-175 -62 350 132"
        aria-hidden="true"
        focusable="false"
        style={
          {
            left: "11.7021%",
            top: "34.6341%",
            width: "74.4681%",
            height: "32.1951%",
          } as React.CSSProperties
        }
      >
        <g transform="scale(.9)">
          <polygon points="-182,0 0,59 0,67 -182,8" fill="#8C8C84" fillOpacity=".78" />
          <polygon points="0,59 182,0 182,8 0,67" fill="#8C8C84" fillOpacity=".92" />
          <polygon
            points="0,-59 182,0 0,59 -182,0"
            fill="var(--paper3)"
            stroke="var(--ink)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          <g transform="matrix(.866 .28 -.866 .28 0 0)">
            <rect x="-96" y="-94" width="136" height="18" fill="var(--ink)" />
            <rect x="-90" y="-88" width="24" height="6" fill="var(--paper)" />
            <rect x="-60" y="-88" width="40" height="6" fill="var(--paper)" fillOpacity="0.6" />
            <rect x="-14" y="-88" width="40" height="6" fill="var(--paper)" fillOpacity="0.6" />
            <rect
              x="-96"
              y="-76"
              width="32"
              height="18"
              fill="var(--accent)"
              stroke="var(--ink)"
              strokeWidth="1.1"
            />
            <rect
              x="-64"
              y="-76"
              width="52"
              height="18"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="1.1"
            />
            <rect
              x="-12"
              y="-76"
              width="52"
              height="18"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="1.1"
            />
            <rect
              x="-96"
              y="-58"
              width="32"
              height="18"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="1.1"
            />
            <rect
              x="-64"
              y="-58"
              width="52"
              height="18"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="1.1"
            />
            <rect
              x="-12"
              y="-58"
              width="52"
              height="18"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="1.1"
            />
            <rect
              x="-96"
              y="-40"
              width="32"
              height="18"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="1.1"
            />
            <rect
              x="-64"
              y="-40"
              width="52"
              height="18"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="1.1"
            />
            <rect
              x="-12"
              y="-40"
              width="52"
              height="18"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="1.1"
            />
            <rect
              x="-96"
              y="-22"
              width="32"
              height="18"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="1.1"
            />
            <rect
              x="-64"
              y="-22"
              width="52"
              height="18"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="1.1"
            />
            <rect
              x="-12"
              y="-22"
              width="52"
              height="18"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="1.1"
            />
            <rect x="8" y="22" width="88" height="14" fill="var(--ink)" />
            <rect x="14" y="26" width="28" height="6" fill="var(--paper)" fillOpacity="0.7" />
            <rect
              x="8"
              y="36"
              width="28"
              height="16"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="1.1"
            />
            <rect
              x="36"
              y="36"
              width="60"
              height="16"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="1.1"
            />
            <rect
              x="8"
              y="52"
              width="28"
              height="16"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="1.1"
            />
            <rect
              x="36"
              y="52"
              width="60"
              height="16"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="1.1"
            />
            <rect
              x="8"
              y="68"
              width="28"
              height="16"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="1.1"
            />
            <rect
              x="36"
              y="68"
              width="60"
              height="16"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="1.1"
            />
            <path d="M-80 -4 V44 H8" fill="none" stroke="var(--accent)" strokeWidth="2.2" />
            <circle cx="-80" cy="-4" r="3.6" fill="var(--accent)" />
            <circle cx="8" cy="44" r="3.6" fill="var(--accent)" />
            <rect
              x="-96"
              y="22"
              width="86"
              height="62"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="1.1"
              strokeDasharray="4 4"
              strokeOpacity=".0"
            />
          </g>
          <polygon
            className="veil"
            points="-182,0 0,-59 182,0 182,8 0,67 -182,8"
            fill="var(--paper)"
            opacity="0"
          />
        </g>
      </svg>
      <svg
        className="pl"
        data-k="1"
        viewBox="-175 -62 350 132"
        aria-hidden="true"
        focusable="false"
        style={
          {
            left: "11.7021%",
            top: "17.5610%",
            width: "74.4681%",
            height: "32.1951%",
          } as React.CSSProperties
        }
      >
        <g transform="scale(.9)">
          <polygon points="-182,0 0,59 0,67 -182,8" fill="#1A2BCC" fillOpacity=".78" />
          <polygon points="0,59 182,0 182,8 0,67" fill="#1A2BCC" fillOpacity=".92" />
          <polygon points="0,-59 182,0 0,59 -182,0" fill="var(--accent)" />
          <g transform="matrix(.866 .28 -.866 .28 0 0)">
            <rect x="-96" y="-92" width="36" height="18" fill="var(--paper)" />
            <text
              className="t"
              x="-78"
              y="-79"
              fontSize="10.5"
              textAnchor="middle"
              fill="var(--accent)"
            >
              GET
            </text>
            <rect x="-54" y="-88" width="70" height="10" fill="var(--paper)" fillOpacity="0.55" />
            <rect
              x="36"
              y="-92"
              width="60"
              height="18"
              fill="none"
              stroke="var(--paper)"
              strokeWidth="1.4"
            />
            <text
              className="t"
              x="66"
              y="-79"
              fontSize="10.5"
              textAnchor="middle"
              fill="var(--paper)"
            >
              200
            </text>
            <rect x="-96" y="-66" width="36" height="18" fill="var(--paper)" />
            <text
              className="t"
              x="-78"
              y="-53"
              fontSize="10.5"
              textAnchor="middle"
              fill="var(--accent)"
            >
              POST
            </text>
            <rect x="-54" y="-62" width="70" height="10" fill="var(--paper)" fillOpacity="0.55" />
            <rect
              x="36"
              y="-66"
              width="60"
              height="18"
              fill="none"
              stroke="var(--paper)"
              strokeWidth="1.4"
            />
            <text
              className="t"
              x="66"
              y="-53"
              fontSize="10.5"
              textAnchor="middle"
              fill="var(--paper)"
            >
              201
            </text>
            <rect x="-96" y="-40" width="36" height="18" fill="var(--paper)" />
            <text
              className="t"
              x="-78"
              y="-27"
              fontSize="10.5"
              textAnchor="middle"
              fill="var(--accent)"
            >
              GET
            </text>
            <rect x="-54" y="-36" width="70" height="10" fill="var(--paper)" fillOpacity="0.55" />
            <rect
              x="36"
              y="-40"
              width="60"
              height="18"
              fill="none"
              stroke="var(--paper)"
              strokeWidth="1.4"
            />
            <text
              className="t"
              x="66"
              y="-27"
              fontSize="10.5"
              textAnchor="middle"
              fill="var(--paper)"
            >
              401
            </text>
            <rect
              x="-96"
              y="-6"
              width="192"
              height="92"
              fill="none"
              stroke="var(--paper)"
              strokeWidth="1.3"
              strokeDasharray="5 4"
            />
            <text className="t" x="-88" y="26" fontSize="30" fill="var(--paper)">
              {"{"}
            </text>
            <text className="t" x="76" y="26" fontSize="30" fill="var(--paper)">
              {"}"}
            </text>
            <rect x="-70" y="8" width="64" height="7" fill="var(--paper)" />
            <rect x="-70" y="22" width="100" height="7" fill="var(--paper)" fillOpacity="0.55" />
            <rect x="-70" y="36" width="80" height="7" fill="var(--paper)" fillOpacity="0.55" />
            <rect x="-70" y="50" width="92" height="7" fill="var(--paper)" fillOpacity="0.55" />
            <rect x="-70" y="64" width="52" height="7" fill="var(--paper)" />
          </g>
          <polygon
            className="veil"
            points="-182,0 0,-59 182,0 182,8 0,67 -182,8"
            fill="var(--paper)"
            opacity="0"
          />
        </g>
      </svg>
      <svg
        className="pl"
        data-k="0"
        viewBox="-175 -62 350 132"
        aria-hidden="true"
        focusable="false"
        style={
          {
            left: "11.7021%",
            top: "0.4878%",
            width: "74.4681%",
            height: "32.1951%",
          } as React.CSSProperties
        }
      >
        <g transform="scale(.9)">
          <polygon points="-182,0 0,59 0,67 -182,8" fill="#9A9A92" fillOpacity=".78" />
          <polygon points="0,59 182,0 182,8 0,67" fill="#9A9A92" fillOpacity=".92" />
          <polygon
            points="0,-59 182,0 0,59 -182,0"
            fill="var(--paper)"
            stroke="var(--ink)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          <g transform="matrix(.866 .28 -.866 .28 0 0)">
            <rect x="-96" y="-96" width="192" height="16" fill="var(--ink)" />
            <circle cx="-88" cy="-88" r="2.6" fill="var(--paper)" />
            <circle cx="-79" cy="-88" r="2.6" fill="var(--paper)" />
            <circle cx="-70" cy="-88" r="2.6" fill="var(--paper)" />
            <rect x="40" y="-91" width="14" height="5" fill="var(--paper)" fillOpacity="0.6" />
            <rect x="60" y="-91" width="14" height="5" fill="var(--paper)" fillOpacity="0.6" />
            <rect x="80" y="-91" width="10" height="5" fill="var(--paper)" fillOpacity="0.6" />
            <rect x="-92" y="-68" width="104" height="16" fill="var(--ink)" />
            <rect x="-92" y="-46" width="76" height="16" fill="var(--ink)" />
            <rect x="-92" y="-20" width="92" height="5" fill="var(--ink)" fillOpacity="0.35" />
            <rect x="-92" y="-10" width="70" height="5" fill="var(--ink)" fillOpacity="0.35" />
            <rect x="-92" y="6" width="46" height="16" fill="var(--accent)" />
            <rect
              x="26"
              y="-68"
              width="66"
              height="56"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="1.3"
            />
            <path
              d="M26 -68L92 -12M92 -68L26 -12"
              stroke="var(--ink)"
              strokeWidth="1"
              opacity=".5"
              fill="none"
            />
            <rect
              x="-92"
              y="38"
              width="56"
              height="52"
              fill="var(--paper)"
              stroke="var(--ink)"
              strokeWidth="1.3"
            />
            <rect
              x="-30"
              y="38"
              width="56"
              height="52"
              fill="var(--paper)"
              stroke="var(--ink)"
              strokeWidth="1.3"
            />
            <rect
              x="32"
              y="38"
              width="60"
              height="52"
              fill="var(--paper)"
              stroke="var(--ink)"
              strokeWidth="1.3"
            />
            <rect x="-86" y="44" width="44" height="22" fill="var(--ink)" fillOpacity="0.14" />
            <rect x="-24" y="44" width="44" height="22" fill="var(--ink)" fillOpacity="0.14" />
            <rect x="38" y="44" width="48" height="22" fill="var(--ink)" fillOpacity="0.14" />
            <rect x="-86" y="72" width="32" height="4" fill="var(--ink)" fillOpacity="0.5" />
            <rect x="-24" y="72" width="32" height="4" fill="var(--ink)" fillOpacity="0.5" />
            <rect x="38" y="72" width="36" height="4" fill="var(--ink)" fillOpacity="0.5" />
          </g>
          <polygon
            className="veil"
            points="-182,0 0,-59 182,0 182,8 0,67 -182,8"
            fill="var(--paper)"
            opacity="0"
          />
        </g>
      </svg>
    </>
  );
}
