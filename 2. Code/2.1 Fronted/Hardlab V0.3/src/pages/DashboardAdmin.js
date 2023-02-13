import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Principal from "../components/Principal";
import ToolUpdate from "./ToolUpdate";
import { useHistory } from "react-router-dom";

const DashboardAdmin = () => {
  const cookies = new Cookies();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");

  let history = useHistory()
  useEffect(() => {
    if (cookies.get('token')) {
      setIsAuthenticated(true);
      setUserRole(cookies.get('rol'));
    }
  }, []);

  return (
    <div>
      {isAuthenticated && userRole === '1' ? (

        <div >
          <ToolUpdate />
        </div>

      ) : (
        history.push("/error")
      )}
    </div>

  );
};

export default DashboardAdmin;
