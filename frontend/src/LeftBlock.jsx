import { useState } from "react";

export default function LeftBlock({ date, toggle, setToggle, addEvent }) {
  const [time, setTime] = useState("");
  const [event, setEvent] = useState("");

  const submit = e => {
    e.preventDefault();
    addEvent(time, event);
    setToggle(true);
  };

  return (
    <div className="flip-container-left">
      <div className={`flipper ${toggle ? "" : "toggle"}`}>
        <div className="front flex-col">
          <h2>Today</h2>
          <h1>{date.getDate()}</h1>
          <button onClick={() => setToggle(false)}>+</button>
        </div>

        <div className="back flex-col">
          <form onSubmit={submit}>
            <input
              placeholder="12:00"
              value={time}
              onChange={e => setTime(e.target.value)}
            />
            <input
              placeholder="Event"
              value={event}
              onChange={e => setEvent(e.target.value)}
            />
            <button type="submit">→</button>
          </form>
          <button onClick={() => setToggle(true)}>-</button>
        </div>
      </div>
    </div>
  );
}
