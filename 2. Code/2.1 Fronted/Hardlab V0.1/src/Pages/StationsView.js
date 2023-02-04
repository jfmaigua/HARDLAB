import React from 'react'
import Principal from '../Components/Principal';
import StationView from '../Components/StationView'

function StationsView() {
    return (
        <div>
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
        </div>
    )
}

export default StationsView;