import Principal from '../components/Principal';
import DetailForm from '../components/admin/DetailForm';
import Cookies from "universal-cookie";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";;

function AddDetail() {
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
            {isAuthenticated && userRole === '1' ? (
            <div>
                <div className="row">
                    <div className="col-2">
                        <Principal />
                    </div>
                    <div className="col-10">
                        <DetailForm />
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

export default AddDetail;