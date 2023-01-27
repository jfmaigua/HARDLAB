import React from 'react'
import Principal from '../Components/Principal';
import PersonTable from '../Components/PersonTable'

function PersonView() {
    return (
        <div>
            <div>
                <div className="row">
                    <div className="col-2">
                        <Principal />
                    </div>
                    <div className="col-10">
                        <PersonTable/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonView;