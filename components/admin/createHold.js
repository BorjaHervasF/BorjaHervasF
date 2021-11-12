import React, { useEffect, useRef } from 'react'
import Select from 'react-select';
import Router from 'next/router'
import useState from 'react-usestateref'
import {getParkings, getRelevants,loadRelevant, createHoldAxios} from '../functions/datafunctions'
import ReactTooltip from 'react-tooltip'
import Loader from '../Loader'
const rule = () => {

    var [hold, setHold, holdRef] = useState('')
    const childRef = useRef();
    var [Condiciones, setCondiciones, CondicionesRef] = useState([])

    var [tipo, settipo] = useState('maxperrow')
    var [bloque, setbloque] = useState('')

    var [origenOptions, setorigenOptions, origenOptionsRef] = useState([])

    var [relevants, setrelevants, relevantsRef] = useState([])
    
    var [counters, setcounters, countersRef] = useState('')


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

        getRelevants().then(res=>{
            if(res.error === false){
                setrelevants(res.data)
            }
        })
    }, [])

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
        console.log("hecho")
    }

    const crearHold = () =>{
        document.getElementById("spin").classList.remove("invisible")
        let json = {}

        if(!holdRef.current){
            return;
        }

        if(CondicionesRef.current.length === 0){
            return;
        }

        if(tipo === 'maxperrow'){
            if(!countersRef.current){
                return;
            }
        }

        json.name = holdRef.current
        if(tipo === 'maxperrow'){
            json.count = countersRef.current
        }else{
            json.count = 0
        }

        let array_condiciones = []
        
        CondicionesRef.current.forEach((elem)=>{
            elem[2].forEach((cond)=>{
                array_condiciones.push({relevant_id: elem[0].value, value: cond.value})
            })
        })
        json.definitions = array_condiciones
        json.priority = 0

        console.log(json)

        createHoldAxios(json).then(res=>{
            if(res.error === false){
                document.getElementById("spin").classList.add("invisible")
                setsuccesstext(true)
                seterrortext('')
                setTimeout(() => {
                    Router.push('/admin/holds')
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
                        <label className="text-gray-800 ml-1 text-sm">Name of the Hold</label>
                        <input value={hold} onChange={(e)=>setHold(e.target.value)} type="text" name="nombre" placeholder="Hold to Kugas" autoComplete="off"
                        class="w-full pl-3 pr-10 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-blue-500 transition-colors" />
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
                                <div key={i} className="flex w-full mt-2">
                                    <div className="w-1/2 mr-2">
                                        <Select
                                            value={condicion.length > 0 ? condicion[0] : ''}
                                            onChange={async (e) => {

                                                let new_data = []
                                                new_data.push(e)
                                                let hola = await getRelevante(e, i)
                                                console.log(hola)
                                            }}
                                            options={relevantsRef.current}
                                        />
                                    </div>
                                    <div className="w-1/2 ml-2">
                                        <Select
                                            value={condicion.length > 2 ? condicion[2] : ''}
                                            isMulti
                                            isDisabled={!condicion}
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
                                    Max. per row
                                </span>
                                <div onClick={()=>{
                                        if(tipo === 'maxperrow'){
                                            settipo('unlimited')
                                        }else{
                                            settipo('maxperrow')
                                        }
                                    }} class="w-14 h-7 flex items-center bg-gray-200 rounded-full mx-3 px-1 cursor-pointer" >
                                    <div  className={"bg-blue-600 w-5 h-5 rounded-full cursor-pointer shadow-md transform transition-all duration-200 " + (tipo === 'maxperrow' ? '' : 'translate-x-7')} ></div>
                                </div>
                                <span class="">
                                    unlimited
                                </span>
                            </div>
                        </div>
                    </div>


                    <div className="mt-5">
                        {tipo === 'maxperrow' &&
                            <input onChange={(e)=>setcounters(e.target.value)} placeholder="Max vehicles per row" type="number" className="w-full pl-3 pr-10 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-blue-500 transition-colors" />
                        }
                    </div>


                </div>
                <div class="w-1/2 px-10 my-4 py-6 rounded-lg border-2 ml-5 mr-5">
                    <div class="mt-2">
                        <span class="text-2xl text-gray-700 font-bold hover:text-gray-600"><b>{hold}</b></span>
                        {hold &&
                            <p class="mt-4 text-gray-600 text-lg">The vehicles that meet a combination of the conditions </p>
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

                    {CondicionesRef.current.length > 0 &&
                        <div className="mt-4">
                            {tipo === 'maxperrow' &&
                                <>
                                    <p class="mt-4 text-gray-600 text-lg">And must be {countersRef.current} max per row </p>
                                </>
                            }
                            {tipo !== 'maxperrow' &&
                                <>
                                    <p class="mt-4 text-gray-600 text-lg">And can be unlimited per row </p>
                                </>
                            }
                        </div>
                    }
                </div>
            </div>
            <div className="w-full flex justify-end">
                <button onClick={()=>{
                    crearHold()
                }} className="text-xl hover:bg-blue-600 transition-all duration-300 pl-4 border-2 border-blue-600 pr-4 pt-2 pb-2 mr-5 rounded text-blue-600 hover:text-white">CREATE</button>
            </div>
            {successtextRef.current ?
                <div className="w-full flex justify-center">
                    <span className="text-green-500 text-xl">CREATED SUCCESFULLY</span>
                </div>
                :<div className="w-full flex justify-center pt-3 invisible" id="spin">
                <Loader ref={childRef} type="3"/>
                </div>
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