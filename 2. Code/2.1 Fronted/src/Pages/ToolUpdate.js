import React from 'react'
import Principal from '../Components/Principal';
import ToolsTable from '../Components/ToolsTable';

function ToolUpdate() {
    return (
        <div>
            <div>
                <div className="row">
                    <div className="col-2">
                        <Principal />
                    </div>
                    <div className="col-10">
                        <ToolsTable />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ToolUpdate;