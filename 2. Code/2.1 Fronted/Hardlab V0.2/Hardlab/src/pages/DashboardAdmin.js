import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Principal from "../components/Principal";
import ToolUpdate from "./ToolUpdate";

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
        
            <div >
              <ToolUpdate />
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
