import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/tiles.css";
import { axiosclient } from "../api";
import Cookies from "js-cookie";

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  // const role = user?.role;
  const [role, setRole] = useState("");


  useEffect(() => {
    const getTokenCookieData = () => {
      const cookieData = Cookies.get('userId');
    
      if (cookieData) {
        return JSON.parse(cookieData);
      }
    
      return null;
    };
    
    const getTokenFromCookie = () => {
      const cookieData = getTokenCookieData();
      if (cookieData) {
        return cookieData.userId;
      } else {
        return null;
      }
    };

    const fetchUserDetails = (id) => {

      axiosclient
        .get(`/api/User/${id}`)
        .then((response) => {
          const user = response.data;
          console.log(user);
          if (response.status === 200) {
            localStorage.setItem("user", JSON.stringify(response.data));
  
            setRole(response.data.role)
          }
        })
        .catch((err) => {
          console.error("Failed to fetch user details", err);
        });
    };

    fetchUserDetails(getTokenFromCookie());
  },[]);

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


          {(role.toLowerCase() === "admin") &&(
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
          )}
          
          

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
            className="tiles-common company-policies-tile"
            onClick={() => {
              navigate("/vendor/all");
            }}
          >
            <div className="tile-icon">
              <i className="fa-solid fa-file-contract fa-lg"></i>
            </div>
            <div className="tile-text">Vendors</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
