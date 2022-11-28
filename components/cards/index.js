import Style from './index.module.scss'

export default function Card({ children, aspect = 'auto' }){
    return (<main style={{ aspectRatio: aspect }} className={ Style.card }>{ children }</main>)
}