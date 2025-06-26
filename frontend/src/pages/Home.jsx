import { useEffect, useState } from "react";
import Intro from "../components/Intro";
import Dashboard from "./Dashboard";
// import SpotlightCard from "../components/SpotlightCard";


const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (err) {
        console.error("Invalid user data in localStorage.", err.message);
      }
    }
  }, []);

  return (
    <>
      {user ? <Dashboard /> : <Intro />}
    </>
  );
};

export default Home;
