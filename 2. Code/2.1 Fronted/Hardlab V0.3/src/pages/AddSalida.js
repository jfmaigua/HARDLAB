import Principal from '../components/Principal';
import SalidasForm from '../components/admin/SalidasForm';
import Cookies from "universal-cookie";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Error from "../components/Error";

function AddSalida() {
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
                        .   
                        <SalidasForm />
                    </div>
                </div>
            </div>
           ) : (
            <Error/>
      )}
    </div>
    
  );
}

export default AddSalida;