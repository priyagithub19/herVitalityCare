export function getSuggestion(disease) {
  switch (disease) {
    case "Diabetes":
      return {
        diet: "Low sugar, high fiber foods",
        water: "3+ liters/day",
        care: "Daily walking & glucose monitoring",
      };
    case "Pregnancy":
      return {
        diet: "Iron & calcium rich food",
        water: "3–3.5 liters/day",
        care: "Rest & regular checkups",
      };
    case "PCOS":
      return {
        diet: "Low carb, high protein",
        water: "2.5–3 liters/day",
        care: "Exercise & stress control",
      };
    case "Hypertension":
      return {
        diet: "Low salt diet",
        water: "2.5 liters/day",
        care: "BP monitoring & yoga",
      };
    default:
      return { diet: "Balanced diet", water: "2–2.5 L/day", care: "Healthy lifestyle" };
  }
}
