import Link from 'next/link'

export default function Home() {
	return (
		<div className='box'>
			<h1>RPG Companion</h1>
			<ul className='menu'>
				<Link href="/monster">Monster mini sheet</Link>
				<Link href="/content">Content mini sheet</Link>
				<Link href="/weather">Weather Generator</Link>
			</ul>
		</div>
	)
}