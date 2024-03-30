import "./Dashboard.scss";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/auth-context.js";
import MyRelative from "../../components/MyRelative/MyRelative";
import MyList from "../../components/MyList/MyList";

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const { session, setSession } = useContext(AuthContext);
  const [isRelativeClicked, setIsRelativeClicked] = useState(false);
  const [isListClicked, setIsListClicked] = useState(true);

  const logout = () => {
    sessionStorage.removeItem("token");
    setSession(null);
  };

  const handleClickRelative = () => {
    setIsRelativeClicked(true);
    setIsListClicked(false);
}
const handleClickList = () => {
  setIsRelativeClicked(false);
  setIsListClicked(true);
}


  useEffect(() => {
    const login = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) return;

      // Get the data from the API
      try {
        const response = await axios.get("http://localhost:8080/mydashboard", {
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
      <button className="dashboard__item dashboard__logout" onClick={logout}>
            Log out
      </button>
      <nav className="dashboard__nav">
        <div>
          <p>Welcome back, <strong>{session.name}</strong></p>
        </div>
        <div className="dashboard__buttons">
          <p className="dashboard__item" onClick={handleClickRelative}>My Relatives</p>
          <p className="dashboard__item" onClick={handleClickList}>My List</p>

        </div>
      </nav>

      {isRelativeClicked && <MyRelative id={session.id}/>}
      {isListClicked && <MyList id={session.id}/>}


      {/* <div>
        <Link to="/login">Log in</Link>
      </div> */}
      {/* {session.role === "admin" && (
        <div>
          <Link to="/admin">Go to Admin page</Link>
        </div>
      )} */}
    </main>
  );
}

export default Dashboard;
