import { stack, stackNote } from "@/data/stack";

/** Stack: deliberately after the work. */
export function Stack() {
  return (
    <section
      className="sec"
      id="stack"
      aria-labelledby="stack-h"
      data-sec="04 Stack"
      style={{ paddingTop: 0 }}
    >
      <div className="g stack-head">
        <p className="label">
          <span className="n">04</span>
          <span id="stack-h">Stack</span>
        </p>
        <p className="note">{stackNote}</p>
      </div>
      <div className="g sgrid">
        {stack.map((g) => (
          <div key={g.group}>
            <h3>{g.group}</h3>
            <ul>
              {g.items.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
