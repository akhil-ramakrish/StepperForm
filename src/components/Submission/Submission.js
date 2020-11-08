import React from 'react'
import '../Form/Form.scss';
 const Submission = (props) => {
    console.log(props.data.fields);
    console.log(props.data.image);
    return (
        <div>
            <div className="w-50 m-auto shadow p-3 mb-5 bg-white rounded">
                    <h5 className="text text-success text-center">Submitted Details</h5>
                    <div className="submission-items-container">
                        <ul className="submission-list">
                            <li><strong>Address:</strong>     {props.data.fields.address}</li>
                            <li><strong>Bedrooms:</strong>    {props.data.fields.bedrooms}</li>
                            <li><strong>Bathrooms:</strong>   {props.data.fields.bathrooms}</li>
                            <li><strong>Description:</strong> {props.data.fields.description}</li>
                        </ul>
                    </div>
            </div>
            <div className="base64-image">
                <strong>Image: </strong>
                <p>{props.data.image}</p>
            </div>
            <div className="mt-10 d-flex justify-content-center">
                <button className="btn btn-success" onClick={()=>window.location.reload()}>Start Over</button>
            </div>
        </div>
    )
}

export default Submission;
