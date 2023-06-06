import { Link } from "react-router-dom";
import IconButton from "../buttons/IconButton";

const PageNotFound = () => {
  return (
    <main className="container">
      <section className="card">
        <h3>Page Not Found</h3>
        <div className="card-body">
          <Link to="/" className="nav-link">
            <IconButton name="Home" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default PageNotFound;
