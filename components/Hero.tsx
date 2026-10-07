import { site } from "@/data/site";
import { d } from "@/lib/utils";
import { Arrow } from "@/components/ui/Arrow";
import { SmartLink } from "@/components/ui/SmartLink";

/** Typographic hero: one big sentence, three lines, staggered mask reveal (.mk). */
export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-h" data-sec="">
      <div className="hero-main">
        <div className="g hero-top">
          <p className="loc">{site.location}</p>
        </div>
        {/* Dot-grid canvas. The role lines are three labelled cursors that drift around it (lib/enhance/cursors.ts).
            Without JS or with reduced motion they sit as a plain stack, so the text is always readable. */}
        <div className="canvas" data-cv>
          <ul className="roles" aria-label="What I do">
            {site.roles.map((r, i) => (
              <li key={r} className={`cur c${i + 1}`}>
                <svg className="ar" viewBox="0 0 13 18" width="13" height="18" aria-hidden="true">
                  <path d="M0.8 0.8V14.6L4.4 11.4L7 17.2L9.4 16.2L6.9 10.6L11.9 10.4Z" />
                </svg>
                <span className="tag">{r}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="g">
          <h1 className="hero-h rv" id="hero-h">
            <span className="l1 mk">
              <span>I start at</span>
            </span>
            <span className="l2 mk">
              <span style={d(1)}>
                the
                <br className="mb" /> interface.
              </span>
            </span>
            <span className="l3 mk">
              <span style={d(3)}>I don’t stop there.</span>
            </span>
          </h1>
        </div>
      </div>
      <div className="g hero-bot">
        <p className="hero-lead fd rv" style={d(4)}>
          {site.heroLead}
        </p>
        <div className="hero-links fd rv" style={d(5)}>
          <div className="cta-line">
            <a className="more" href="#work">
              View the work <Arrow />
            </a>
            <a className="more" href="#contact">
              Get in touch
            </a>
          </div>
          <div className="row">
            <SmartLink href={site.links.github} placeholder="GitHub link not set yet">
              GitHub
            </SmartLink>
            <SmartLink href={site.links.linkedin} placeholder="LinkedIn link not set yet">
              LinkedIn
            </SmartLink>
            <SmartLink href={site.links.resume} placeholder="Résumé file not linked yet">
              Resume
            </SmartLink>
          </div>
        </div>
      </div>
    </section>
  );
}
