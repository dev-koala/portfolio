import { building, debugging, exploring } from "@/data/building";
import { d } from "@/lib/utils";

export function Building() {
  return (
    <section
      className="sec build"
      id="building"
      aria-labelledby="build-h"
      data-sec="05 Currently building"
    >
      <div className="g">
        <p className="label">
          <span className="n">05</span>
          <span id="build-h">Currently building</span>
        </p>
      </div>
      <ul className="bl" style={{ marginTop: 0 }}>
        {building.map((b, i) => (
          <li className="g" style={{ display: "grid" }} key={b.name}>
            <h3 className="rv">
              <span className="mk">
                <span style={i ? d(i) : undefined}>{b.name}</span>
              </span>
            </h3>
            <div className="fd" style={i ? d(i) : undefined}>
              <p className="d">{b.description}</p>
              <span className="prog">{b.status}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="g build-foot">
        <p className="explore fd">{exploring}</p>
        <p className="debug fd">
          <b>Currently debugging:</b> {debugging}
        </p>
      </div>
    </section>
  );
}
