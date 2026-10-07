import {
  teardownAria,
  teardownHeading,
  teardownHint,
  teardownIntro,
  teardownLayers,
} from "@/data/teardown";
import { projectIndex, projects } from "@/data/projects";
import { Plates } from "./Plates";

/**
 * "How far down the work goes": markup only. The behaviour (pinning, spreading the plates,
 * switching cards) is in lib/enhance/teardown.ts. `anat-live` is rendered on the server so the
 * pinned layout is there before hydration; the script removes it for reduced motion.
 */
export function Teardown() {
  return (
    <section
      className="anat anat-live"
      id="anatomy"
      aria-labelledby="anat-h"
      data-sec="How it’s built"
    >
      <div className="anat-pin">
        <div className="anat-head">
          <h2 id="anat-h">
            <span className="n">↓</span>
            {teardownHeading}
          </h2>
          <p className="hint" id="an-hint">
            {teardownHint}
          </p>
        </div>
        <div className="anat-stage" id="an-stage">
          <div className="pa an" id="an" role="img" aria-label={teardownAria}>
            <Plates />
            <ul className="an-tags" aria-hidden="true">
              {teardownLayers.map((l) => (
                <li className="an-tag" key={l.tag}>
                  {l.tag}
                </li>
              ))}
            </ul>
          </div>
          <div className="an-cards" id="an-cards">
            <article className="an-card on intro" data-i="-1">
              <p className="an-n">
                <span>00</span>Start
              </p>
              <h3>{teardownIntro.title}</h3>
              <ul>
                {teardownIntro.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </article>
            {teardownLayers.map((l, i) => (
              <article className="an-card" data-i={i} aria-labelledby={`anc-${i}`} key={l.tag}>
                <p className="an-n">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {l.label}
                </p>
                <h3 id={`anc-${i}`}>{l.title}</h3>
                <ul>
                  {l.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <p className="an-seen">
                  <span>Seen in</span>
                  {l.seen.map((slug) => (
                    <button
                      type="button"
                      className="an-link"
                      data-open={projectIndex(slug)}
                      key={slug}
                    >
                      {projects[projectIndex(slug)].name}
                    </button>
                  ))}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
