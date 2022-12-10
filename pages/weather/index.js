import { redirect } from "next/dist/server/api-utils"
import { Head } from "next/document"
import Script from 'next/script'
import { useEffect, useState } from "react"
import Hex from "../../components/Hex"

const month = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];


export default function Home() {
    const [ log, setLog ] = useState([])
    const [ Weather ] = useState( new HexFlower( onChange ) )
    const [ Time, setTime ] = useState( new Date( 0 ) )

    function onChange( data ){
        setLog( Weather.getLog() )
    }

    useEffect(()=>{
        nextTime( 'hour', 5 )
        Weather.start()
        setLog( Weather.getLog() )

        return
    }, [ ])

    useEffect(()=>{
        // self.print()
    }, [ log ])

    function PrintWeather( tag = undefined ){
        nextTime( tag )
        Weather.next()
    }

    const stamp_year = 1000 * 60 * 60 * 24;
    const stamp_day = 1000 * 60 * 60;

    function nextTime( tag = undefined, incrise = 1 ){
        if( tag ){
            const tt = new Date( Time )
            switch (tag) {
                case 'hour':
                    tt.setTime( tt.getTime() + ( incrise * stamp_day ) )
                    break;
                case 'day':
                    tt.setTime( tt.getTime() + ( incrise * stamp_year ) )
                    tt.setHours( 2 )
                    tt.setMinutes( 0 )
                    break;
                case 'year':
                    const current_year = year( tt.getTime() )
                    tt.setTime( ( current_year * 365 * stamp_year ) + stamp_year )
                    tt.setHours( 2 )
                    tt.setMinutes( 0 )
                    break;
                default:
                    break;
            }

            setTime( tt )
        }
    }

    function year( stamp = 1 ){
        return Math.floor( stamp / ( stamp_year * 365 ) ) + 1
    }

    function day( stamp = 1 ){
        let day = ( Math.floor( stamp / ( stamp_day * 24 ) ) % 365 ) + 1
        return day
    }

    function zz( num ){
        if( num < 10 ){
            return `0${ num }`
        }
        return `${ num }`
    }

    function getDate( time = null ) {
        if(!time){
            return 'sem marca de tempo'
        }
        return `${ zz( time.getUTCHours() ) }:${ zz( time.getUTCMinutes() ) } :: dia ${ day( time.getTime() ) } / ano ${ year( time.getTime() ) }`
    }

	return (<>
        <div style={{ textAlign: 'center', margin: '2rem 0 10rem' }}>
            <p style={{ fontSize: '10px', fontFamily: 'monospace', marginBottom: '.2cm' }}>{ getDate( Time ) }</p>
            <h1>{ Weather.getCurrent() && Weather.getCurrent().text }</h1>
        </div>

        <div>
            <button onClick={ () => PrintWeather() }>Gerar</button>
            <button onClick={ () => PrintWeather( 'hour' ) }>+1 hora</button>
            <button onClick={ () => PrintWeather( 'day' ) }>+1 dia</button>
            <button onClick={ () => PrintWeather( 'year' ) }>+1 ano</button>
        </div>
    </>)
}

