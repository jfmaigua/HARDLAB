import "../assets/css/App.css";
import PrincipalUser from '../components/PrincipalUser';
import HerramientasUser from "../components/HerramientasUser";
import Cookies from "universal-cookie";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";


const Herramientas = () =>  {
   const cookies = new Cookies();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState("");

    let history = useHistory()
    function handleClick() {
      history.push("/")
    }

    useEffect(() => {
        if (cookies.get('token')) {
        setIsAuthenticated(true);
        setUserRole(cookies.get('rol'));
        }
    }, []);
   
    return (
        <div>
            {isAuthenticated && userRole === '2' ? (
            <div>
          <div className="row">
              <div className="col-2">
                <PrincipalUser />
                
              </div>
              <div className="col-10">
                <HerramientasUser/>
              </div>
          </div>
    </div>
    ) : (
      <div>
       
       Inicie Sesion
       <br/>
       <button onClick={() => handleClick()}>
          Regresar al Inicio
       </button>
       
     </div>
   )}
 </div>
 
);
  }


export default Herramientas;
