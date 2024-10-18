import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("token"));
  const role = user?.role;

  const handleClick = (e) => {
    // logout
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>E-Commerce Manager</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <div>
                <Link to="/login">Login</Link>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
