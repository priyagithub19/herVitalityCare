const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

export default function RightBlock({ date, toggle, setSelectedDate, eventList }) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  return (
    <div className="flip-container-right">
      <div className={`flipper ${toggle ? "" : "toggle"}`}>
        <div className="front">
          <div className="container-day">
            {days.map(d => <div key={d}>{d}</div>)}

            {[...Array(firstDay)].map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {[...Array(daysInMonth)].map((_, i) => (
              <div
                key={i}
                className="day-block"
                onClick={() =>
                  setSelectedDate(`${i + 1}/${month}/${year}`)
                }
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        <div className="back">
          {eventList.map((e, i) => (
            <div key={i}>{e[1]} — {e[2]}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
