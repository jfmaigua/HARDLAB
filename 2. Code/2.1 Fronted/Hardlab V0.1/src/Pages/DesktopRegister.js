import React from 'react'
import Principal from '../Components/Principal';
import DesktopForm from '../Components/DesktopForm';

function DesktopRegsiter() {
    return (
        <div>
            <div>
                <div className="row">
                    <div className="col-2">
                        <Principal />
                    </div>
                    <div className="col-10">
                        <DesktopForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DesktopRegsiter;