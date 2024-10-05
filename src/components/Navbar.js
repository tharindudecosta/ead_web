import { Link } from "react-router-dom";

const Navbar = () => {
  const handleClick = () => {
    // logout
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>E-Commerce Manager</h1>
        </Link>
        <nav>
          <div>
            <button onClick={handleClick}>Log out</button>
          </div>
          <div>
            <div>
              <Link to="/">Login</Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
