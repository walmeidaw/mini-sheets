import { useState } from "react"

export default function Home() {
	const [ data , setData ] = useState({})

	return (		
		<>
			<table width="100%">
				<tbody>
					<tr>
						<td>
							<h1 contentEditable dangerouslySetInnerHTML={{  __html: data.title || 'Título' }}></h1>
							<p>
								<em contentEditable dangerouslySetInnerHTML={{  __html: data.subtitle || 'subtítulo' }}></em>
							</p>
						</td>
					</tr>
					<tr>
						<td>
							<hr />
							<div contentEditable dangerouslySetInnerHTML={{  __html: data.content || 'Seu texto aqui' }}></div>
						</td>
					</tr>
				</tbody>
			</table>
		</>
	)
}