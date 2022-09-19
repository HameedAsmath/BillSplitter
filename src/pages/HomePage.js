import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../userContext";

export default function HomePage() {
  const msg = useContext(UserContext);

  let navigate = useNavigate();
  const logout = () => {
    axios
      .get("https://billspliterapi.azurewebsites.net/api/user/logout/2")
      .then((response) => {
        if (response.statusText === "OK") {
          navigate("/login", { replace: true });
        }
      });
  };
  return (
    <div className="text-center fs-1 text-dark">
      <h1>HomePage</h1>
      <p>{msg}</p>
      <div className="btn btn-primary" onClick={logout}>
        Logout
      </div>
    </div>
  );
}
