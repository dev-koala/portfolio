import type { ReactNode } from "react";
import Image from "next/image";
import type { Project } from "@/data/projects";
import { projectIndex, projects } from "@/data/projects";
import { Arrow } from "@/components/ui/Arrow";

function Section({ title, cls, children }: { title: string; cls?: string; children: ReactNode }) {
  return (
    <section className="g cs-sec">
      <h3>{title}</h3>
      <div className={`c${cls ? ` ${cls}` : ""}`}>{children}</div>
    </section>
  );
}

function Points({ items }: { items: string[] }) {
  return (
    <ol className="pts">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ol>
  );
}

/**
 * One case study, rendered from data/projects.ts. A section with no content is left out entirely
 * (nothing is invented, nothing says "to add"); what is still missing is tracked in .claude/docs/TODO.md.
 * The drawing is NOT rendered here: `#cs-art` is an empty host that CaseStudyDialog fills by cloning the
 * project's art from the page (so the dialog always matches the section).
 */
export function CaseStudy({ p, onClose }: { p: Project; onClose: () => void }) {
  const i = projectIndex(p.slug);
  // A sequence with ends, not a loop: the first has no "Previous", the last no "Next".
  const prev = i > 0 ? projects[i - 1] : null;
  const next = i < projects.length - 1 ? projects[i + 1] : null;
  const live = p.internal ? undefined : p.links?.live;
  const repo = p.internal ? undefined : p.links?.repo;

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
      {p.problem && (
        <Section title="The problem">
          <p>{p.problem}</p>
        </Section>
      )}
      {p.solution && (
        <Section title="The solution">
          <p>{p.solution}</p>
        </Section>
      )}
      {p.myrole && (
        <Section title="My role">
          <p>{p.myrole}</p>
        </Section>
      )}
      {p.seq.length > 0 && (
        <Section title="How it fits together">
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
        </Section>
      )}
      {p.decisions.length > 0 && (
        <Section title="Technical decisions">
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
        </Section>
      )}
      {p.challenges.length > 0 && (
        <Section title="Challenges">
          <Points items={p.challenges} />
        </Section>
      )}
      {p.learned.length > 0 && (
        <Section title="What I learned">
          <Points items={p.learned} />
        </Section>
      )}
      {p.builtNote && (
        <Section title="Platform context">
          <p className="built">{p.built.join(", ")}</p>
          <p className="built-note">{p.builtNote}</p>
        </Section>
      )}
      {p.images?.length ? (
        <Section title="Screenshots" cls="cs-shots">
          {p.images.map((img) => (
            <Image
              key={img.src}
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              sizes="(min-width: 900px) 60vw, 100vw"
            />
          ))}
        </Section>
      ) : null}
      {live || repo ? (
        <Section title="Links">
          <div className="cs-links">
            {live ? (
              <a href={live} target="_blank" rel="noopener noreferrer">
                Live project
              </a>
            ) : (
              p.notLive && (
                <span className="nl">
                  Live project<em>Not live yet</em>
                </span>
              )
            )}
            {repo && (
              <a href={repo} target="_blank" rel="noopener noreferrer">
                Repository
              </a>
            )}
          </div>
        </Section>
      ) : null}

      <nav className="g cs-next" aria-label="More case studies">
        {prev && (
          <div className="prev">
            <small>Previous project</small>
            <button type="button" data-open={i - 1}>
              <Arrow /> {prev.name}
            </button>
          </div>
        )}
        {next && (
          <div className="nxt">
            <small>Next project</small>
            <button type="button" data-open={i + 1}>
              {next.name} <Arrow />
            </button>
          </div>
        )}
      </nav>
    </>
  );
}
