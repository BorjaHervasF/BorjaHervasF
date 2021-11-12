import React, { useEffect } from 'react'
import Blackback from '../../utilities/blackback'
import Modal from '../../utilities/modal'
import useState from 'react-usestateref'
import {getCompounChildren, getPositionsChildren, changeVinPosition} from '../../functions/datafunctions'
import Select from 'react-select'

const Changeposition = (props) => {

    var [data, setData, dataRef] = useState([])

    var [selectoptions, setselectoptions, selectoptionsRef] = useState([])
    var [selectItems, setselectItems, selectItemsRef] = useState('')

    var [selectoptionsPositions, setselectoptionsPositions, selectoptionsPositionsRef] = useState([])
    var [selectItemsPositions, setselectItemsPositions, selectItemsPositionsRef] = useState('')

    var [selectoptionsSlot, setselectoptionsSlot, selectoptionsSlotRef] = useState([])
    var [selectItemsSlot, setselectItemsSlot, selectItemsSlotRef] = useState('')

    var [secOpEmptype, setsecOpEmptype, secOpEmptypeRef] = useState(false)

    var [successtext, setsuccesstext, successtextRef] = useState('')
    var [ErrorMessage, setErrorMessage, ErrorMessageRef] = useState('')

    useEffect(() => {
        getCompounChildren().then(res=>{
            let array = []
            if(res.error === false){
                res.data.forEach((elem)=>{
                    elem.value = elem.id
                    elem.label = elem.name
                    array.push(elem)
                })
                setselectoptions(array)
            }
        })
    },[])

    useEffect(() => {
        if(props.idVin){
            setData(props.idVin)
        }
    }, [props.idVin])

    const get_positions = (id) =>{
        setselectoptionsPositions([])
        setselectItemsPositions('')
        getPositionsChildren(id).then(res=>{
            let positions = []
            if('error' in res){
                if(res.error === false){
                    if(res.data.length === 0){
                        setsecOpEmptype(true)
                    }else{
                        setsecOpEmptype(false)
                        res.data.forEach((elem)=>{
                            elem.value = elem.id
                            elem.label = elem.name
                            if(elem.capacity === elem.fill){

                            }else{
                                positions.push(elem)
                            }
                        })
                        setselectoptionsPositions(positions)
                    }
                }
            }
        })
    }

    const get_slot = (id) =>{
        getPositionsChildren(id).then(res=>{
            let slots = []
            if('error' in res){
                res.data.forEach((elem)=>{
                    elem.value = elem.id
                    elem.label = elem.name
                    if(elem.capacity === elem.fill){

                    }else{
                        slots.push(elem)
                    }
                })
                setselectoptionsSlot(slots)
            }
        })
    }

    const cambiar_posicion = ({tipo}) =>{
        if(tipo){
            let id_enviar = ''
            if(!selectItemsRef.current){
                return;
            }
            if(!selectItemsPositionsRef.current && (secOpEmptypeRef.current === false)){
                return;
            }else{
                if(!selectItemsSlotRef.current && (secOpEmptypeRef.current === false)){
                    return;
                }else{
                    id_enviar = selectItemsSlotRef.current.value
                }
            }
            
            if(secOpEmptypeRef.current){
                id_enviar = selectItemsRef.current.value
            }


            changeVinPosition(id_enviar, dataRef.current.vin).then(res=>{
                if(res.error === false){
                    setsuccesstext(res.message)
                    setErrorMessage('')
                
                    props.montarTabla()

                    setTimeout(() => {
                        setselectItemsPositions('')
                        setselectItems('')
                        setselectoptionsPositions([])
                        setsuccesstext('')
                        props.closeButton()
                    }, 3000);
                }else{
                    setsuccesstext('')
                    setErrorMessage(res.message);
                }
            })
            
        }
    }


    return (
        <Blackback>
            <Modal header={"Change position ("+dataRef.current.position+") of " + dataRef.current.vin} closeModal={props.closeButton} okbutton={cambiar_posicion} okbuttontext={(selectItemsSlotRef.current) ? 'Change Position' : (secOpEmptypeRef.current ? 'Change Position' : '')} errortext={ErrorMessageRef.current} successtext={successtextRef.current} >
                <Select 
                className="border-2 text-xl font-medium rounded-lg mt-2 outline-none focus:outline-none text-gray-700 pt-2 pb-2 no-border-select"
                placeholder="Select Parking"
                value={selectItemsRef.current}
                onChange={(e)=>{
                    setselectItemsSlot('')
                    setselectoptionsSlot([])
                    setselectItems(e)
                    get_positions(e.id)
                }}
                options={selectoptionsRef.current}
                />
                {selectoptionsPositionsRef.current.length > 0 &&
                    <Select 
                    className="border-2 text-xl font-medium rounded-lg mt-2 outline-none focus:outline-none text-gray-700 pt-2 pb-2 no-border-select mt-2"
                    placeholder="Select Position"
                    value={selectItemsPositionsRef.current}
                    onChange={(e)=>{
                        setselectItemsSlot('')
                        setselectItemsPositions(e)
                        get_slot(e.id)
                    }}
                    options={selectoptionsPositionsRef.current}
                    />
                }
                {selectoptionsSlotRef.current.length > 0 &&
                    <Select 
                    className="border-2 text-xl font-medium rounded-lg mt-2 outline-none focus:outline-none text-gray-700 pt-2 pb-2 no-border-select mt-2"
                    placeholder="Select Position"
                    value={selectItemsSlotRef.current}
                    onChange={(e)=>{
                        setselectItemsSlot(e)
                    }}
                    options={selectoptionsSlotRef.current}
                    />
                }
                {(selectoptionsSlotRef.current.length === 0 && selectItemsSlotRef.current) &&
                    <div className="mt-2 w-full text-center">
                        <span className="text-red-500">There is no slots available</span>
                    </div>
                }

            </Modal>
        </Blackback>
    );
}

export default Changeposition;