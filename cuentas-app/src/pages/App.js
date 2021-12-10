import React, { useState, useEffect } from 'react';

export default function App(props) {
	const [cuentas, setCuentas] = useState([]);
	const [singleCuenta, setCuenta] = useState({});
	useEffect(() => {
		(async () => {
			try {
				const response = await fetch('/api/cuentas');
				const data = await response.json();
				setCuentas(data);
			} catch (error) {}
		})();
	}, []);

	const handleClick = async e => {
		try {
			const response = await fetch('/api/cuentas', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					amount: '100',
					for: 'Wholefoods'
				})
			});
			const data = await response.json();
			setCuentas([...cuentas, data]);
			setCuenta(data);
		} catch (error) {
			console.error(error);
		}
	};
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
			<button onClick={handleClick}>click me to enter a new cuenta</button>
		</div>
	);
}
