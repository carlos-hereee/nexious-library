import { Link } from "react-router-dom";
import Buttons from "../buttons/Buttons";

const PageNotFound = () => {
  return (
    <main className="container">
      <section className="card">
        <h3>Page Not Found</h3>
        <div className="card-body">
          <Link to="/" className="nav-link">
            <Buttons name="Home" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default PageNotFound;
