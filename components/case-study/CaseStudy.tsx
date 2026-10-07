import type { ReactNode } from "react";
import type { Project } from "@/data/projects";
import { projectIndex, projects } from "@/data/projects";
import { Arrow } from "@/components/ui/Arrow";

/** Dashed "To add" block: shown wherever a section has no content yet. Nothing is invented. */
function ToAdd({ children }: { children: ReactNode }) {
  return (
    <div className="phb">
      <b>To add</b>
      {children}
    </div>
  );
}

function Section({ title, cls, children }: { title: string; cls?: string; children: ReactNode }) {
  return (
    <section className="g cs-sec">
      <h3>{title}</h3>
      <div className={`c${cls ? ` ${cls}` : ""}`}>{children}</div>
    </section>
  );
}

function Points({ items, placeholder }: { items: string[]; placeholder: string }) {
  if (!items.length) return <ToAdd>{placeholder}</ToAdd>;
  return (
    <ol className="pts">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ol>
  );
}

/**
 * One case study, rendered from data/projects.ts. Sections with no content show a "To add" placeholder.
 * The drawing is NOT rendered here: `#cs-art` is an empty host that CaseStudyDialog fills by cloning the
 * project's art from the page (so the dialog always matches the section).
 */
export function CaseStudy({ p, onClose }: { p: Project; onClose: () => void }) {
  const i = projectIndex(p.slug);
  const next = projects[(i + 1) % projects.length];
  const nextIdx = (i + 1) % projects.length;

  return (
    <>
      <div className="cs-bar">
        <span>
          <span className="n">{p.num}</span>
          {p.name}
        </span>
        <button className="cs-x" id="cs-close" type="button" onClick={onClose}>
          Close
        </button>
      </div>

      <div className="g cs-top">
        <h2 className="cs-title" id="cs-title">
          {p.name}
        </h2>
        <dl className="cs-meta">
          <div>
            <dt>Role</dt>
            <dd>{p.role}</dd>
          </div>
          <div>
            <dt>Type</dt>
            <dd>{p.type}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{p.status}</dd>
          </div>
          <div>
            <dt>{p.builtLabel}</dt>
            <dd>{p.built.join(", ")}</dd>
          </div>
        </dl>
        <div className="cs-art" id="cs-art"></div>
      </div>

      <Section title="Overview">
        <p className="lead">{p.lead}</p>
      </Section>
      <Section title="The problem">
        {p.problem ? (
          <p>{p.problem}</p>
        ) : (
          <ToAdd>The problem this solved, in a sentence or two.</ToAdd>
        )}
      </Section>
      <Section title="The solution">
        {p.solution ? <p>{p.solution}</p> : <ToAdd>What was built or decided.</ToAdd>}
      </Section>
      <Section title="My role">
        {p.myrole ? <p>{p.myrole}</p> : <ToAdd>What you did, specifically.</ToAdd>}
      </Section>
      <Section title="How it fits together">
        {p.seq.length ? (
          <>
            <ol className="seq">
              {p.seq.map(([title, text]) => (
                <li key={title}>
                  <div>
                    <b>{title}</b>
                    <span>{text}</span>
                  </div>
                </li>
              ))}
            </ol>
            {p.seqNote && <p className="seq-note">{p.seqNote}</p>}
          </>
        ) : (
          <ToAdd>How the parts fit together.</ToAdd>
        )}
      </Section>
      <Section title="Technical decisions">
        {p.decisions.length ? (
          <div className="dec">
            {p.decisions.map((dec) => (
              <div key={dec.h}>
                <h4>{dec.h}</h4>
                <ul>
                  {dec.i.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <ToAdd>The main technical or product decisions.</ToAdd>
        )}
      </Section>
      <Section title="Challenges">
        <Points
          items={p.challenges}
          placeholder="Two or three real challenges and how you solved them."
        />
      </Section>
      <Section title="What I learned">
        <Points
          items={p.learned}
          placeholder="What this project has changed about how you work. Add once there is something to say."
        />
      </Section>
      {p.builtNote && (
        <Section title="Platform context">
          <p className="built">{p.built.join(", ")}</p>
          <p className="built-note">{p.builtNote}</p>
        </Section>
      )}
      <Section title="Screenshots">
        <ToAdd>
          {p.noArt
            ? "Real screenshots, once you have them."
            : "Real screenshots, once you have them. The drawing above is a stand-in."}
        </ToAdd>
      </Section>
      <Section title="Links">
        <div className="cs-links">
          {p.internal ? (
            <>
              <span className="nl">
                Live project<em>Internal, not public</em>
              </span>
              <span className="nl">
                Repository<em>Private</em>
              </span>
            </>
          ) : (
            <>
              {p.notLive ? (
                <span className="nl">
                  Live project<em>Not live yet</em>
                </span>
              ) : (
                <a href="#" data-ph="Project URL not set yet">
                  Live project<em>placeholder</em>
                </a>
              )}
              <a href="#" data-ph="Repository URL not set yet">
                Repository<em>placeholder</em>
              </a>
            </>
          )}
        </div>
      </Section>

      <div className="g cs-next">
        <div>
          <small>Next project</small>
          <button type="button" data-open={nextIdx}>
            {next.name} <Arrow />
          </button>
        </div>
      </div>
    </>
  );
}
