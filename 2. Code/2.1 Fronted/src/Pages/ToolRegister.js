import React from 'react'
import Principal from '../Components/Principal';
import ToolForm from '../Components/ToolForm'

function ToolRegister() {
    return (
        <div>
            <div>
                <div className="row">
                    <div className="col-2">
                        <Principal />
                    </div>
                    <div className="col-10">
                        <ToolForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ToolRegister;