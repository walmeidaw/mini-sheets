import { useEffect, useState } from "react";

const PAGE_ID = 'SHEET_MONSTER'

export default function Home() {
	const [ data , setData ] = useState({})

	function onInput( event ){
		event.preventDefault()

		const { target } = event
		const newData = { ...data, [ target.id ] : target.innerText } 
		setData( newData )

		if( window && window.localStorage ){
			localStorage.setItem( PAGE_ID, JSON.stringify( newData ) );
		}

		return false
	} 

	useEffect(()=>{
		if( window && window.localStorage ){
			const data = JSON.parse( localStorage.getItem( PAGE_ID ) )
			setData( data )
		}
		return
	},[])

	return (
		<>
			<table width="100%">	
				<tbody>
					<tr>
						<td>
							<h1 contentEditable id="name" onBlur={ onInput } dangerouslySetInnerHTML={{  __html: data.name || 'Título' }}></h1>
							<p>
								<em contentEditable id="line" onBlur={ onInput } dangerouslySetInnerHTML={{  __html: data.line || 'tipo e tamanho, alinhamento' }}></em>
							</p>
						</td>
					</tr>
					<tr>
						<td>
							<hr />
							<table>
								<tbody>
									<tr><td><strong>AC</strong></td><td id="ac" contentEditable onBlur={ onInput } dangerouslySetInnerHTML={{  __html: data.ac || 10 }}></td></tr>
									<tr><td><strong>HP</strong></td><td id="hp" contentEditable onBlur={ onInput } dangerouslySetInnerHTML={{  __html: data.hp || '10 (4d6)' }}></td></tr>
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
										<td><TableItem title={ 'FOR' } subValue={ data.strength || 10 } /></td>
										<td><TableItem title={ 'DES' } subValue={ data.dexterity || 10 } /></td>
										<td><TableItem title={ 'CON' } subValue={ data.constitution || 10 } /></td>
										<td><TableItem title={ 'INT' } subValue={ data.intelligence || 10 } /></td>
										<td><TableItem title={ 'SAB' } subValue={ data.wisdom || 10 } /></td>
										<td><TableItem title={ 'CAR' } subValue={ data.charisma || 10 } /></td>
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
										<td id="speed" onBlur={ onInput } dangerouslySetInnerHTML={{ __html: data.speed || '9 metros' }} contentEditable></td>
										<td id="challenge" align="right" onBlur={ onInput } dangerouslySetInnerHTML={{ __html: data.challenge || '1/4 (100 XP)' }} contentEditable></td>
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
			<tr><td>(<span contentEditable onBlur={ change } dangerouslySetInnerHTML={{ __html: subValue }}></span>)</td></tr>
			</tbody>
		</table>
	)
}