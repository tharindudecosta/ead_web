import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../styles/tiles.css";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // const jwtToken = `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJib2J3aWxsaWFtc0BleGFtcGxlLmNvbSIsInVzZXJJZCI6IkFETUlOX1NUQUZGIiwiaWF0IjoxNzEzODE1Njg2LCJleHAiOjE3MTM4MjQ2ODZ9.lELg_92gOs7xSPyGXYrZ0dgVqXgbV7jX2Epot1NTROOUCJa77s32mRJdY_pfBifpbzrIFswttEo-UPLVbx5AfA`
    // const user = JSON.parse(localStorage.getItem("token"));
    // const decoded = jwtDecode(user);
    // console.log(decoded);
  });

  return (
    <div className="home">
      <section className="">
        <h1 className="">Home Page</h1>
        <div>
          <div
            className="tiles-common leave-planner-tile"
            onClick={() => {
              navigate("/product/all");
            }}
          >
            <div className="tile-icon">
              <i className="fa-solid fa-person-walking fa-lg"></i>
            </div>
            <div className="tile-text">Products</div>
          </div>

          <div
            className="tiles-common training-tile"
            onClick={() => {
              navigate("/Orders");
            }}
          >
            <div className="tile-icon">
              <i className="fa-solid fa-graduation-cap fa-lg"></i>
            </div>
            <div className="tile-text">Orders</div>
          </div>

          <div className="tiles-common goals-tile">
            <div className="tile-icon">
              <i className="fa-solid fa-bullseye fa-lg"></i>
            </div>
            <div
              className="tile-text"
              onClick={() => {
                navigate("/");
              }}
            >
              Goals
            </div>
          </div>

          <div
            className="tiles-common appraials-tile"
            onClick={() => {
              navigate("/inventory");
            }}
          >
            <div className="tile-icon">
              <i className="fa-solid fa-3 fa-lg"></i>
              <i className="fa-solid fa-6 fa-lg"></i>
              <i className="fa-solid fa-0 fa-lg"></i>
            </div>
            <div className="tile-text">Inventory</div>
          </div>

          <div
            className="tiles-common calendar-tile"
            onClick={() => {
              navigate("/user/all");
            }}
          >
            <div className="tile-icon">
              <i className="fa-solid fa-calendar-days fa-lg"></i>
            </div>
            <div className="tile-text">Users</div>
          </div>

          <div
            className="tiles-common administration-tile"
            onClick={() => {
              navigate("/Services");
            }}
          >
            <div className="tile-icon">
              <i className="fa-solid fa-address-card fa-lg"></i>
            </div>
            <div className="tile-text">CSR</div>
          </div>

          <div className="tiles-common company-policies-tile">
            <div className="tile-icon">
              <i className="fa-solid fa-file-contract fa-lg"></i>
            </div>
            <div className="tile-text">Company Policies</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
