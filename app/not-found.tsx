import Link from "next/link";

export default function NotFound() {
  return (
    <section className="sec" style={{ minHeight: "70svh" }}>
      <div className="g">
        <p className="label">
          <span className="n">404</span>Not found
        </p>
        <h1 className="big" style={{ marginTop: "0.4em" }}>
          Nothing here.
        </h1>
        <p className="plead" style={{ marginTop: 24 }}>
          That page doesn’t exist.{" "}
          <Link href="/" className="more">
            Back to the portfolio
          </Link>
        </p>
      </div>
    </section>
  );
}
