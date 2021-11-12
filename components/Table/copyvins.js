import React, { useEffect } from 'react';
import useState from 'react-usestateref'
import ReactTooltip from 'react-tooltip'

const copyvins = (props) => {

    var [texto, setTexto, textoRef] = useState('')
    var [copiado, setCopiado, copiadoRef] = useState(false)

    // useEffect(() => {
    //     if(props.vins){

    //     }
    // },[props])

    const copiar_vins = () =>{
        let texto_ = props.vins.join('\n')
        setTexto(texto_)

        setTimeout(() => {
            let text_to_copy = document.getElementById('vins_a_copiar');
            text_to_copy.select();
            document.execCommand('copy');
            setCopiado(true)
        }, 100);

        setTimeout(() => {
            setCopiado(false)
        }, 2000);
    }

    return (
        <div onClick={()=>copiar_vins()} className="cursor-pointer">
            <svg data-tip data-for='copiar' class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path></svg>
            <ReactTooltip backgroundColor="#000" id='copiar' effect='solid' place='bottom' aria-haspopup='true' role='example'>
                {copiadoRef.current ? 'Copied!' : 'Copy VINS'}
            </ReactTooltip>
            <textarea id="vins_a_copiar" className="absolute bottom-0 left-0 w-1 h-1 " value={textoRef.current} />
        </div>
    );
}

export default copyvins;