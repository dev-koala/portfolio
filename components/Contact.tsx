import { site } from "@/data/site";
import { d } from "@/lib/utils";
import { Arrow } from "@/components/ui/Arrow";
import { SmartLink } from "@/components/ui/SmartLink";

/** Decorative lines carried over from the Beacon routes. Static, so it is drawn on the server. */
function ContactArt() {
  const W = 1000;
  const H = 640;
  const lines = [];
  for (let i = -10; i <= 10; i++) {
    const o = i * 16;
    lines.push(
      <path
        key={i}
        d={`M-20 ${H + 40}C300 ${H - 60 + o} 560 ${250 + o * 0.6} ${W + 20} ${40 + o * 0.4}`}
        strokeOpacity={(0.05 + 0.2 * (1 - Math.abs(i) / 11)).toFixed(2)}
      />,
    );
  }
  return (
    <svg
      className="c-art"
      id="c-art"
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMaxYMax slice"
    >
      <g fill="none" stroke="#ECECE8" strokeWidth="1.2">
        {lines}
      </g>
      <path className="route" fill="none" d={`M-20 ${H + 40}C300 ${H - 60} 560 250 ${W + 20} 40`} />
    </svg>
  );
}

export function Contact() {
  const { links, display } = site;
  return (
    <section className="sec contact" id="contact" aria-labelledby="contact-h" data-sec="06 Contact">
      <div className="c-main">
        <ContactArt />
        <div className="g">
          <p className="label">
            <span className="n">06</span>Contact
          </p>
        </div>
        <div className="g">
          <h2 id="contact-h" className="rv">
            <span className="mk">
              <span>Have something</span>
            </span>
            <span className="mk l2">
              <span style={d(1)}>worth building?</span>
            </span>
          </h2>
        </div>
        <div className="g c-bot">
          <div className="c-copy-wrap fd">
            <p className="c-copy">
              If it needs an interface, an API behind it, or someone to work out what should be
              built first, write to me.
            </p>
            <a className="btn-c" href={`mailto:${links.email}`}>
              Start a conversation <Arrow />
            </a>
          </div>
          <div className="clist fd" style={d(2)}>
            <a href={`mailto:${links.email}`}>
              <span>Email</span>
              <b>{links.email}</b>
            </a>
            <SmartLink href={links.linkedin} placeholder="LinkedIn link not set yet">
              <span>LinkedIn</span>
              <b>{display.linkedin}</b>
            </SmartLink>
            <SmartLink href={links.github} placeholder="GitHub link not set yet">
              <span>GitHub</span>
              <b>{display.github}</b>
            </SmartLink>
            <SmartLink href={links.resume} placeholder="Résumé file not linked yet">
              <span>Resume</span>
              <b>{links.resume ? "Download résumé" : display.resume}</b>
            </SmartLink>
          </div>
        </div>
      </div>
      <footer className="g foot">
        <p className="f1">
          <b>{site.name}</b>
        </p>
        <p className="f2">{site.title}</p>
        <p className="f3">
          © {site.copyrightYear} {site.name}
        </p>
      </footer>
    </section>
  );
}
