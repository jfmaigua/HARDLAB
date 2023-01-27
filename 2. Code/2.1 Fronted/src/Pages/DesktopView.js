import React from 'react'
import Principal from '../Components/Principal';
import DesktopTable from '../Components/DesktopTable';

function DesktopView() {
    return (
        <div>
            <div>
                <div className="row">
                    <div className="col-2">
                        <Principal />
                    </div>
                    <div className="col-10">
                        <DesktopTable/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DesktopView;