import React, { useState, useEffect } from "react";
import "./App.scss";
import Form from "./components/Form/Form";

function App() {
	const [stepCount, setStepCount] = useState(1);
	const [step1, setStep1] = useState("");
	const [step2, setStep2] = useState("");
	const [step3, setStep3] = useState("");

	useEffect(() => {
		if (stepCount === 1) {
			setStep1("step-active");
		} else if (stepCount === 2) {
			setStep2("step-active");
			setStep1("step-success");
		} else if (stepCount === 3) {
			setStep3("step-active");
			setStep2("step-success");
		} else {
			setStep3("step-success");
		}
	}, [stepCount]);

	const updateStepCount = () => {
		setStepCount((count) => count + 1);
	};
	return (
		<div className="App">
			<ul className="steps">
				<li className={`step ${step1}`}>
					<div className="step-content">
						<span className="step-circle">1</span>
						<span className="step-text">Step 1</span>
					</div>
				</li>
				<li className={`step ${step2}`}>
					<div className="step-content">
						<span className="step-circle">2</span>
						<span className="step-text">Step 2</span>
					</div>
				</li>
				<li className={`step ${step3}`}>
					<div className="step-content">
						<span className="step-circle">3</span>
						<span className="step-text">Step 3</span>
					</div>
				</li>
			</ul>
			<div className="form-container">
				<Form stepCountUpdate={updateStepCount} step={stepCount} />
			</div>
		</div>
	);
}

export default App;
