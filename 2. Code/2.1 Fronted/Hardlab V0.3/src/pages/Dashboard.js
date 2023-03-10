import React, { useEffect, useState } from "react";
import "../assets/css/App.css";

//import Cookies from 'universal-cookie';
import PrincipalUser from '../components/PrincipalUser';
import ContainerUser from "../components/ContainerUser";
import Cookies from 'universal-cookie';
import Error from "../components/Error"

const Dashboard = () => {
  const cookies = new Cookies();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    if (cookies.get('token')) {
      setIsAuthenticated(true);
      setUserRole(cookies.get('rol'));
    }
  }, [cookies]);

 


  //const cookies = new Cookies();
  return (
    /*
    <div className="containerDashboard">
      <h3>Id Usuario: {cookies.get('id')}</h3>
      <h3>Nombre Usuario: {cookies.get('username')}</h3>
      <h3>Rol Usuario: {cookies.get('rol')}</h3>
    </div>
    <div>
    */
    <div>
      {isAuthenticated && userRole === '2' ? (
        <div className="row">
          <div className="col-2">
            <PrincipalUser />

          </div>
          <div className="col-10">
            <ContainerUser />
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}


export default Dashboard;
