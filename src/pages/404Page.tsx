import { BiErrorCircle } from "react-icons/bi";

// Invalid url page
function ErrorPage() {
  return (
    <div
      className="d-flex flex-column justify-content-center text-center"
      style={{ width: "100%", height: "100vh" }}
    >
      <div>
        <BiErrorCircle size="10em" />
      </div>
      <div style={{ fontSize: "5rem" }}>404</div>
      <div style={{ fontSize: "2rem" }}>Page Not Found</div>
    </div>
  );
}

export default ErrorPage;
