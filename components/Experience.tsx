import { experience } from "@/data/experience";
import { Fragment } from "react";

/** Experience: one big row per role. The second row gets `.b` for its own spacing hook. */
export function Experience() {
  return (
    <section
      className="sec"
      id="experience"
      aria-labelledby="exp-h"
      data-sec="03 Experience"
      style={{ paddingTop: 0 }}
    >
      <div className="g xp-head">
        <p className="label">
          <span className="n">03</span>
          <span id="exp-h">Experience</span>
        </p>
      </div>
      {experience.map((e, i) => (
        <div className={`g xp${i > 0 ? " b" : ""} rv`} key={e.org.join(" ")}>
          <p className="when">{e.when}</p>
          <h3>
            <span className="mk">
              <span>
                {e.org.map((line, k) => (
                  <Fragment key={line}>
                    {k > 0 && <br />}
                    {line}
                  </Fragment>
                ))}
              </span>
            </span>
          </h3>
          <div className="info fd">
            <p className="role">{e.role}</p>
            <p className="foc">{e.focus}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
