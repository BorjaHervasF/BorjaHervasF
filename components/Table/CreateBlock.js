import React, { useEffect,useRef } from 'react';
import ReactTooltip from 'react-tooltip'
import Blackback from '../utilities/blackback'
import Modal from '../utilities/modal'
import useState from 'react-usestateref'
import Select from 'react-select'
import Loader from '../Loader'
import {getFilas, getParkings, createBlock, addBlock} from '../functions/datafunctions'

const CreateBlock = (props) => {

    var [showCreateBlock, setshowCreateBlock, showCreateBlockRef] = useState(false)
    const childRef = useRef();
    var [nombre, setNombre, nombreRef] = useState('')
    var [errorName, setErrorName, errorNameRef] = useState('')

    var [select,setSelect, selectRef] = useState([])
    var [selectoptions,setSelectoptions, selectoptionsRef] = useState([])
    var [errorSelection, setErrorSelection, errorSelectionRef] = useState('')

    var [errortext, setErrortext, errortextRef] = useState('')

    useEffect(() => {
        getFilas().then(res=>{
            if(res.error === false){
                getParkings().then(result=>{
                    if(result.error === false){
                        let new_array = []
                        res.data.forEach((elm)=>{
                            new_array.push(elm)
                        })
                        result.data.forEach((elm)=>{
                            new_array.push(elm)
                        })

                        setSelectoptions(new_array)

                    }
                })
            }
        })
    },[])

    const crearBloque = () =>{
        document.getElementById("spin").classList.remove("invisible")
        if(props.idblock){
            AddRows()
            return;
        }
        if(nombreRef.current.trim() === ''){
            setErrorName("You have to fill this input")
            return;
        }

        setErrorName("")

        if(selectRef.current.length === 0){
            setErrorSelection('You have to select rows')
            return;
        }

        setErrorSelection("")

        createBlock(nombreRef.current).then(res=>{
            console.log(res)
            if(res.error === false){
                document.getElementById("spin").classList.add("invisible")
                let array_ids = [] // ids de los parkings/filas
                selectRef.current.forEach((element=>{
                    array_ids.push(element.value)
                }))
                let json = { // json para crear el bloque
                    blockId: res.blockId,
                    positionId: array_ids
                }
                addBlock(json).then(result=>{
                    if(result.error === false){
                        console.log(result)
                        if(props.montarBloques){
                            setSelect([])
                            props.montarBloques()
                        }
                        setshowCreateBlock(false)
                    }else{
                        setErrortext(result.message)
                    }
                })
            }else{
                setErrortext(res.message)
            }
        })
    }

    const AddRows = () =>{
        if(selectRef.current.length === 0){
            setErrorSelection('You have to select rows')
            return;
        }

        setErrorSelection("")


        let array_ids = [] // ids de los parkings/filas
        selectRef.current.forEach((element=>{
            array_ids.push(element.value)
        }))
        let json = { // json para crear el bloque
            blockId: props.idblock,
            positionId: array_ids
        }
        addBlock(json).then(result=>{
            if(result.error === false){
                if(props.montarBloques){
                    setSelect([])
                    props.montarBloques(true)
                }
                setshowCreateBlock(false)
            }else{
                setErrortext(res.message)
            }
        })
    }


    return (
        <>
            {showCreateBlockRef.current &&
                <Blackback>
                    <Modal header={props.idblock ? "ADD ROWS" : "CREATE BLOCK"} closeModal={setshowCreateBlock} okbuttontext={props.idblock ? "ADD" : 'CREATE'} okbutton={crearBloque} errortext={errortextRef.current}>
                        {!props.idblock &&
                            <>
                                <input onChange={(e)=>setNombre(e.target.value)} value={nombreRef.current} placeholder="BLOCK NAME" className={"w-full border-2 focus:outline-none p-3 text-lg font-medium rounded-lg focus:border-blue-500 " + (errorNameRef.current ? 'border-red-500' : '')} />
                                {errorNameRef.current &&
                                    <span className="text-red-500">{errorNameRef.current}</span>
                                }
                            </>
                        }
                        {props.idblock &&
                            <>
                                <span className="text-sm text-gray-400">*All the car parks you choose will change their block to the current one forcibly</span>
                            </>
                        }
                        <Select 
                        className={"border-2 text-xl font-medium rounded-lg mt-2 outline-none focus:outline-none text-gray-700 pt-2 pb-2 no-border-select mb-0 " + (errorSelectionRef.current ? 'border-red-500' : '') }
                        onChange={(e)=>setSelect(e)}
                        isMulti
                        closeMenuOnSelect={false}
                            placeholder="Select Rows"
                            value={selectRef.current}
                            options={selectoptionsRef.current}
                            />
                        {errorSelectionRef.current ?
                            <span className="text-red-500">{errorSelectionRef.current}</span>
                            :<div className="w-full flex justify-center pt-3 invisible" id="spin">
                            <Loader ref={childRef} type="3"/>
                            </div>
                        }
                    </Modal>
                </Blackback>
            }
            <div onClick={()=> setshowCreateBlock(true)} data-tip data-for='block' className="w-6 h-6 relative cursor-pointer">
                {!props.idblock &&
                    <>
                        <svg class={" " + (props.diseno ? 'cursor-pointer hover:bg-green-300 mt-1 w-8 h-8 text-green-600 bg-green-200 p-1 rounded' : 'w-6 h-6')} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                    </>
                }

                {props.idblock &&
                    <>
                        <svg class={" " + (props.diseno ? 'cursor-pointer hover:bg-green-300 mt-1 w-8 h-8 text-green-600 bg-green-200 p-1 rounded' : 'w-6 h-6')} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"></path></svg>
                    </>
                }
                
                <svg className={"w-4 h-4 absolute top-0  " + (props.diseno ? 'text-green-600 -right-4' : '-right-3')} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                <ReactTooltip backgroundColor="#000" id='block' effect='solid' place='bottom' aria-haspopup='true' role='example'>
                    {!props.idblock &&
                        <>
                            Create New block
                        </>
                    }
                    {props.idblock &&
                        <>
                            Add parkings or Rows
                        </>
                    }
                </ReactTooltip>
            </div>
        </>
    );
}

export default CreateBlock;