import "../mainpage.css";
import { useParams, Link } from "react-router-dom";
export default function Failed() {
  const url = process.env.PAGE_URL;
  const { id } = useParams();
  console.log(id);
  return (
    <div className="status">
      <h1>Something wrong happend with paym</h1>
      <button>
        <Link className="failedbtn" to={`${url}/details/${id}`}>
          Try again
        </Link>
      </button>
    </div>
  );
}
