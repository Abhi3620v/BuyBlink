import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#222", color: "white" }}>
      <Link to="/" style={{ marginRight: "20px", color: "white" }}>
        BuyBlink
      </Link>
      <Link to="/login" style={{ marginRight: "10px", color: "white" }}>
        Login
      </Link>
      <Link to="/register" style={{ color: "white" }}>
        Register
      </Link>

      <Link to="/dashboard" style={{ color: "white" }}>
        Dashboard
      </Link>
    </nav>
  );
}

export default Navbar;
