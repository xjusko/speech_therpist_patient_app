import { ToggleButton } from "react-bootstrap";

function FilterToggleButton({ text }: { text: string }) {
  return (
    <ToggleButton
      id={text}
      value={text}
      variant="outline-dark"
      style={{ width: "40vw", borderRadius: "5px" }}
    >
      {text}
    </ToggleButton>
  );
}

export default FilterToggleButton;

export const Difficulties = {
  EASY: "EASY",
  HARD: "HARD",
};

export const Types = {
  FOUR_CHOICES: "FOUR CHOICES",
  CONNECT_PAIRS: "CONNECT PAIRS",
};
