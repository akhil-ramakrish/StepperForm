import React, { useState } from "react";
import "./Form.scss";
import Details from "../Details/Details";
import DragnDrop from "../DragandDrop/DragandDrop";
import { csv } from "d3";
import Data from "../../../src/data.csv";
import Submission from '../Submission/Submission';

const MainForm = (props) => {
	const [csvData, setCsvData] = useState();
	const [details,setDetails] = useState({});
	const [imageOutput,setImageOutput] = useState(null);

	const csvTrial = () => {
		csv(`${Data}`).then((data) => {
			setCsvData(data[0]);
			props.stepCountUpdate();
		});
	};

	const getDetails=(details)=>{
         setDetails(details);
	}
	const getImageInfo=(imageResponse)=>{
		setImageOutput(imageResponse)
	}
	switch (props.step) {
		case 1:
			return (
				<div className="btn-container">
					<button
						className="btn btn-primary"
						onClick={() => props.stepCountUpdate()}
					>
						Add from Scratch
					</button>
					<button className="btn btn-success" onClick={() => csvTrial()}>
						Upload as CSV
					</button>
				</div>
			);
		case 2:
			return <Details updateStepCount={props.stepCountUpdate} 
			        data={csvData} storeDetails={getDetails}/>;
		case 3:
			return <DragnDrop storeImageInfo={getImageInfo} updateStepCount={props.stepCountUpdate}/>;
		case 4: return <Submission data={{'fields':details,'image':imageOutput}}/>
		default:
			return null;
	}
};

export default MainForm;
