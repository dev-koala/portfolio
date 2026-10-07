/**
 * VoltGH drawing: a radius search (square = SQL bounding box, circle = Haversine radius) around a point,
 * plus a phone mockup. Class names (.v-box, .v-ring, .v-dot...) are animated by the "Selected work"
 * block in app/globals.css; `.par` is nudged by lib/enhance/parallax.ts via data-par.
 */
export function VoltArt() {
  return (
    <div className="art a-volt" data-art="">
      <div className="par" data-par=".05">
        <svg
          viewBox="0 0 1000 780"
          preserveAspectRatio="xMidYMid slice"
          role="img"
          aria-label="Radius search drawing: a bounding box and a Haversine radius around a point"
        >
          <rect width="1000" height="780" fill="var(--paper2)" />
          <g className="ring">
            <rect
              className="v-box"
              x="360"
              y="90"
              width="700"
              height="700"
              fill="none"
              stroke="var(--ink)"
              strokeOpacity=".5"
              strokeWidth="1.5"
              strokeDasharray="7 7"
            />
            <circle
              className="v-ring"
              pathLength="1"
              cx="700"
              cy="440"
              r="330"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="3"
            />
            <circle
              className="v-c2"
              cx="700"
              cy="440"
              r="220"
              fill="none"
              stroke="var(--ink)"
              strokeOpacity=".2"
            />
            <circle
              className="v-c3"
              cx="700"
              cy="440"
              r="110"
              fill="none"
              stroke="var(--ink)"
              strokeOpacity=".2"
            />
            <path
              className="v-cross"
              d="M370 440H1030M700 110V780"
              stroke="var(--ink)"
              strokeOpacity=".2"
            />
            <path
              className="v-cross v-sweep"
              d="M700 440L822 330"
              stroke="var(--ink)"
              strokeWidth="1.5"
              strokeDasharray="4 5"
            />
            <g fill="var(--ink)">
              <circle
                className="v-dot"
                style={{ "--i": "0" } as React.CSSProperties}
                cx="612"
                cy="300"
                r="9"
              />
              <circle
                className="v-dot"
                style={{ "--i": "1" } as React.CSSProperties}
                cx="822"
                cy="330"
                r="9"
              />
              <circle
                className="v-dot"
                style={{ "--i": "2" } as React.CSSProperties}
                cx="760"
                cy="580"
                r="9"
              />
              <circle
                className="v-dot"
                style={{ "--i": "3" } as React.CSSProperties}
                cx="560"
                cy="520"
                r="9"
              />
            </g>
            <g fill="var(--paper2)" stroke="var(--ink)" strokeWidth="2">
              <circle
                className="v-dot"
                style={{ "--i": "4" } as React.CSSProperties}
                cx="410"
                cy="150"
                r="8"
              />
              <circle
                className="v-dot"
                style={{ "--i": "5" } as React.CSSProperties}
                cx="990"
                cy="170"
                r="8"
              />
              <circle
                className="v-dot"
                style={{ "--i": "6" } as React.CSSProperties}
                cx="980"
                cy="700"
                r="8"
              />
            </g>
            <g fill="var(--ink)" fillOpacity=".3">
              <circle cx="210" cy="190" r="5" />
              <circle cx="270" cy="520" r="5" />
            </g>
            <circle
              className="v-pulse"
              cx="700"
              cy="440"
              r="22"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <g className="v-core">
              <circle cx="700" cy="440" r="22" fill="none" stroke="var(--accent)" strokeWidth="2" />
              <circle cx="700" cy="440" r="9" fill="var(--accent)" />
            </g>
            <text
              x="748"
              y="372"
              fontSize="26"
              fill="var(--ink)"
              style={{ fontFamily: "var(--display)" } as React.CSSProperties}
            >
              d
            </text>
          </g>
        </svg>
      </div>
      <div className="vphone" aria-hidden="true">
        <div className="vp-s">
          <svg className="vp-map" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <rect width="100" height="100" fill="var(--paper2)" />
            <path
              d="M0 62C20 50 40 70 62 52S90 42 100 48M30 0C34 30 22 60 36 100M72 0C66 26 80 54 70 100"
              fill="none"
              stroke="var(--paper3)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle
              cx="52"
              cy="52"
              r="24"
              fill="var(--accent)"
              fillOpacity=".12"
              stroke="var(--accent)"
              strokeWidth="1"
            />
            <g fill="var(--ink)">
              <circle cx="40" cy="40" r="3" />
              <circle cx="62" cy="46" r="3" />
              <circle cx="60" cy="66" r="3" />
              <circle cx="36" cy="62" r="3" />
            </g>
            <circle cx="52" cy="52" r="4" fill="var(--accent)" />
          </svg>
          <i className="vp-search" />
          <div className="vp-sheet">
            <i style={{ width: "58%" } as React.CSSProperties} />
            <i style={{ width: "36%" } as React.CSSProperties} />
            <u />
          </div>
        </div>
      </div>
    </div>
  );
}
