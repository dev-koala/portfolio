import { aboutCopy, depth, enjoy, principles } from "@/data/about";
import { cssVar, d } from "@/lib/utils";

export function About() {
  return (
    <section
      className="sec about"
      id="about"
      aria-labelledby="about-h"
      data-sec="02 About"
      style={{ paddingTop: 0 }}
    >
      <div className="g">
        <p className="label">
          <span className="n">02</span>About
        </p>
        {/* `.mkr` is the accent highlighter under the two key phrases. */}
        <h2 className="statement rv" id="about-h">
          I started in the frontend and <span className="mkr">kept following the problem down</span>
          : into APIs, databases, CMS architecture, authentication and data flows, and out the other
          side into <span className="mkr">product decisions</span>.
        </h2>
        <div className="about-copy fd">
          {aboutCopy.map((t) => (
            <p key={t}>{t}</p>
          ))}
          <p className="enjoy">{enjoy}</p>
        </div>
        <div className="depth fd" style={d(2)}>
          <h3>How far down the work goes</h3>
          <ul>
            {depth.map((t, k) => (
              <li style={cssVar("--k", k)} key={t}>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="princ fd">
          {principles.map((p) => (
            <div key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
