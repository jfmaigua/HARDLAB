import Principal from '../../components/Principal'
import Cookies from "universal-cookie";
import React, { useEffect, useState } from "react";
import Error from "../../components/Error";
import ReportsView from '../../components/admin/ReportsView';

function Reports() {
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
                        <ReportsView/>
                    </div>
                </div>
            </div>
        ) : (
            <Error/>
         )}
       </div>
       
     );
}

export default Reports;