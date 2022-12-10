import Style from './index.module.scss'

export default function Hex() {
    return (
        <div style={{ float: 'left', width: '400px' }}>
            <div className={ Style.row }>
                <div className={ Style.hex }><div className={ Style.left}></div><div className={ Style.middle }></div><div className={ Style.right }></div></div>
                <div className={ [ Style.hex, Style.even ] }><div className={ Style.left}></div><div className={ Style.middle }></div><div className={ Style.right }></div></div>
                <div className={ Style.hex }><div className={ Style.left}></div><div className={ Style.middle }></div><div className={ Style.right }></div></div>
            </div>
            <div className={ Style.row }>
                <div className={ Style.hex }><div className={ Style.left}></div><div className={ Style.middle }></div><div className={ Style.right }></div></div>
                <div className={ [ Style.hex, Style.even ] }><div className={ Style.left}></div><div className={ Style.middle }></div><div className={ Style.right }></div></div>
                <div className={ Style.hex }><div className={ Style.left}></div><div className={ Style.middle }></div><div className={ Style.right }></div></div>
            </div>
            <div className={ Style.row }>
                <div className={ Style.hex }><div className={ Style.left}></div><div className={ Style.middle }></div><div className={ Style.right }></div></div>
                <div className={ `${ Style.hex } ${ Style.even }` }><div className={ Style.left}></div><div className={ Style.middle }></div><div className={ Style.right }></div></div>
                <div className={ Style.hex }><div className={ Style.left}></div><div className={ Style.middle }></div><div className={ Style.right }></div></div>
            </div>
        </div>
    )
}