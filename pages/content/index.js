import Card from '/components/cards'

export default function Home() {
	return (
		<Card>
			<h1 contentEditable suppressContentEditableWarning={true}>Título da nota</h1>
			<p contentEditable suppressContentEditableWarning={true} className="subtitle">Subtítulo da nota</p>
			<hr />
			<p className="content quote" suppressContentEditableWarning={true} contentEditable></p>
		</Card>
	)
}