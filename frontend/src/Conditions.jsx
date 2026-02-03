import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";

const options = ["Diabetes", "Pregnancy", "PCOS"];

export default function Conditions({ data, setData }) {
  const toggle = (condition) => {
    const updated = data.conditions.includes(condition)
      ? data.conditions.filter((c) => c !== condition)
      : [...data.conditions, condition];

    setData({ ...data, conditions: updated });
  };

  return (
    <FormGroup sx={{ mb: 3 }}>
      {options.map((item) => (
        <FormControlLabel
          key={item}
          control={
            <Checkbox
              checked={data.conditions.includes(item)}
              onChange={() => toggle(item)}
            />
          }
          label={item}
        />
      ))}
    </FormGroup>
  );
}
