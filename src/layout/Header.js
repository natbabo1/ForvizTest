import { Link, useLocation } from "react-router-dom";

function Header() {
  const { pathname } = useLocation();

  return (
    <div className="header">
      <nav className="navbar container">
        <Link to="/test-01">
          <button
            type="button"
            className={pathname === "/test-01" ? "current-page" : ""}
          >
            Test01 - CSS Test
          </button>
        </Link>
        <Link to="/test-02">
          <button
            type="button"
            className={pathname === "/test-02" ? "current-page" : ""}
          >
            Test02 - Venue Booking System
          </button>
        </Link>
        <Link to="/test-03">
          <button
            type="button"
            className={pathname === "/test-03" ? "current-page" : ""}
          >
            {"Test03 - Venue Booking System (Front-end Test)"}
          </button>
        </Link>
      </nav>
    </div>
  );
}

export default Header;
