import "../mainpage.css";
import { Link, useRouteError } from "react-router-dom";

export function Error2() {
  const error = useRouteError();

  return (
    <div className="errormsg">
      <h1 id="err">
        Error: <span>{error.message}</span>
      </h1>
      <p id="err">
        {error.status} - {error.statusText}
      </p>
    </div>
  );
}

export default function Error() {
  return (
    <div className="error">
      <h1>Error badgetaway</h1>
      <button>
        <Link to="/">Move to the Home</Link>
      </button>
    </div>
  );
}
