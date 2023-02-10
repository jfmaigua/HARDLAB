import Principal from '../components/Principal'
import ToolsView from '../components/admin/ToolsView';
import Cookies from "universal-cookie";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function ToolUpdate() {
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
                        <ToolsView />
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

export default ToolUpdate;