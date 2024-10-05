import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setshowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/home");
    // await login(email,password)
  };

  const togglePassword = () => {
    setshowPassword(!showPassword);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      <label>Email address:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password:</label>
      <input
        type={showPassword ? "text" : "password"}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <input className="chkBox" type="checkbox" onClick={togglePassword} /> Show
      Password
      <br></br>
      <button>Log in</button>
    </form>
  );
};

export default Login;
