import Principal from '../../components/Principal';
import StationView from '../../components/admin/Station/StationView';
import Cookies from "universal-cookie";
import React, { useEffect, useState } from "react";
import Error from "../../components/Error"

function StationsView() {
    const cookies = new Cookies();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState("");



    useEffect(() => {
        if (cookies.get('token')) {
            setIsAuthenticated(true);
            setUserRole(cookies.get('rol'));
        }
    }, [cookies]);

    return (
        <div>
             {isAuthenticated && (userRole === '1' || userRole==='0') ? (
                <div>
                    <div className="row">
                        <div className="col-2">
                            <Principal />
                        </div>
                        <div className="col-10">
                            <StationView />
                        </div>
                    </div>
                </div>
            ) : (
                <Error/>
            )}
        </div>

    );
}

export default StationsView;