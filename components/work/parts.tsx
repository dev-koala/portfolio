import type { Project } from "@/data/projects";
import { projectIndex } from "@/data/projects";
import { Arrow } from "@/components/ui/Arrow";

/** The caption row above each project: number, type, status. */
export function Cap({ p }: { p: Project }) {
  return (
    <div className="pcap">
      <span className="n">{p.num}</span>
      <span>{p.type}</span>
      <span>{p.status}</span>
    </div>
  );
}

/** Project title as a button that opens the case study. The ::after on `.open` makes the whole card clickable. */
export function Title({ p, children }: { p: Project; children?: React.ReactNode }) {
  return (
    <h3 className="ptitle">
      <button className="open" type="button" data-open={projectIndex(p.slug)}>
        <span className="tt">{children ?? p.name}</span>
      </button>
    </h3>
  );
}

export function Facts({ p }: { p: Project }) {
  return (
    <dl className="facts">
      {p.featured!.facts.map(([dt, dd]) => (
        <div key={dt}>
          <dt>{dt}</dt>
          <dd>{dd}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Decorative "Read the case study" link. The real click target is the title button. */
export function ReadMore() {
  return (
    <span className="more">
      Read the case study <Arrow />
    </span>
  );
}
