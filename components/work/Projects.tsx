import type { Project } from "@/data/projects";
import { projectIndex, projects } from "@/data/projects";
import { VoltArt } from "./VoltArt";
import { DolphinsArt } from "./DolphinsArt";
import { Cap, Facts, ReadMore, Title } from "./parts";

const by = (slug: string): Project => projects[projectIndex(slug)];

/**
 * The five full-width "Selected work" sections. Each is a different drawing of the same idea,
 * and each has its own layout rules in app/globals.css (.volt, .staff, .beacon, .cms, .dol).
 * `data-i` is the project's index in data/projects.ts and is what the case study uses to find its art.
 */

export function VoltSection() {
  const p = by("voltgh");
  return (
    <article className="proj volt" data-i={projectIndex(p.slug)} aria-label={p.name}>
      <div className="g">
        <Cap p={p} />
        <VoltArt />
        <div className="ptext">
          <Title p={p} />
          <p className="plead">{p.featured!.lead}</p>
          <Facts p={p} />
          <ReadMore />
        </div>
      </div>
    </article>
  );
}

/** Staffing: a ledger of metrics with the values left blank on purpose. */
export function StaffingSection() {
  const p = by("staffing-analytics-dashboard");
  return (
    <article className="proj staff" data-i={projectIndex(p.slug)} aria-label={p.name}>
      <div className="g">
        <Cap p={p} />
        <div className="ptext">
          <Title p={p} />
          <p className="plead" style={{ marginTop: 20 }}>
            {p.featured!.lead}
          </p>
          <Facts p={p} />
          <ReadMore />
        </div>
        <div
          className="ledger"
          data-art=""
          role="group"
          aria-label="Staffing metrics layout with values intentionally blank"
        >
          <div className="tiers">
            <div className="tier t1">
              <b>Bronze</b>
              <span>raw, as it lands</span>
            </div>
            <div className="tier t2">
              <b>Silver</b>
              <span>cleaned, standardised</span>
            </div>
            <div className="tier t3">
              <b>Gold</b>
              <span>ready for the business</span>
            </div>
          </div>
          <ul className="rows">
            {["Active requests", "SLA compliance", "Average time to staff", "Fulfilment rate"].map(
              (label) => (
                <li key={label}>
                  <span>{label}</span>
                  <i></i>
                  <b>—</b>
                </li>
              ),
            )}
          </ul>
          <p className="note">
            Values left blank on purpose. I’m not putting numbers here that I can’t show.
          </p>
        </div>
      </div>
    </article>
  );
}

/** Beacon: dark full-bleed section. The routes SVG is drawn at runtime (lib/enhance/beacon.ts). */
export function BeaconSection() {
  const p = by("beacon");
  return (
    <article className="proj beacon" data-i={projectIndex(p.slug)} aria-label={p.name}>
      <div className="art a-beacon" data-art="">
        <svg
          id="beacon-svg"
          role="img"
          aria-label="Routes between Takoradi, Accra and Kumasi, drawn as bundles of parallel lines"
        ></svg>
      </div>
      <div className="ov">
        <div className="ov-in">
          <Cap p={p} />
        </div>
        <div className="ov-in">
          <div className="ptext">
            <p className="plead">{p.featured!.lead}</p>
            <Facts p={p} />
            <ReadMore />
          </div>
        </div>
        <div className="ov-in">
          <Title p={p} />
        </div>
      </div>
    </article>
  );
}

/** CMS Starter Kit: a modular grid (two sources -> one abstraction -> components -> two targets). */
export function CmsSection() {
  const p = by("cms-starter-kit");
  return (
    <article className="proj cms" data-i={projectIndex(p.slug)} aria-label={p.name}>
      <div className="g">
        <Cap p={p} />
        <Title p={p} />
        <div
          className="cms-grid"
          data-art=""
          role="group"
          aria-label="Modular layout: two CMS platforms feed one abstraction layer, which feeds reusable components in Next.js and Nuxt"
        >
          <div className="tile src">
            <span>Source</span>
            <b>Sanity</b>
          </div>
          <div className="tile src">
            <span>Source</span>
            <b>Storyblok</b>
          </div>
          <div className="tile abs">
            <span>The decision</span>
            <div>
              <b>CMS abstraction</b>
              <p>One content shape for the UI, whichever CMS is behind it.</p>
            </div>
          </div>
          <div className="tile comp">
            <span>Component</span>
            <i className="blk"></i>
            <i></i>
            <i></i>
          </div>
          <div className="tile comp">
            <span>Component</span>
            <i className="blk" style={{ height: "30%" }}></i>
            <i></i>
            <i></i>
          </div>
          <div className="tile comp">
            <span>Component</span>
            <i className="blk" style={{ height: "58%" }}></i>
            <i></i>
            <i></i>
          </div>
          <div className="tile app a1">
            <span>Target</span>
            <b>Next.js</b>
          </div>
          <div className="tile app a2">
            <span>Target</span>
            <b>Nuxt</b>
          </div>
          <div className="tile txt">
            <div>
              <p className="plead">{p.featured!.lead}</p>
              <Facts p={p} />
            </div>
            <ReadMore />
          </div>
        </div>
      </div>
    </article>
  );
}

/** Dolphins: an accent "pool" with an illustrative browser and phone. In progress, not live. */
export function DolphinsSection() {
  const p = by("dolphins-swim-center");
  return (
    <article className="proj dol" data-i={projectIndex(p.slug)} aria-label={p.name}>
      <div className="g">
        <Cap p={p} />
        <div className="ptext">
          <Title p={p}>
            Dolphins
            <br />
            Swim Center
          </Title>
          <p className="plead" style={{ marginTop: 24 }}>
            {p.featured!.lead}
          </p>
          <Facts p={p} />
          <ReadMore />
        </div>
        <DolphinsArt />
      </div>
    </article>
  );
}
