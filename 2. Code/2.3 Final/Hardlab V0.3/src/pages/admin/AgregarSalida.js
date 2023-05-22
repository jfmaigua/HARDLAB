import Principal from '../../components/Principal';
//import DetailForm from '../components/admin/DetailForm';
import Cookies from "universal-cookie";
import React, { useEffect, useState } from "react";
import Error from "../../components/Error";
import SalidasForm from '../../components/admin/SalidasForm';

function AgregarSalida() {
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
             {isAuthenticated && (userRole === '1' || userRole==='0') ? (
            <div>
                <div className="row">
                    <div className="col-2">
                        <Principal />
                    </div>
                    <div className="col-10">
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

export default AgregarSalida;