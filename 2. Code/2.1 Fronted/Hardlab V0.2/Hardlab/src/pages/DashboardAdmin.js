import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Principal from "../components/Principal";
import Container from "../components/Contanier";

const DashboardAdmin = () => {
  const cookies = new Cookies();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    if (cookies.get('token')) {
      setIsAuthenticated(true);
      setUserRole(cookies.get('rol'));
    }
  }, []);

  return (
    <div>
      {isAuthenticated && userRole === '1' ? (
        <div>
          <div className="row">
            <div className="col-2">
              <Principal />
            </div>
            <div className="col-10">
              <Container />
            </div>
          </div>
        </div>
      ) : (
        <div>
          No autorizado
          
        </div>
      )}
    </div>
    
  );
};

export default DashboardAdmin;
