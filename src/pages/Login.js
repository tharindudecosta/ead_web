import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosclient } from "../api";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");

  const [showPassword, setshowPassword] = useState(false);

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLogin({
      ...login,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    axiosclient
      .post("/api/User/login", login)
      .then((res) => {
        if (res && res.data) {
          const token = res.data.token;
          console.log("JWT Token:", token);

          if (token) {
            const tokenData = {
              jwtToken: token,
            };
            Cookies.set("token", JSON.stringify(tokenData), { expires: 1 });
            localStorage.setItem("token", JSON.stringify(tokenData));

            const decoded = jwtDecode(token);
            const id = decoded.unique_name;
            setUserId(id);
            Cookies.set("userId", JSON.stringify({ userId: id }), {
              expires: 1,
            });
            Swal.fire("LOGIN", "LOGIN_SUCCCESSFUL", "success").then(() => {
              navigate("/");
            });
            
          }
        } else {
          console.error("Response or response data is undefined");
        }
      })
      .catch((err) => {
        Swal.fire(
          "LOGIN",
          err.response?.data?.response || "Login failed",
          ""
        ).then(() => {
          console.log(err);
        });
      });
  };

  const fetchUserDetails = (id) => {
    axiosclient
      .get(`/api/User/${id}`)
      .then((response) => {
        const user = response.data;
        console.log(user);
        if (response.status === 200) {
          localStorage.setItem("user", JSON.stringify(response.data));

          Swal.fire("LOGIN", "LOGIN_SUCCCESSFUL", "success").then(() => {
            navigate("/");
          });
        }
      })
      .catch((err) => {
        console.error("Failed to fetch user details", err);
      });
  };

  const togglePassword = () => {
    setshowPassword(!showPassword);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      <label>Email address:</label>
      <input
        name="email"
        type="text"
        id="country"
        class={`input`}
        placeholder="Email"
        value={login.email}
        onChange={handleChange}
      />
      <label>Password:</label>
      <input
        name="password"
        type={showPassword ? "text" : "password"}
        id="country"
        class={`input`}
        placeholder="Password"
        value={login.password}
        onChange={handleChange}
      />
      <input className="chkBox" type="checkbox" onClick={togglePassword} /> Show
      Password
      <br></br>
      <button>Log in</button>
    </form>
  );
};

export default Login;
