import PrincipalUser from '../components/PrincipalUser';
import FormularioDetalleEquipo from '../components/FormularioDetalleEquipo';
import Cookies from "universal-cookie";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Error from "../components/Error"

function RegistrarDetalleEquipo() {
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
                            <FormularioDetalleEquipo />
                        </div>
                    </div>
                </div>
            ) : (
                <Error/>
            )}
        </div>

    );
}

export default RegistrarDetalleEquipo;