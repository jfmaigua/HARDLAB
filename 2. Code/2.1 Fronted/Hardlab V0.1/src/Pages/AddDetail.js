import React from 'react'
import Principal from '../Components/Principal';
import DetailForm from '../Components/DetailForm'

function AddDetail() {
    return (
        <div>
            <div>
                <div className="row">
                    <div className="col-2">
                        <Principal />
                    </div>
                    <div className="col-10">
                        <DetailForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddDetail;