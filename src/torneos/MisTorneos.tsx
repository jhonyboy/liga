import { useEffect, useState } from 'react';
import Header from '../header/Header';
import { useStore } from '../state/state';
import { tipoLiga } from '../services/tipoLiga';
import InfoTournament from '../hooks/ownerLeague/infoTournament';
import BarMenuOwner from '../hooks/bar/BarMenuOwner';

export default function MisTorneos() {
	const { token } = useStore((state) => state);
	const [torneos, setTorneos] = useState([]);
	
	const misTorneos = async () => {
		const request = await fetch('http://localhost:3000/api/torneo/myTournament', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
		});
		const response = await request.json();
		console.log("Mis torneos:", response);
		setTorneos(response.data || []);
	};
	
	useEffect( () => {
		misTorneos();
	}, [] );
	
	console.log("Pidiendo tipos de torneos");
	useEffect ( () => {
		const getTypes = async () => {
			const tipos = await tipoLiga(token);
			console.log("Tipos de liga en MisTorneos:", tipos);
		};
		getTypes();
	} , [] );

	console.log("Torneos en estado:", torneos );

  return (
	<>
		<Header />
		<div>
			
	  		<h1>Mis Torneos</h1>
			<div style={{ textAlign:'center' }} >
				<div className="select is-primary">
					<select>
						<option>Selecicona un torneo</option>
						<option>With options</option>
					</select>
				</div>
				<InfoTournament />
			</div>
		</div>
	</>
	
  );
}

