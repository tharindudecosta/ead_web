import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
        <h1 className="">
          Home Page
        </h1>
      </section>
    </div>
  );
};

export default Home;