class HexFlower{
    static flowerFlow = [
        { ref: 'A', linkTo: [ 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G' ] },
    
        { ref: 'B', linkTo: [ 'I', 'I', 'J', 'J', 'C', 'C', 'A', 'A', 'G', 'G', 'H' ] },
        { ref: 'C', linkTo: [ 'J', 'J', 'K', 'K', 'L', 'L', 'D', 'D', 'A', 'A', 'B' ] },
        { ref: 'D', linkTo: [ 'C', 'C', 'L', 'L', 'M', 'M', 'N', 'N', 'E', 'E', 'A' ] },
        { ref: 'E', linkTo: [ 'A', 'A', 'D', 'D', 'N', 'N', 'O', 'O', 'P', 'P', 'F' ] },    
        { ref: 'F', linkTo: [ 'G', 'G', 'A', 'A', 'E', 'E', 'P', 'P', 'Q', 'Q', 'R' ] },
        { ref: 'G', linkTo: [ 'H', 'H', 'B', 'B', 'A', 'A', 'F', 'F', 'R', 'R', 'S' ] },
    
        { ref: 'H', linkTo: [ 'P', 'P', 'I', 'I', 'B', 'B', 'G', 'G', 'S', 'S', 'L' ] },
        { ref: 'I', linkTo: [ 'O', 'O', 'I', 'I', 'J', 'J', 'B', 'B', 'H', 'H', 'K' ] },
        { ref: 'J', linkTo: [ 'N', 'N', 'R', 'R', 'K', 'K', 'C', 'C', 'B', 'B', 'I' ] },
        { ref: 'K', linkTo: [ 'M', 'M', 'Q', 'Q', 'I', 'I', 'L', 'L', 'C', 'C', 'J' ] },
        { ref: 'L', linkTo: [ 'K', 'K', 'P', 'P', 'H', 'H', 'M', 'M', 'D', 'D', 'C' ] },
        { ref: 'M', linkTo: [ 'L', 'L', 'O', 'O', 'M', 'M', 'K', 'K', 'N', 'N', 'D' ] },
        { ref: 'N', linkTo: [ 'D', 'D', 'M', 'M', 'R', 'R', 'J', 'J', 'O', 'O', 'E' ] },
        { ref: 'O', linkTo: [ 'E', 'E', 'N', 'N', 'Q', 'Q', 'I', 'I', 'M', 'M', 'P' ] },
        { ref: 'P', linkTo: [ 'F', 'F', 'E', 'E', 'O', 'O', 'H', 'H', 'L', 'L', 'Q' ] },
        { ref: 'Q', linkTo: [ 'R', 'R', 'F', 'F', 'P', 'P', 'Q', 'Q', 'K', 'K', 'O' ] },
        { ref: 'R', linkTo: [ 'S', 'S', 'G', 'G', 'F', 'F', 'Q', 'Q', 'J', 'J', 'S' ] },
        { ref: 'S', linkTo: [ 'S', 'S', 'H', 'H', 'G', 'G', 'R', 'R', 'S', 'S', 'S' ] }
    ]

    static dictionary = {
        'A': { key:'A' ,description: 'nenhuma mudança no clima', note: '', text: 'O clima continua como estava antes.' },
        'B': { key:'B' ,description: 'chuvas intensas', note: 'Furtividade +1 / Percepção -1', text: 'Uma chuva forte começa.' },
        'C': { key:'C' ,description: 'nuvens pesadas', note: '', text: 'O céu está completamente fechado.' },
        'D': { key:'D' ,description: 'parcialmente ensolarado', note: '', text: 'O céu está limpo, algumas núvem cobrem o sol a maior parte do tempo.' },
        'E': { key:'E' ,description: 'uma brisa constante', note: '', text: 'Uma brisa fresca corre pelos campos.' },
        'F': { key:'F' ,description: 'sol forte', note: '', text: 'O sol está forte e o calor é intenso.' },
        'G': { key:'G' ,description: 'muitos raios e ventos fortes', note: '', text: 'Ventos e uma chuva forte começam.' },
        'H': { key:'H' ,description: 'muitos raios e ventos fortes', note: '', text: 'Ventos e uma chuva forte começam.' },
        'I': { key:'I' ,description: 'nuvens de tempestade e baixa visibilidade', note: 'Visão levemente obstruída', text: 'Nuvem negras e uma nevoa densa cercam a redondeza.' },
        'J': { key:'J' ,description: 'trovões e sol', note: '25% para ver um arcoiris', text: 'Um clima estranho de sol e chuva.' },
        'K': { key:'K' ,description: 'nublado', note: '', text: 'O céu está nublado.' },
        'L': { key:'L' ,description: 'parcialmente nublado', note: '', text: 'O céu está parcialmente nublado.' },
        'M': { key:'M' ,description: 'ensolarado', note: '5% para ver um arcoiris', text: 'Um sol ameno, uma brisa leve e algumas nuvens.' },
        'N': { key:'N' ,description: 'ensolarado com nuvens esparsas', note: '', text: 'Um sol ameno e grandes núvens são vistas no céu.' },
        'O': { key:'O' ,description: 'nublado com ventos leves', note: 'DC 10 para chuva leve', text: 'O céu nublado e ventos leves.' },
        'P': { key:'P' ,description: 'sol opressivo', note: '', text: 'O sol está forte e intenso.' },
        'Q': { key:'Q' ,description: 'sol escaldante', note: 'Exaustão com DC5 CON', text: 'O sol está quente, o clima é seco e árido.' },
        'R': { key:'R' ,description: 'muitos raios e ventos fortes', note: '', text: 'Ventos e uma chuva forte começam.' },
        'S': { key:'S' ,description: 'disastre natural', note: 'visibilidade zero / Exaustão com DC10 CON', text: 'Um desastre natural acontece!' }
    }

    constructor( onChange = () =>{ console.log("Missing a callback for change event") } ){
        this.current = undefined
        this.log = []
        this.onChange = onChange

        return this
    }

    start(){
        if(!this.current){
            this.current = 'M'
            this.setLog( 'M' )
            this.onChange( 'M' )
        }
    }

    getCurrent(){
        return HexFlower.dictionary[ this.current ]
    }

    getRef( ref ){
        return HexFlower.flowerFlow.find( item => item.ref === ref )
    }

    setLog( key ){
        const data = HexFlower.dictionary[ key ]
        this.log = [ ...this.log, data ]
    }

    getLog(){
        return this.log
    }

    next(){
        if( !this.current ){
            console.log( this.current )
            return
        }

        const dices = HexFlower.rollDice() + HexFlower.rollDice()
        const currentRef = this.getRef( this.current )
        const nextStatus = currentRef.linkTo[ dices - 2 ]
        this.setNext( nextStatus )
    }

    setNext( key ){
        console.log( `travelling ${ this.current } to ${ key }` )
        this.current = key
        this.setLog( key )
        this.onChange( this.getCurrent() )
    }

    static rollDice( max = 6 ){ return Math.floor( Math.random() * max + 1) }
}