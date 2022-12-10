import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
	const { query } = useRouter()
	const [ data , setData ] = useState( undefined )
	
	async function getFetch( id ){
		const res = await fetch(`https://www.dnd5eapi.co/api/monsters/${ id }`).then( res => res.json() )		
		if( !res.error ){
			setData( res )
		}
	}

	useEffect(()=>{
		if( !data && query.id ){
			getFetch( query.id )
			return 
		}
	})

	
	return (
		data && <>
			<table width="100%">
				<tbody>
					<tr>
						<td>
							<h1 contentEditable dangerouslySetInnerHTML={{  __html: data.name }}></h1>
							<p>
								<em contentEditable dangerouslySetInnerHTML={{  __html: `${ data.size } ${ data.type }, ${ data.alignment }` }}></em>
							</p>
							{ data.image && <figure style={{ position: 'relative', aspectRatio: '1/1', marginTop: '8px' }}><Image src={ `https://www.dnd5eapi.co${ data.image }` } alt={ data.name } fill /></figure> }
						</td>
					</tr>
					<tr>
						<td>
							<hr />
							<table>
								<tbody>
									<tr><td><strong>AC</strong></td><td>{ data.armor_class }</td></tr>
									<tr><td><strong>HP</strong></td><td>{ data.hit_points } ({ data.hit_points_roll })</td></tr>
								</tbody>
							</table>
							<hr />
						</td>
					</tr>
					<tr>
						<td>
							<table width="100%">
								<tbody>
									<tr>
										<td><TableItem title={ 'FOR' } subValue={ data.strength } /></td>
										<td><TableItem title={ 'DES' } subValue={ data.dexterity } /></td>
										<td><TableItem title={ 'CON' } subValue={ data.constitution } /></td>
										<td><TableItem title={ 'INT' } subValue={ data.intelligence } /></td>
										<td><TableItem title={ 'SAB' } subValue={ data.wisdom } /></td>
										<td><TableItem title={ 'CAR' } subValue={ data.charisma } /></td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
					<tr>
						<td>
							<hr />
							<table width="100%">
								<tbody>
									<tr>
										<td><strong>Deslocamento</strong></td>
										<td align="right"><strong>Nível de desafio</strong></td>
									</tr>
									<tr>
										<td dangerouslySetInnerHTML={{ __html: MapObject(data.speed) }} contentEditable></td>
										<td align="right" dangerouslySetInnerHTML={{ __html: `${ data.challenge_rating } / (${ data.xp } XP)` }} contentEditable></td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
				</tbody>
			</table>
		</>
	)
}

function MapObject( data ) {
	const keys = Object.keys( data );
	const result = keys.map( key => `${ key } ${ data[ key ] }` )
	return result.join( ',' );
}


function TableItem({ title='' , value='' , subValue='' }){
	const [ n_value, setValue ] = useState( value )

	function calcMod( v ){
		let new_v = Math.floor( ( v - 10 )/2 );
		if( new_v >= 0 ){
			setValue(`+${ new_v }`)
		}else{
			setValue(`${ new_v }`)
		}
	}

	function change(event){
		const v = event.target.innerText;
		calcMod( v )
	}

	useEffect(()=>{
		calcMod( subValue )
	},[ subValue ])

	return (
		<table width="100%" className="values">
			<tbody>
			<tr><td><strong>{ title }</strong></td></tr>
			<tr><td>{ n_value }</td></tr>
			<tr><td>(<span contentEditable onInput={ change } dangerouslySetInnerHTML={{ __html: subValue }}></span>)</td></tr>
			</tbody>
		</table>
	)
}