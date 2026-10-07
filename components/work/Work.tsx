import { moreWork, projectIndex, projects } from "@/data/projects";
import { d } from "@/lib/utils";
import { Arrow } from "@/components/ui/Arrow";
import {
  BeaconSection,
  CmsSection,
  DolphinsSection,
  StaffingSection,
  VoltSection,
} from "./Projects";

/** "Selected work": the intro, the five featured projects, then the "More work" list. */
export function Work() {
  return (
    <section
      className="sec"
      id="work"
      aria-labelledby="work-h"
      data-sec="01 Selected work"
      style={{ paddingTop: "clamp(40px,6vw,96px)" }}
    >
      <div className="g work-head rv">
        <p className="label">
          <span className="n">01</span>Selected work
        </p>
        <h2 className="big" id="work-h">
          <span className="mk">
            <span>
              Work<sup>{projects.length}</sup>
            </span>
          </span>
        </h2>
        <p className="intro fd" style={d(2)}>
          Five projects, shown the way I think about them: as a system, a route, a ledger, a set of
          modules, a map of paper-based work. Three more below, from AmaliTech and client work. The
          stack comes later. It matters less.
        </p>
      </div>

      <VoltSection />
      <StaffingSection />
      <BeaconSection />
      <CmsSection />
      <DolphinsSection />

      <div className="g more-work" id="more-work" aria-labelledby="mw-h">
        <p className="label rv">
          <span className="n">+</span>
          <span id="mw-h">More work</span>
        </p>
        <ul className="mw">
          {moreWork.map((p, i) => (
            <li className="fd rv" style={d(i)} key={p.slug}>
              <button type="button" data-open={projectIndex(p.slug)}>
                <span className="n">{p.num}</span>
                <span className="nm">{p.name}</span>
                <span className="ty">{p.type}</span>
                <Arrow />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
