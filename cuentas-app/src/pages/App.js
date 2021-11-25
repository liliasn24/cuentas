import React, { useState, useEffect } from 'react';

export default function App(props) {
	const [cuentas, setCuentas] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch('/api/cuentas');
				const data = await response.json();
				setCuentas(data);
			} catch (error) {}
		})();
	}, []);

	return (
		<div className="AppPage">
			This is the {props.page} page
			<ul>
				{cuentas.map(cuenta => {
					return (
						<li key={cuenta._id}>
							This is the first cuenta: In {cuenta.for} we spent{cuenta.amount}
						</li>
					);
				})}
			</ul>
		</div>
	);
}
