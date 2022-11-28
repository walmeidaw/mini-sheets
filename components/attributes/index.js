import Style from './index.module.scss'

export default function Attributes({ children, data }){
    return (
        <section className={ Style.sheet }>
            <Item layoutPosition={ 'A1' } label="PV" />
            <Item layoutPosition={ 'A2' } label="CA" before={""} after={""} />
            <Item layoutPosition={ 'B1' } label="FOR" />
            <Item layoutPosition={ 'B2' } label="DES" />
            <Item layoutPosition={ 'B3' } label="CON" />
            <Item layoutPosition={ 'B4' } label="INT" />
            <Item layoutPosition={ 'B5' } label="SAB" />
            <Item layoutPosition={ 'B6' } label="CAR" />
        </section>
    )
}

function Item({ label, layoutPosition = '', before = '(', after = ')' }){
    return (
        <div className={ Style.item } style={{ gridArea: layoutPosition }}>
            <div className={ Style.label }>{ label }</div>
            <div className={ Style.main } contentEditable id="value"></div>
            <div className={ Style.bellow }>{ before }<span contentEditable id="info"></span>{ after }</div>
        </div>
    )
}