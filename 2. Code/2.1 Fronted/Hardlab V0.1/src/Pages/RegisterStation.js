import React from 'react'
import Principal from '../Components/Principal';
import StationForm from '../Components/StationForm'

function RegisterStation() {
    return (
        <div>
            <div>
                <div className="row">
                    <div className="col-2">
                        <Principal />
                    </div>
                    <div className="col-10">
                        <StationForm/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterStation;