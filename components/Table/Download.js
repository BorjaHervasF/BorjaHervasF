import React, { useEffect, useRef } from 'react'
import ReactTooltip from "react-tooltip";
import Loader from '../Loader'
import useState from 'react-usestateref'
import $ from 'jquery'
import useFade from '../useFade'
import {DownloadExcel} from '../functions/datafunctions'
import {API} from '../functions/apiurl'


const Download = (props) => {

    const [isVisible, setVisible, fadeProps] = useFade();
    const [downloading, setDownloading, downloadingRef] = useState(false);
    const [downloadingF, setdownloadingF, downloadingFRef] = useState(false);
    const childRef = useRef();

    const getDownload = () =>{
        setDownloading(true)

        let arrayColumnas = [] // Este es el array de columnas
        let arrayAccessors = [] // Esto lo usaremos para insertar datos en el arrayDatas
        let arrayData = [] // Este es el array de Data que usaremos para el excel

        let actions = false;


        // Vamos a poner los datos en sus respectivos arrays de columnas y accessors
        props.columns.forEach((columna)=>{
            if('Header' in columna){
                if(!('noimprimir' in columna)){
                    if(columna.accessor !== 'actions'){
                        arrayColumnas.push(columna.Header)
                        arrayAccessors.push(columna.accessor)
                    }else if(columna.accessor === 'actions'){
                        actions = true
                    }
                }
            }
        })

        // Vamos a poner los datos al arrayData con los accessors previamente seleccionados
        props.data.forEach((objeto)=>{
            let arrayDato = []
            // Hacemos uso de los accessors para entrar en los objetos del data de forma automática
            arrayAccessors.forEach((accessor)=>{
                arrayDato.push(objeto[accessor])
            })
            arrayData.push(arrayDato)
        })
        // console.log('-------------------------------')
        arrayData.unshift(arrayColumnas)
        // console.log(arrayData)

        // Pasamos el excel dentro del objeto data
        let excel = {
            data: arrayData
        }

        if(!downloadingFRef.current){
            DownloadExcel(props.title, excel).then(res=>{
                if(res){
                    // console.log(res)
                    setdownloadingF(true)
                    activateOk()
                    setTimeout(() => {
                        setDownloading(false)
                        setdownloadingF(false)
                    }, 2000);
                }
            })
        }
    }

    const activateOk = () =>{
        if(childRef.current){
            childRef.current.getDone()
            document.querySelector('#clickExportar').click()
        }
    }


    return (
        <div onClick={()=>getDownload()} className="cursor-pointer">
            {!downloadingRef.current &&
                <>
                    <svg data-tip data-for='excel' className="w-6 h-6 hover:text-black text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    <ReactTooltip backgroundColor="#000" id='excel' effect='solid' place='bottom' aria-haspopup='true' role='example'>
                        Download EXCEL
                    </ReactTooltip>
                </>
            }
            {downloadingRef.current &&
                <Loader ref={childRef} type="3" />
            }

            <a id="clickExportar" className="hidden" href={API+"/"+props.title+".xlsx"} download>Descargar</a>
        </div>
    );
}

export default Download;