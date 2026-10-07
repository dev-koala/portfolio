/**
 * Dolphins Swim Center drawing: lane-rope pool pattern in the accent colour, with an illustrative
 * browser and phone mockup. Labelled as a mockup, not a live site.
 */
export function DolphinsArt() {
  return (
    <div className="art a-dol" data-art="">
      <div className="dol-pool">
        <svg viewBox="0 0 400 340" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <pattern id="lane" width="46" height="34" patternUnits="userSpaceOnUse">
              <line
                x1="0"
                y1="17"
                x2="46"
                y2="17"
                stroke="#fff"
                strokeOpacity=".5"
                strokeWidth="1.6"
              />
              <circle cx="9" cy="17" r="3.6" fill="#fff" fillOpacity=".85" />
              <circle cx="32" cy="17" r="3.6" fill="#fff" fillOpacity=".85" />
            </pattern>
          </defs>
          <rect width="400" height="340" fill="url(#lane)" />
        </svg>
      </div>
      <div
        className="dol-mock"
        role="img"
        aria-label="Illustrative browser and phone mockups for the Dolphins Swim Center frontend. Not a live site."
      >
        <div className="browser">
          <div className="bb">
            <i />
            <i />
            <i />
            <span>illustrative mockup</span>
          </div>
          <div className="bn">
            <b>Dolphins</b>
            <span>Programs</span>
            <span>Schedule</span>
            <span>Contact</span>
          </div>
          <div className="bh">
            <div>
              <h4>
                Dolphins
                <br />
                Swim Center
              </h4>
              <small>Takoradi</small>
              <span className="bk">Enquire</span>
            </div>
            <div className="ph">
              <span>Photo</span>
            </div>
          </div>
        </div>
        <div className="phone">
          <div>
            <small>Menu</small>
            <b>
              Dolphins
              <br />
              Swim Center
            </b>
            <small>Takoradi</small>
            <div className="ph" />
          </div>
        </div>
      </div>
    </div>
  );
}
