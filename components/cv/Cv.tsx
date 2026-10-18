import Link from "next/link";
import { cv, type CvEntry } from "@/data/cv";
import { site } from "@/data/site";
import { SmartLink } from "@/components/ui/SmartLink";

/** The résumé page (/cv). Server component, no scripts. Print styles make "Save as PDF" clean. */
export function Cv() {
  return (
    <article className="cv" aria-labelledby="cv-h">
      <header className="g cv-head">
        <p className="cv-back">
          <Link href="/">← Back to portfolio</Link>
        </p>
        <h1 id="cv-h">{cv.name}</h1>
        <p className="cv-role">{cv.headline}</p>
        <p className="cv-meta">
          <a href={`mailto:${site.links.email}`}>{site.links.email}</a>
          <span>{cv.location}</span>
          <SmartLink href={site.links.linkedin} placeholder="LinkedIn link not set yet">
            LinkedIn
          </SmartLink>
          <SmartLink href={site.links.github} placeholder="GitHub link not set yet">
            GitHub
          </SmartLink>
        </p>
        <div className="cv-actions">
          <a className="btn-cv" href={site.links.resumePdf} download="Christabel-Quaye-CV.pdf">
            Download PDF
            <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 4v13M6 12l6 6 6-6" />
            </svg>
          </a>
          <span className="cv-hint">Or print this page to save it as a PDF.</span>
        </div>
      </header>

      <section className="g cv-sec" aria-labelledby="cv-summary">
        <h2 id="cv-summary">Summary</h2>
        <div className="cv-body">
          <p className="cv-summary">{cv.summary}</p>
        </div>
      </section>

      <section className="g cv-sec" aria-labelledby="cv-exp">
        <h2 id="cv-exp">Experience</h2>
        <div className="cv-body">
          {(cv.experience as CvEntry[]).map((e) => (
            <div className="cv-entry" key={e.org}>
              <h3>
                {e.org}
                <span>
                  {e.place} · {e.when}
                </span>
              </h3>
              <p className="cv-title">
                <b>{e.title}</b>
                {e.titleWhen ? <span> · {e.titleWhen}</span> : null}
              </p>
              {e.focus ? <p className="cv-focus">{e.focus}</p> : null}
              {e.earlier ? <p className="cv-earlier">{e.earlier}</p> : null}
              {e.groups.map((g) => (
                <div className="cv-grp" key={g.heading || e.org}>
                  {g.heading ? <h4>{g.heading}</h4> : null}
                  <ul className="cv-list">
                    {g.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="g cv-sec" aria-labelledby="cv-proj">
        <h2 id="cv-proj">Selected projects</h2>
        <div className="cv-body">
          {cv.projects.map((p) => (
            <div className="cv-entry" key={p.name}>
              <h3>
                {p.name}
                <span>{p.note}</span>
              </h3>
              <ul className="cv-list">
                {p.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="g cv-sec" aria-labelledby="cv-skills">
        <h2 id="cv-skills">Skills</h2>
        <div className="cv-body">
          <dl className="cv-skills">
            {cv.skills.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="g cv-sec" aria-labelledby="cv-edu">
        <h2 id="cv-edu">Education and certifications</h2>
        <div className="cv-body">
          <ul className="cv-list">
            {cv.education.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <p className="cv-lang">
            <b>Languages:</b> {cv.languages}
          </p>
        </div>
      </section>
    </article>
  );
}
