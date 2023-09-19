import React, { useEffect, useState } from 'react'

import './ProgressBar.css'
const ProgressBar = () => {
	const [value, setValue] = useState(0)
	const [percent, setPercent] = useState(value)
	const [status, setStatus] = useState(false)

	useEffect(() => {
		setInterval(() => {
			setValue(prev => prev + 1)
		}, 100);

	}, [])

	const onComplete = () => {
		setStatus(true);
	}

	useEffect(() => {
		if (value >= 100) {
			onComplete();
		}
		setPercent(Math.min(100, Math.max(value, 0)))
	}, [value])

	return (
		<div className="progress-bar-container">
			<h1>Progress Bar</h1>
			<div className="progress-bar">
				<span
					style={{ color: percent > 49 ? "white" : "black" }}
				>{percent.toFixed()}%</span>
				<div
					// style={{ width: `${percent}%` }}
					style={{
						transform: `scaleX(${percent / 100})`,
						transformOrigin: "left"
					}}
					role="progressbar"
					aria-valuemin={0}
					aria-valuemax={100}
					aria-valuenow={percent.toFixed()}
				></div>
			</div>
			<div>{status ? "Complete!": "Loading...!"}</div>
		</div>
	)
}

export default ProgressBar