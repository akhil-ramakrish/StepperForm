import React, { useState, useEffect } from "react";
import "../Form/Form.scss";
const Details = (props) => {
	const [errorBedroom, setErrorBedroom] = useState(false);
	const [errorBathroom, setErrorBathroom] = useState(false);
	const [submitStatus, setSubmitStatus] = useState(false);
	const [bedroom, setBedroom] = useState('');
	const [bathroom, setBathroom] = useState('');
	const [address, setAddress] = useState("");
	const [description, setDescription] = useState("");
	const getUrl = 'https://a4f723c7-e32b-4e6b-94cd-70022900bb02.mock.pstmn.io/address';
	useEffect(() => {
		if (props.data) {
			setAddress(props.data.address);
			setBedroom(props.data.bedrooms);
			setBathroom(props.data.bathrooms);
			setDescription(props.data.description);
		}
		else{
			fetch(getUrl)
			.then((res)=>res.json())
			.then((data)=>setAddress(data.address))
			.catch((err)=>console.log(err));
		}
	}, [props.data]);

	useEffect(() => {
		if (bedroom && bathroom && !errorBathroom && !errorBedroom) {
			setSubmitStatus(true);
		} else {
			setSubmitStatus(false);
		}
	}, [bedroom, bathroom, errorBedroom, errorBathroom]);

	const manageBedrooms = (e) => {
		if (e.target.value > 10) {
			setErrorBedroom(true);
			setBedroom(e.target.value);
		} else if (e.target.value < 1) {
			setErrorBedroom(true);
			setBedroom(e.target.value);
		} else {
			setErrorBedroom(false);
			setBedroom(e.target.value);
		}
	};
	const manageBathrooms = (e) => {
		if (e.target.value > 5) {
			setErrorBathroom(true);
			setBathroom(e.target.value);
		} else if (e.target.value < 1) {
			setErrorBathroom(true);
			setBathroom(e.target.value);
		} else {
			setErrorBathroom(false);
			setBathroom(e.target.value);
		}
	};

	const submission = (event) => {
		event.preventDefault();
		props.storeDetails({
			'address':address,
			'bedrooms':bedroom,
			'bathrooms':bathroom,
			'description':description
		});
		props.updateStepCount();
	};
	return (
		<div className="w-50 m-auto shadow p-3 mb-5 bg-white rounded">
			<form onSubmit={(e) => submission(e)}>
				<div className="form-group">
					<label>Address</label>
					<textarea
						id="address"
						name="address"
						required
						className="form-control"
						value={address}
						onChange={(e) => {
							setAddress(e.target.value);
						}}
					></textarea>
				</div>
				<div className="form-group">
					<label>Bedroom</label>
					<input
						type="number"
						id="bedroom"
						required
						className="form-control"
						value={bedroom}
						onChange={(e) => manageBedrooms(e)}
						style={
							errorBedroom
								? {
										borderColor: "red",
										boxShadow: "2px 2px 3px 3px #FDD2D2",
								  }
								: null
						}
					/>
					{errorBedroom ? (
						<small className="error">Please select a value from 1 to 10</small>
					) : null}
				</div>
				<div className="form-group">
					<label>Bathroom</label>
					<input
						type="number"
						id="bathroom"
						onChange={(e) => manageBathrooms(e)}
						required
						className="form-control"
						value={bathroom}
						style={
							errorBathroom
								? {
										borderColor: "red",
										boxShadow: "2px 2px 3px 3px #FDD2D2",
								  }
								: null
						}
					/>
					{errorBathroom ? (
						<small className="error">Please select a value from 1 to 5</small>
					) : null}
				</div>
				<div className="form-group">
					<label>Description</label>
					<textarea
						id="description"
						name="address"
						className="form-control"
						value={description}
						onChange={(e) => {
							setDescription(e.target.value);
						}}
					></textarea>
				</div>
				<div className="d-flex justify-content-center">
					<button
						type="submit"
						disabled={!submitStatus}
						className="btn btn-primary px-5"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default Details;
