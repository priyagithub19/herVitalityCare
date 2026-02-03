import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./iconRadio.css";
import { Typography } from "@mui/material";

export default function IconRadio() {
  const activeRef = useRef(null);
  const inactiveRef = useRef(null);
  const timelineRef = useRef(null);

  const [selected, setSelected] = useState(true);
  const [selectedFlow , setSelectedFlow ] = useState("");
  const flowOptions = [
  { id: "light", label: "Light" },
  { id: "medium", label: "Medium" },
  { id: "heavy", label: "Heavy" },
];

  useEffect(() => {
    const duration = 0.3;
    const ease = "back.inOut(3)";

    timelineRef.current = gsap.timeline({
      paused: true,
      onComplete: () => setSelected(false),
      onReverseComplete: () => setSelected(true)
    })
      .to(activeRef.current, { y: 50, duration, ease })
      .to(inactiveRef.current, { y: -50, duration, ease }, 0);
  }, []);

  const handleClick = () => {
    if (selected) timelineRef.current.play();
    else timelineRef.current.reverse();
  };

  return (
    // <div className="container">
    //   <div className="container__elements">
        <div className="radio__card">
          <h2 style={{marginBottom: 10}}>Select the Flow</h2>

<div className="radio__card-options" style={{display: 'flex', flexDirection: 'row', gap: 10}}>
  {flowOptions.map((flow) => (
    <div
      key={flow.id}
      className="radio__card-options-item"
      onClick={() => setSelectedFlow(flow.id)}
    style={{backgroundColor: '#FFC9D7', paddingInline: 17, paddingTop: 10, paddingBottom: 10, borderRadius: 10}}>
      <div
        className={`circle ${
          selectedFlow === flow.id
            ? "circle__active"
            : "circle__inactive"
        }`}
      />
      <Typography className="radio__card-options-item-header" sx={{ml: 1}}>
        {flow.label}
      </Typography>
    </div>
  ))}
</div>

        {/* </div>
      </div> */}
    </div>
  );
}
