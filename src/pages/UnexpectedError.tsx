import { RiQuestionLine } from "react-icons/ri";
import { MdOutlineRefresh } from "react-icons/md";
import { useNavigate } from "react-router-dom";

// App redirects to this page whenever an unexpected API error occurs
function UnexpectedError() {
  const navigate = useNavigate();
  return (
    <div
      className="d-flex flex-column justify-content-center text-center"
      style={{ width: "100%", height: "100vh" }}
    >
      <div>
        <RiQuestionLine size="5em" />
      </div>

      <div style={{ fontSize: "2rem" }}>
        Something unexpected happened. Try to click the button below to try
        again.
      </div>
      <div>
        <MdOutlineRefresh size="6em" onClick={() => navigate(-1)} />
      </div>
    </div>
  );
}

export default UnexpectedError;
