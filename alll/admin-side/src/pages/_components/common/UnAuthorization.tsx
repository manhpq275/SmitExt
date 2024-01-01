import './style.scss';
import React from 'react';

export default function UnAuthorization() {
	const handleClick = () => {
		window.history.go(-2);
	};

	return (
		<div className="athor-page">
			<div className="d-flex justify-content-center">
				<img
					src="https://andelav4prod.wpengine.com/wp-content/uploads/2018/07/c1eb4-1m7kktezf98gz6adpl5dgbq.jpeg"
					alt=""
				/>
				<br />
			</div>
			<div className="d-flex justify-content-center">
				<button className="login-btn" onClick={handleClick}>
					Go Back
				</button>
			</div>
		</div>
	);
}
