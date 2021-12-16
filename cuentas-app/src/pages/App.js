import React, { useState, useEffect } from 'react';

export default function App(props) {
	const [cuentas, setCuentas] = useState([]);
	const [singleCuenta, setCuenta] = useState({
		amount: '',
		for: ''
	});
	useEffect(() => {
		(async () => {
			try {
				const response = await fetch('/api/cuentas');
				const data = await response.json();
				setCuentas(data);
			} catch (error) {
				console.error(error);
			}
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

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			const response = await fetch('/api/cuentas', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(singleCuenta)
			});
			const data = await response.json();
			setCuentas([...cuentas, data]);
			setCuenta({
				amount: '',
				for: ''
			});
		} catch (error) {
			console.error(error);
		}
	};

	const handleChange = e => {
		setCuenta({ ...singleCuenta, [e.target.id]: e.target.value });
	};

	return (
		<div className="AppPage">
			This is the {props.page} page
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					id="amount"
					value={singleCuenta.amount}
					onChange={handleChange}
				/>
				<input
					type="text"
					id="for"
					value={singleCuenta.for}
					onChange={handleChange}
				/>
				<input type="submit" value="Submit" />
			</form>
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
