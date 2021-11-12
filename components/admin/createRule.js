import React, { useEffect,useRef } from 'react'
import Select from 'react-select';
import Router from 'next/router'
import useState from 'react-usestateref'
import Loader from '../Loader'
import {getParkings, getRelevants,loadRelevant, getBlocks,createRuleAxios} from '../functions/datafunctions'
import ReactTooltip from 'react-tooltip'

const rule = () => {

    var [Origen, setOrigen, OrigenRef] = useState('')
    var [regla, setRegla, reglaRef] = useState('')

    var [Condiciones, setCondiciones, CondicionesRef] = useState([])
    const childRef = useRef();
    var [tipo, settipo] = useState('directo')
    var [destino, setdestino] = useState('')
    var [bloque, setbloque] = useState('')

    var [origenOptions, setorigenOptions, origenOptionsRef] = useState([])

    var [relevants, setrelevants, relevantsRef] = useState([])

    var [posFinals, setposFinals, posFinalsRef] = useState(false)

    var [overflow, setoverflow, overflowRef] = useState('')

    var [bloques,setbloques,bloquesRef] = useState([])

    var [countdown, setcountdown, countdownRef] = useState(null)


    var [successtext, setsuccesstext, successtextRef] = useState(false)
    var [errortext, seterrortext, errortextRef] = useState('')

    // const [SeleccionCondiciones, setSeleccionCondiciones] = useState([])

    // const addMoreItem = (value) => {
    //     setSeleccionCondiciones(prevItems => [...prevItems, {
    //       value: value,
    //     }]);
    // }


    useEffect(() => {
        getParkings().then(res=>{
            if(res.error === false){
                setorigenOptions(res.data)
            }
        })

        getBlocks().then(res=>{
            if(res.error === false){
                res.data.forEach(elemen=>{
                    elemen.value = elemen.id
                    elemen.label = elemen.name
                })

                setbloques(res.data)
            }
        })

        getRelevants().then(res=>{
            if(res.error === false){
                setrelevants(res.data)
            }
        })
    }, [])

    useEffect(() => {
        // setCondiciones(CondicionesRef.current)
        console.log("modificado")
        console.log(CondicionesRef.current)
    }, [CondicionesRef.current])

    const getRelevante = (e, i) =>{
        return loadRelevant(e.value).then(res=>{
            if(res.error === false){
                let cond = CondicionesRef.current
                console.log(cond)
                cond[i] = []
                cond[i].push(e)
                cond[i].push(res.data)

                setCondiciones([])

                setTimeout(() => {
                    setCondiciones(cond)
                }, 1);

                return res
            }
        })
    }

    const selectRelevante = (e, i) =>{
        let array = CondicionesRef.current
        console.log(array)
        array[i][2] = e
        setCondiciones([])
        setTimeout(() => {
            setCondiciones(array)
        }, 1);
    }

    const crearRegla = () =>{
        document.getElementById("spin").classList.remove("invisible")
        let json = {}

        if(!reglaRef.current){
            return;
        }

        if(!Origen){
            return;
        }

        if(CondicionesRef.current.length === 0){
            return;
        }

        if(tipo === 'directo'){
            if(!destino){
                return;
            }
        }else{
            if(!bloque){
                return;
            }
        }

        if(!overflow){
            return;
        }


        //COMENZAMOS A PINTAR EL JSON

        json.name = reglaRef.current
        json.countdown = countdownRef.current
        json.priority = null
        if(tipo === 'directo'){
            json.blockId = null
            json.predefined_zone = destino.value
        }else{
            json.blockId = bloque.value
            json.predefined_zone = null
        }
        json.overflowId = overflow.value


        if(posFinalsRef.current){
            json.nextState = 5
        }else{
            json.nextState = 3
        }


        json.originBlock = Origen.value

        
        console.log(CondicionesRef.current)
        let array_condiciones = []
        
        CondicionesRef.current.forEach((elem)=>{
            elem[2].forEach((cond)=>{
                array_condiciones.push({relevant_id: elem[0].value, value: cond.value})
            })
        })
        json.definitions = array_condiciones
        
        console.log(json)
        createRuleAxios(json).then(res=>{
            if(res.error === false){
                document.getElementById("spin").classList.add("invisible")
                seterrortext('')
                setsuccesstext(true)
                setTimeout(() => {
                    Router.push('/admin/rules')
                }, 3000);
            }else{
                seterrortext(res.message)
                setsuccesstext(false)
            }
        })
    }

    

    return (
        <>
            <div className="w-full flex mt-10">
                <div className="w-1/2 px-10 my-4 py-6 border-2 rounded-lg ml-5 mr-5">
                    <div className="mt-5">
                        <label className="text-gray-800 ml-1 text-sm">Name of the rule</label>
                        <input value={regla} onChange={(e)=>setRegla(e.target.value)} type="text" name="nombre" placeholder="Regla de ZP" autoComplete="off"
                        class="w-full pl-3 pr-10 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-blue-500 transition-colors" />
                    </div>

                    <div className="mt-5"><hr /></div>

                    <div className="mt-5">
                        <label className="text-gray-800 ml-1 text-sm">Select origin</label>
                        <Select
                            value={Origen}
                            onChange={(e)=>setOrigen(e)}
                            options={bloquesRef.current}
                        />
                    </div>
                    
                    <div className="mt-5"><hr /></div>

                    <div className="mt-5">
                        
                        <div className="w-full flex">
                            <label className="text-gray-800 ml-1 text-sm">Conditions </label>
                            <svg onClick={()=>{
                                setCondiciones(Condition => Condition.concat(['']))
                            }} data-tip data-for='add' className="w-4 h-4 transform translate-y-0.5 cursor-pointer ml-1 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                            <ReactTooltip backgroundColor="#000" id='add' effect='solid' place='right' aria-haspopup='true' role='example'>
                                Add Condition
                            </ReactTooltip>
                        </div>

                        {CondicionesRef.current.map((condicion, i)=>{
                            return(
                                <div key={i} className="flex w-full mt-2 items-center">
                                    <div className="w-1/2 mr-2">
                                        <Select
                                            value={condicion[0]}
                                            onChange={async (e) => {
                                                let new_data = []
                                                new_data.push(e)
                                                let hola = await getRelevante(e, i)
                                            }}
                                            options={relevantsRef.current}
                                        />
                                    </div>
                                    <div className="w-1/2 ml-2">
                                        <Select
                                            value={condicion.length > 2 ? condicion[2] : ''}
                                            isMulti
                                            className={!condicion.length && ("animate-pulse")}
                                            isDisabled={!condicion.length}
                                            closeMenuOnSelect={false}
                                            onChange={(e)=>{
                                                console.log("e", e)
                                                selectRelevante(e,i)
                                            }}
                                            options={condicion.length > 1 ? condicion[1] : ''}
                                        />
                                    </div>
                                </div>
                            )
                        })}



                    </div>

                    <div className="mt-5"><hr /></div>

                    <div className="mt-5">
                        <div class="w-full h-full flex flex-col justify-center items-center">
                            <div class="flex justify-center items-center">
                                <span class="">
                                    Direct
                                </span>
                                <div onClick={()=>{
                                        if(tipo === 'directo'){
                                            settipo('recomendar')
                                        }else{
                                            settipo('directo')
                                        }
                                    }} class="w-14 h-7 flex items-center bg-gray-200 rounded-full mx-3 px-1 cursor-pointer" >
                                    <div  className={"bg-blue-600 w-5 h-5 rounded-full cursor-pointer shadow-md transform transition-all duration-200 " + (tipo === 'directo' ? '' : 'translate-x-7')} ></div>
                                </div>
                                <span class="">
                                    Recommend
                                </span>
                            </div>
                        </div>
                    </div>


                    <div className="mt-5">
                        {tipo === 'directo' &&
                            <Select
                                value={destino}
                                onChange={(e)=>{
                                    setdestino(e)
                                }}
                                placeholder="Select Manual Parking Direct"
                                options={origenOptionsRef.current}
                            />
                        }

                        {tipo !== 'directo' &&
                            <Select
                                value={bloque}
                                onChange={(e)=>{
                                    setbloque(e)
                                }}
                                placeholder="Select recommended by system block"
                                options={bloquesRef.current}
                            />
                        }
                    </div>

                    <div className="mt-5"><hr /></div>
                    
                    <div className="mt-5">
                        <div class="w-full h-full flex flex-col justify-start">
                            <div class="flex justify-start">
                                <div onClick={()=>{
                                        if(!posFinalsRef.current){
                                            setposFinals(true)
                                        }else{
                                            setposFinals(false)
                                        }
                                    }} class={"w-14 h-7 flex items-center rounded-full px-1 mr-3 cursor-pointer " + (posFinalsRef.current === true ? 'bg-green-200 ' : 'bg-red-200')} >
                                    <div  className={" w-5 h-5 rounded-full cursor-pointer shadow-md transform transition-all duration-200 " + (posFinalsRef.current === false ? 'bg-red-500' : 'translate-x-7 bg-green-500')} ></div>
                                </div>
                                <span class="">
                                    Final Position
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5"><hr /></div>

                    <div className="mt-5">
                        <input onChange={(e)=>{
                            if(e.target.value == ''){
                                setcountdown(null)
                            }else{
                                setcountdown(e.target.value)
                            }
                        }} placeholder="Countdown (optional)" type="number" className="w-full pl-3 pr-10 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-blue-500 transition-colors" />
                    </div>

                    <div className="mt-5"><hr /></div>

                    <div className="mt-5">
                        <Select
                            value={overflow}
                            onChange={(e)=>{
                                setoverflow(e)
                            }}
                            placeholder="Select Overflow"
                            options={origenOptionsRef.current}
                        />
                    </div>





                </div>
                <div class="w-1/2 px-10 my-4 py-6 rounded-lg border-2 ml-5 mr-5">
                    <div class="mt-2">
                        <span class="text-2xl text-gray-700 font-bold hover:text-gray-600"><b>{regla}</b></span>
                        {Origen &&
                            <p class="mt-4 text-gray-600 text-lg">The vehicles with origin <b>{Origen.label}</b> that meet a combination of the conditions </p>
                        }
                    </div>
                    <div className="mt-4">
                        <ul class="list-disc text-lg">
                            {CondicionesRef.current &&
                                CondicionesRef.current.map((condition)=>{
                                    return(
                                        <li className="mt-1">{condition ? condition[0].label : ''}: {condition.length > 2 &&
                                            condition[2].map((tipo)=>{
                                                return(
                                                    <>
                                                        {tipo.label + ', '}
                                                    </>
                                                )
                                            })
                                        }</li>
                                    )
                                })
                            }
                        </ul>
                    </div>

                    <div className="mt-4">
                        {tipo === 'directo' &&
                            <>
                                {destino &&
                                    <span className="text-lg ">Will be sent directly to <b>{destino.label}</b></span>
                                }
                            </>
                        }
                        {tipo !== 'directo' &&
                            <>
                                {bloque &&
                                    <span className="text-lg">Will be sent by the system to <b>{bloque.label}</b></span>
                                }
                            </>
                        }
                    </div>
                    <div className="mt-4">
                        {countdownRef.current &&
                            <>
                                <span className="text-lg">To the fisrt <b>{countdownRef.current}</b> units</span>
                            </>
                        }
                    </div>
                    <div className="mt-4">
                        {overflowRef.current.label &&
                            <>
                                <span className="text-lg">Overflow: <b>{overflowRef.current.label}</b></span>
                            </>
                        }
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-end">
                <button onClick={()=>{
                    crearRegla()
                }} className="text-xl hover:bg-blue-600 transition-all duration-300 pl-4 border-2 border-blue-600 pr-4 pt-2 pb-2 mr-5 rounded text-blue-600 hover:text-white">CREATE</button>
            </div>
            {successtextRef.current ?
                <div className="w-full flex justify-center">
                    <span className="text-green-500 text-xl">CREATED SUCCESFULLY</span>
                </div>
                :<div className="w-full flex justify-center pt-3 invisible" id="spin">
                <Loader ref={childRef} type="3"/>
                </div>}

            }
            {errortextRef.current &&
                <div className="w-full flex justify-center">
                    <span className="text-red-500 text-xl">{errortextRef.current}</span>
                </div>
            }
        </>
    );
}

export default rule;