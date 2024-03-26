import "./Dashboard.scss";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/auth-context.js";

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const { session, setSession } = useContext(AuthContext);

  const logout = () => {
    sessionStorage.removeItem("token");
    setSession(null);
  };

  useEffect(() => {
    const login = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) return;


      // Get the data from the API
      try {
        const response = await axios.get("http://localhost:8080/mylist", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });


        setSession(response.data);
      } catch (error) {
        console.error(error);
      }

      setIsLoading(false);
    };
    login();
  }, []);

  if (!session) {
    return (
      <main className="dashboard">
        <p>You must be logged in to see this page.</p>
        <p>
          <Link to="/login">Log in</Link>
        </p>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="dashboard">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="dashboard">
      <h1 className="dashboard__title">Dashboard</h1>

      <p>
        Welcome back, {session.name} 
      </p>

      <h2>My Profile</h2>
      <p>Email: {session.email}</p>
      <p>UserID: {session.id}</p>

      <h2>Show My List</h2>

      <button className="dashboard__logout" onClick={logout}>
        Log out
      </button>

      <div>
        <Link to="/login">Log in</Link>
      </div>
      {/* {session.role === "admin" && (
        <div>
          <Link to="/admin">Go to Admin page</Link>
        </div>
      )} */}
    </main>
  );
}

export default Dashboard;
