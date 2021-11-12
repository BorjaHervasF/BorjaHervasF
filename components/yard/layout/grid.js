import React, { useEffect, useRef } from 'react'
import {getCompounChildren, getPositionsChildren, toggleActiveParking, getVinsPOST} from '../../functions/datafunctions'
import useState from 'react-usestateref'
import ReactTooltip from 'react-tooltip'
import Vininfo from '../../Vininfo'
import Loader from "../../../components/Loader";
const grid = () => {
    const childRef = useRef();
    const [Parking, setParking, ParkingRef] = useState('parking')
    const [Parkings, setParkings, ParkingsRef] = useState([])
    const [ParkingsAux, setParkingsAux, ParkingsAuxRef] = useState([])

    const [Posiciones, setPosiciones, PosicionesRef] = useState([])
    const [PosicionesAux, setPosicionesAux, PosicionesAuxRef] = useState([])


    const [ParkingSelected, setParkingSelected, ParkingSelectedRef] = useState([])
    const [PosicionSelected, setPosicionSelected, PosicionSelectedRef] = useState([])

    const [showVininfo, setshowVininfo, showVininfoRef] = useState(false)
    

    const [Vins, setVins, VinsRef] = useState([])
    const [VinsAux, setVinsAux, VinsAuxRef] = useState([])
    const [SelectedVin, setSelectedVin, SelectedVinRef] = useState([])
    const [blocking, setBlocking, blockingRef] = useState(false)
    const [parkingBlocking, setParkingBlocking, parkingBlockingRef] = useState()
    const [parkingLoad, setParkingLoad, parkingLoadRef] = useState(true)
    useEffect(() => {
        cargarParkings()
    }, [])
    
    const cargarParkings = () =>{
        getCompounChildren().then(res=>{
            let array = []
            if(res.error === false){
                res.data.forEach((parking)=>{
                    let calculo = (Number(parking.fill) / Number(parking.capacity))*100
                    parking.porcentaje = calculo
                    array.push(parking)
                })
                console.log(array)
                setParkings(get_calculo(array))
                setParkingsAux(get_calculo(array))
            }
        })

    }


    const get_calculo = (array) =>{
        let new_array = array
        new_array.forEach((parking)=>{
            if(parking.porcentaje === 0){
                parking.color = 'white'
            }else if(parking.porcentaje > 0 && parking.porcentaje <= 40){
                parking.color = 'green'
            }else if(parking.porcentaje > 40 && parking.porcentaje <= 85){
                parking.color = 'orange'
            }else if(parking.porcentaje > 85){
                parking.color = 'red'
            }
        })

        return new_array
    }

    const search_parking = (input) =>{
        if(ParkingRef.current === 'parking'){
            if(input.trim() === ''){
                setParkings(ParkingsAuxRef.current)
            }else{
                let new_array = []
                ParkingsAuxRef.current.forEach((park)=>{
                    if(park.name.toUpperCase().includes(input.toUpperCase())){
                        new_array.push(park)
                    }
                })
                setParkings(new_array)
            }
        }else if(ParkingRef.current === 'posiciones'){
            if(input.trim() === ''){
                setPosiciones(PosicionesAuxRef.current)
            }else{
                let new_array = []
                PosicionesAuxRef.current.forEach((park)=>{
                    if(park.name.toUpperCase().includes(input.toUpperCase())){
                        new_array.push(park)
                    }
                })
                setPosiciones(new_array)
            }
        }else if(ParkingRef.current === 'vins'){
            console.log("esto son vins")
        }
    }

    const acceder_2_nivel = (parking) =>{
        setParkingSelected(parking)
        setParkingLoad(false)
        getPositionsChildren(parking.id).then(res=>{
            let positions = []
            if('error' in res){
                if(res.error === false){
                    if(res.data.length === 0){
                        console.log("no tiene hijos por lo que accedemos la nivel 3 ")
                        acceder_3_nivel(parking, false)
                    }else{
                        console.log(res.data)
                        res.data.forEach((posicion)=>{
                            let calculo = (Number(posicion.fill) / Number(posicion.capacity))*100
                            posicion.porcentaje = calculo
                            positions.push(posicion)
                        })
                        setPosiciones(get_calculo(positions))
                        setPosicionesAux(get_calculo(positions))
                        setParking('posiciones')
                    }
                }
            }
        })
    }

    const acceder_3_nivel = async (parking, tipo) =>{
        if(tipo === false){
            let array = [parking.id]
            let VINS = await get_vins(array)
            console.log(VINS)
            setVins(VINS)
            setVinsAux(VINS)
            setParking('vins')
            setPosicionSelected(parking)
        }else{
            getPositionsChildren(parking.id).then(res=>{
                let positionsChild = []
                if(res.error === false){
                    res.data.forEach(elem=>{
                        positionsChild.push(elem.id)
                    })
                    getVinsPOST(positionsChild).then(res=>{
                        console.log(res)
                        setVins(res.data)
                        setVinsAux(res.data)
                        setParking('vins')
                    })
                }
            })
        }
    }

    const get_vins = (idParking) =>{
        return getVinsPOST(idParking).then(res=>{
            return res.data
        })
    }


    const toggleActiveP = (e) =>{
        setParkingBlocking(e.id)
        setBlocking(true)
        toggleActiveParking(e.id).then(res=>{
            cargarParkings()
            setBlocking(false)
        })
    }


    return (
        <>
            {showVininfoRef.current &&
                <Vininfo idVin={SelectedVinRef.current} closeButton={setshowVininfo} />
            }
            {Parking !== 'parking' &&
                <div className="w-full flex justify-center mt-5">
                    <div className="w-full flex justify-start ml-3 mb-2">
                        <span className="font-medium cursor-pointer" onClick={()=>{setParking('parking'), setParkingLoad(true)}}> {ParkingSelectedRef.current.name} </span>
                        <svg className="w-4 h-4 transform translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        {!PosicionSelectedRef.current.name &&
                            <span>POSITIONS</span>
                        }
                        {/* {PosicionSelectedRef.current.name &&
                            <>
                                <span className="font-medium cursor-pointer" onClick={()=>setParking('parking')}> {PosicionSelectedRef.current.name} </span>
                            </>
                        } */}

                    </div>
                </div>
            }

            <div className="w-full flex justify-center">
                <div className="w-full">
                    <input onChange={(e)=>search_parking(e.target.value)} type="text" placeholder={Parking === 'parking' ? "SEARCH PARKING" : (Parking === 'posiciones' ? 'SEARCH POSITION' : 'SEARCH VIN')} className="w-full ml-1 mr-1 mb-4 p-4 pr-2 border-2 text-lg focus:outline-none focus:border-blue-600 border-gray-200 rounded-lg" />
                </div>
            </div>


            {Parking === 'parking' &&
                <>
                    <div className={"w-full grid-cols-8 grid "}>
                        {ParkingsRef.current.length > 0 &&
                            ParkingsRef.current.map((parking,i)=>{
                                return(
                                    <div key={i} className={"w-full xl:col-span-2 md:col-span-4 sm:col-span-4 " +((blockingRef.current && parkingBlockingRef.current == parking.id ) ? 'animate-pulse':'')}>
                                        <div  data-tip data-for={'parking_'+i} className={"mt-2 ml-2 mr-2 col-span-2 justify-center text-start transform duration-100 ease-in transition-all hover:-translate-y-0.5 flex items-center h-16 rounded-lg shadow-md " + (parking.active === false ? 'bg-purple-300 text-purple-500' : (parking.color === 'white' ? 'bg-gray-100' : '') + (parking.color === 'red' ? 'bg-red-400' : '') + (parking.color === 'green' ? 'bg-green-400' : '') + (parking.color === 'orange' ? 'bg-yellow-500' : ''))  }>
                                            <span onClick={(e)=>{
                                                if(!e.target.matches('svg')){
                                                    acceder_2_nivel(parking, true)
                                                }
                                            }} className="font-medium text-2xl text-gray-800 truncate ml-4 mr-4 cursor-pointer">{parking.name}</span> <span onClick={(e)=>{
                                                if(!e.target.matches('svg')){
                                                    acceder_2_nivel(parking, true)
                                                }
                                            }} className={"ml-2 mr-4 font-medium  pr-2 pl-2 rounded-full transform translate-y-0.5 " + (parking.active === false ? 'bg-purple-200 text-purple-500' : (parking.color === 'white' ? 'bg-gray-200 text-gray-500' : '') + (parking.color === 'red' ? 'text-red-800 bg-red-500' : '') + (parking.color === 'orange' ? 'text-orange-800 bg-orange-500' : '') + (parking.color === 'green' ? 'text-green-800 bg-green-500' : ''))  }> {parking.fill}/{parking.capacity}</span>
                                            <div className="mr-3 cursor-pointer z-10 bloqp">
                                                {parking.active === true &&
                                                    <>
                                                        <svg onClick={()=> toggleActiveP(parking)} data-tip data-for={'bub_'+i} id={'bub_'+i} name={'bub_'+i} class="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path></svg>

                                                    </>
                                                }
                                                {parking.active === false &&
                                                    <>
                                                        <svg onClick={()=> toggleActiveP(parking)} data-tip data-for={'unbub_'+i} id={'unbub_'+i} name={'unbub_'+i} class="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                                    </>
                                                }

                                            </div>
                                            <div className={(!parkingLoadRef.current && ParkingSelectedRef.current.id === parking.id) ? "" : 'hidden'} id="spin">
                                                <div className="w-full flex justify-end">
                                                    <Loader ref={childRef} type="3" />
                                                </div>
                                            </div>
                                        </div>
                                        {parking.active === false &&
                                                    <>
                                                        <ReactTooltip backgroundColor="#000" id={'unbub_'+i}  name={'unbub_'+i} effect='solid' place='bottom' aria-haspopup='true' role='example' className="z-10">
                                                            UNBLOCK PARKING
                                                        </ReactTooltip>
                                                    </>
                                                }
                                        {parking.active === true &&
                                                    <>
                                                        <ReactTooltip backgroundColor="#000" id={'bub_'+i} name={'bub_'+i} effect='solid' place='bottom' aria-haspopup='true' role='example' className="z-10">
                                                            BLOCK PARKING
                                                        </ReactTooltip>
                                                    </>
                                                }
                                        <ReactTooltip backgroundColor="#000" id={'parking_'+i} effect='solid' place='top' aria-haspopup='true' role='example'>
                                            {parking.name}
                                        </ReactTooltip>

                                    </div>
                                )
                            })
                        }
                    </div>
                </>
            }

            {Parking === 'posiciones' &&
                <>
                    <div className="w-full grid-cols-6 grid">
                        {PosicionesRef.current.length > 0 &&
                            PosicionesRef.current.map((parking,i)=>{
                                return(
                                    <div key={i}>
                                        <div onClick={()=>{
                                            acceder_3_nivel(parking, true)
                                        }} data-tip data-for={'posicion_'+i} className={"mt-2 ml-2 mr-2 col-span-1 justify-center transform duration-100 ease-in transition-all hover:-translate-y-0.5 flex cursor-pointer items-center h-16 rounded-lg shadow-md " + (parking.color === 'white' ? 'bg-gray-100' : '') + (parking.color === 'red' ? 'bg-red-400' : '') + (parking.color === 'green' ? 'bg-green-400' : '') + (parking.color === 'orange' ? 'bg-yellow-500' : '') }>
                                            <span className="font-medium text-2xl text-gray-800 truncate ml-4 mr-4">{parking.name}</span> <span className={"ml-2 mr-4 font-medium  pr-2 pl-2 rounded-full transform translate-y-0.5 " + (parking.color === 'white' ? 'bg-gray-200 text-gray-500' : '') + (parking.color === 'red' ? 'text-red-800 bg-red-500' : '') + (parking.color === 'orange' ? 'text-orange-800 bg-orange-500' : '') + (parking.color === 'green' ? 'text-green-800 bg-green-500' : '') }> {parking.fill}/{parking.capacity}</span>
                                        </div>
                                        <ReactTooltip backgroundColor="#000" id={'posicion_'+i} effect='solid' place='top' aria-haspopup='true' role='example'>
                                            {parking.name}
                                        </ReactTooltip>
                                    </div>
                                )
                            })
                        }
                    </div>
                </>
            }

            {Parking === 'vins' &&
                <>
                    <div className="w-full grid-cols-4 grid">
                        {VinsRef.current.length > 0 &&
                            VinsRef.current.map((vin,i)=>{
                                return(
                                    <div key={i}>
                                        <div onClick={()=>{
                                            if(vin.name){
                                                setSelectedVin(vin.idVin)
                                            }else{
                                                setSelectedVin(vin.id)
                                            }
                                            setshowVininfo(true)
                                        }} data-tip data-for={'posicion_'+i} className={"mt-2 ml-2 mr-2 col-span-1 justify-center transform duration-100 ease-in transition-all hover:-translate-y-0.5 flex cursor-pointer items-center h-16 rounded-lg shadow-md " + (vin.color === 'white' ? 'bg-gray-100' : '') + (vin.color === 'red' ? 'bg-red-400' : '') + (vin.color === 'green' ? 'bg-green-400' : '') + (vin.color === 'orange' ? 'bg-yellow-500' : '') }>
                                            <span className="font-medium text-2xl text-gray-800 truncate ml-4 mr-4">{vin.vin}</span>
                                        </div>
                                        <ReactTooltip backgroundColor="#000" id={'posicion_'+i} effect='solid' place='top' aria-haspopup='true' role='example'>
                                            {vin.name ? vin.name : vin.vin}
                                        </ReactTooltip>
                                    </div>
                                )
                            })
                        }
                        {VinsRef.current.length === 0 &&
                            <>
                                <span className="text-red-500 text-lg font-medium">There is no vin in this position</span>
                            </>
                        }
                    </div>
                </>
            }
        </>
    );
}

export default grid;