import { Row, Col, ToggleButton, ToggleButtonGroup } from "react-bootstrap";

export function ExerciseFilter({
  values,
  setValues,
  filters,
}: {
  values: string[];
  setValues: React.Dispatch<React.SetStateAction<string[]>>;
  filters: string[];
}) {
  return (
    <Row>
      {filters.map((filter) => (
        <Col xs={12} className="my-1" key={filter}>
          <ToggleButtonGroup
            type="checkbox"
            value={values}
            onChange={(value) => setValues(value)}
            style={{ width: "80vw", maxWidth: "400px", opacity: "100%" }}
          >
            <ToggleButton id={filter} value={filter} variant="outline-dark">
              {filter}
            </ToggleButton>
          </ToggleButtonGroup>
        </Col>
      ))}
    </Row>
  );
}

export const Difficulties = {
  EASY: "Easy",
  HARD: "Hard",
};

export const Types = {
  FOUR_CHOICES_IT: "Four_Choices_Image-Texts",
  FOUR_CHOICES_TI: "Four_Choices_Text-Images",
  CONNECT_PAIRS_TT: "Connect_Pairs_Text-Text",
  CONNECT_PAIRS_TI: "Connect_Pairs_Text-Image",
};
