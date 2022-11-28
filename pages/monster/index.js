import Attributes from '/components/attributes'
import Card from '/components/cards'

export default function Home() {
	return (
		<Card aspect="5/4">
			<h1 contentEditable suppressContentEditableWarning={true}>Nome da criatura</h1>
			<p contentEditable suppressContentEditableWarning={true} className="subtitle">tamanho, alinhamento</p>
			<hr />
			<Attributes />
			<table width="100%" className="content">
				<tr>
					<td>Deslocamento: <span contentEditable suppressContentEditableWarning={true}>9 metros</span></td>
					<td style={{ textAlign: 'right' }}>Nível de desafio <span contentEditable suppressContentEditableWarning={true}>1 ( 100 XP )</span></td>
				</tr>
			</table>			
		</Card>
	)
}