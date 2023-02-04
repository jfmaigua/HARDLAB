import React from 'react'
import Principal from '../Components/Principal';
import PersonForm from '../Components/PersonForm'

function PersonRegister() {
    return (
        <div>
            <div>
                <div className="row">
                    <div className="col-2">
                        <Principal />
                    </div>
                    <div className="col-10">
                        <PersonForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonRegister;