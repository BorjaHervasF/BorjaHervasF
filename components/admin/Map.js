import React, { useEffect } from 'react';
import useState from 'react-usestateref'
import $ from 'jquery';
import {getParkings} from '../functions/datafunctions'
import Select from 'react-select'

const Map = () => {
    const [ancho, setAncho] = useState(120)
    const [alto,setAlto] = useState(50)

    const [anchoP, setAnchoP] = useState('')
    const [altoP,setAltoP] = useState('')

    const [parkingsMontados, setParkingsMontados] = useState([])

    var [idsPintados,setIdsPintados,idsPintadosRef]=useState([])

    var [modoEliminar,setModoEliminar,modoEliminarRef]=useState(false)

    var [parkings,setParkings, parkingsRef] = useState([])
    var [valueSelect,setValueSelect, valueSelectRef] = useState('')


    useEffect(() => {
        getParkings().then(res=>{
            console.log(res)
            setParkings(res.data)
        })
    },[])


    const guardarCampa = () =>{
        console.log(ancho,alto,idsPintadosRef.current )
        let json = {
            anchoCampa: ancho,
            altoCampa: alto,
            idsParkings: idsPintadosRef.current
        }

        localStorage.setItem('CampaLayout', JSON.stringify(json));


    }


    const rehacerParking = (e,tipo) =>{

        if(tipo === 'prev'){
            $('.bg-blue-200').removeClass('bg-blue-200')
        }

        let anchoC = Number(sessionStorage.getItem('altoP'))
        let altoC = Number(sessionStorage.getItem('anchoP'))

        let prow = Number(String(e.target.id).split('_')[0])
        let pcol = Number(String(e.target.id).split('_')[1])

        let ids = []

        for (let r = 0; r < anchoC; r++) {

            for (let c = 0; c < altoC ; c++) {
                if(document.getElementById(prow + '_' + pcol) === null){
                    // console.log(prow + '_' + pcol + '  null')
                }else{
                    if(tipo === 'prev'){
                        if(document.getElementById(prow + '_' + pcol).className.includes('bg-blue-400') || document.getElementById(prow + '_' + pcol).className.includes('bg-red-400')){
                            document.getElementById(prow + '_' + pcol).classList.remove('bg-blue-400')
                            document.getElementById(prow + '_' + pcol).classList.add('bg-red-400')
                        }else{
                            document.getElementById(prow + '_' + pcol).classList.add('bg-blue-200')
                        }
                    }else{
                        document.getElementById(prow + '_' + pcol).classList.add('bg-blue-400')
                        document.getElementById(prow + '_' + pcol).classList.add('border-blue-400')
                        document.getElementById(prow + '_' + pcol).classList.add('border-top-color-fila')
                        
                    }
                    ids.push(prow + '_' + pcol)
                }

                pcol++
            }


            
            pcol = Number(String(e.target.id).split('_')[1])
            
            prow++
            
        }

        idsPintadosRef.current.map(elm=>{
            // console.log(elm)
            elm.map((park=>{
                if(!ids.includes(park)){
                    document.getElementById(park).classList.remove('bg-red-400')
                    document.getElementById(park).classList.add('bg-blue-400')
                }
            }))
        })

        if(tipo === 'paint'){
            let esquinainf_R = (Number(String(e.target.id).split('_')[0]) + anchoC)-1
            let esquinainf_C = (Number(String(e.target.id).split('_')[1]) + altoC)-1
            let esquinainf = esquinainf_R + '_' + esquinainf_C
            // console.log(e.target.id, esquinainf)
            // setIdsPintados(idsPintadosRef.current.concat([[e.target.id, esquinainf]]))

            setIdsPintados(idsPintadosRef.current.concat([ids]))
            
        }

    }

    const prepintarEliminar = (e) =>{
        let coordd = String(e.target.id)
        idsPintadosRef.current.map(elm=>{
            if(elm.includes(coordd)){
                elm.map((pk=>{
                    document.getElementById(pk).classList.remove('bg-blue-400')
                    document.getElementById(pk).classList.remove('border-blue-400')
                    document.getElementById(pk).classList.add('bg-red-500')
                    document.getElementById(pk).classList.add('border-red-500')
                }))
            }else{
                elm.map((pk=>{
                    document.getElementById(pk).classList.add('bg-blue-400')
                    document.getElementById(pk).classList.add('border-blue-400')
                    document.getElementById(pk).classList.remove('bg-red-500')
                    document.getElementById(pk).classList.remove('border-red-500')
                }))
            }
        })
    }

    const eliminarParking = (e) =>{
        console.log("eliminamos parking")
        let coordd = String(e.target.id)

        setIdsPintados(idsPintadosRef.current.filter(item => !item.includes(coordd)))
        $('.bg-red-500').removeClass('bg-red-500')
        $('.border-red-500').removeClass('border-red-500')
    }

    const pintarParking = (e) =>{
        if(modoEliminarRef.current){
            eliminarParking(e)
        }else{
            if(document.getElementsByClassName("bg-red-400").length <= 0){
                rehacerParking(e,'paint')
                
                let array = [e.target.id,anchoP,altoP]
                setParkingsMontados(parkingsMontados.concat(array))
            }
        }
    }


    const previsualizacionParking = (e) =>{
        if(!modoEliminarRef.current){
            rehacerParking(e,'prev')
        }else{
            prepintarEliminar(e)
        }
    }

    const montarTablero = () =>{
        var cols = ancho; 
        var rows = alto; 
        var html = "";
        let coln = 1
        let rown = 1 
        
        for (let k = 0; k < rows; k++) {
            let tr = document.createElement('tr');
            tr.id = rown
            for (let u = 0; u < cols; u++) {
                let td = document.createElement('td')
                td.className = 'border-2 w-4 h-4 hover:bg-yellow-200'
                td.id = rown+'_'+coln
                td.onclick = (e) => pintarParking(e)
                td.onmouseover = (e) => previsualizacionParking(e)
                tr.appendChild(td)
                coln++
            }

            coln = 1
            rown++
            document.getElementById('wsgrid').appendChild(tr)
        }
    }


    return (
        <div className="w-full">


            <div className="relative block">

                {/* <div className="w-full flex">
                    <button onClick={()=>guardarCampa()} className="ml-4 focus:bg-blue-600 focus:outline-none p-3 bg-blue-400 text-white mt-4 rounded">
                        
                    </button>
                </div> */}


                <div className="w-full flex">
                    <div className="w-full border-2 rounded-xl p-4 mr-4">
                        <span className="text-xl">
                            Monta tu Campa
                        </span>
                        <input value={ancho} onChange={(e)=>setAncho(e.target.value)} type="number" className="w-full pl-3 pt-2 pb-2 mt-2 border-2 focus:outline-none rounded" placeholder="Ancho (100)" />
                        <input value={alto} onChange={(e)=>setAlto(e.target.value)} type="number" className="w-full pl-3 pt-2 pb-2 mt-2 border-2 focus:outline-none rounded" placeholder="Alto (50)" />
                        <button onClick={()=>montarTablero()} className="focus:bg-blue-500 focus:outline-none p-3 bg-blue-400 text-white mt-4 rounded">
                            Montar
                        </button>
                        <button onClick={()=>guardarCampa()} className="ml-4 focus:bg-blue-600 focus:outline-none p-3 bg-blue-400 text-white mt-4 rounded">
                            Guardar Campa
                        </button>
                    </div>

                    <div className="w-full border-2 rounded-xl p-4 ml-4">
                        <span className="text-xl">
                            Monta tu Parking
                        </span>
                        <Select
                        value={valueSelectRef.current}
                        onChange={(e)=>{
                        
                            setValueSelect(e)

                        }}
                        options={parkingsRef.current}
                        className={"mt-2"}
                        />
                        <input id="anchoP" value={anchoP} onChange={(e)=>setAnchoP(e.target.value)} type="number" className="w-full pl-3 pt-2 pb-2 mt-2 border-2 focus:outline-none rounded" placeholder="Filas (20)" />
                        <input id="altoP" value={altoP} onChange={(e)=>setAltoP(e.target.value)} type="number" className="w-full pl-3 pt-2 pb-2 mt-2 border-2 focus:outline-none rounded" placeholder="Slots (5)" />
                        <button onClick={()=>{
                            sessionStorage.setItem('anchoP', anchoP)
                            sessionStorage.setItem('altoP', altoP)
                        }} className="focus:bg-blue-500 focus:outline-none p-3 bg-blue-400 text-white mt-4 rounded">
                            Guardar
                        </button>

                        <button onClick={()=>{
                            if(modoEliminarRef.current){
                                setModoEliminar(false)
                            }else{
                                $('.bg-blue-200').removeClass('bg-blue-200')
                                setModoEliminar(true)
                            }
                        }} className="ml-4 focus:bg-red-700 focus:outline-none p-3 bg-red-600 text-white mt-4 rounded">
                            Eliminar Parking
                        </button>
                    </div>
                </div>

                <div className="w-full border-2 rounded-xl p-4 justify-center flex mt-5 relative">

                    <div className="w-full justify-center flex ">
                        <table id="wsgrid" className={modoEliminarRef.current ? 'cursor-crosshair' : ''}>

                        </table>
                    </div>

                    {/* <div className="absolute top-96 right-0 w-10 h-10 bg-blue-600 text-white rounded-full cursor-pointer items-center justify-center flex font-medium">
                        +10
                    </div>

                    <div className="absolute bottom-0 left-0 w-full h-10 justify-center flex">
                        <span className="w-10 h-10 bg-blue-600 text-white rounded-full cursor-pointer justify-center flex items-center font-medium">+10</span>
                    </div> */}



                </div>

                {/* <div className="w-full">
                        <button onClick={()=>{
                            console.log(idsPintadosRef.current)
                        }}>
                            A ver
                        </button>
                </div> */}
            </div>


        </div>
    );
}

export default Map;