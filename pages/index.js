import Link from 'next/link'

export default function Home() {
	return (
		<ul className='menu'>
			<Link href="/monster">Monster mini sheet</Link>
			<Link href="/content">Content mini sheet</Link>
		</ul>
	)
}