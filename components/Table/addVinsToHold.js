import React, { useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import Blackback from '../utilities/blackback'
import Modal from '../utilities/modal'
import useState from 'react-usestateref'
import { addVinsToHold, getHoldsFast } from '../functions/datafunctions'
import Select from 'react-select'
import {elim_duplicates} from '../utilities/elim_duplicates'
import {vintoshort} from '../utilities/VintoShort'

const addVinsToHold_ = (props) => {

    var [showmodal,setShowModal,showmodalRef] = useState(false)

    var [selected, setSelected, selectedRef] = useState('')
    var [vins,setVins, vinsRef] = useState('')

    var [errorselect, setErrorselect, errorselectRef] = useState(false)
    var [errorVins, setErrorVins, errorVinsRef] = useState(false)

    var [data, setData, dataRef] = useState([])

    var [mensajeSucceed, setmensajeSucceed, mensajeSucceedRef] = useState('')

    useEffect(() => {
        if(showmodalRef.current){
            getHoldsFast().then(res=>{
                if(res.error === false){
                    setData(res.data)
                }
            })
        }
    }, [showmodal])

    const anadirHold = async () =>{
        if(!selectedRef.current){
            setErrorselect(true)
            return;
        }
        setErrorselect(false)

        let parse_vins = []
        
        if(!props.vin){
            if(!vinsRef.current){
                setErrorVins(true)
                return;
            }
            setErrorVins(false)
            let array = elim_duplicates(vinsRef.current.split('\n'))
            parse_vins = await vintoshort(array)
            if(parse_vins === false){
                setErrorVins(true)
                return;
            }
            setErrorVins(false)
        }


        let json = {
            vins: props.vin ? [props.vin] : parse_vins,
            holdId: selectedRef.current.value
        }

        console.log("Lo que envio")
        console.log(json)

        addVinsToHold(json).then(res=>{
            if(res.error == false){
                setmensajeSucceed('Added!')
                if(props.montarTablaHolds){
                    props.montarTablaHolds()
                }
                setTimeout(() => {
                    
                    setSelected('')
                    setVins('')
                    setmensajeSucceed('')
                    setShowModal(false)
                }, 2500);
            }
        })
        console.log(parse_vins)


    }

    return (
        <>
            {showmodalRef.current &&
                <Blackback fulltotal={props.vin ? true : false}>
                    <Modal header={props.vin ? 'ADD VIN ' + props.vin + ' TO HOLD' : "ADD VINS TO HOLD"} closeModal={setShowModal} okbuttontext='ADD' okbutton={anadirHold} successtext={mensajeSucceedRef.current}>
                        <Select 
                            className={"border-2 text-xl font-medium rounded-lg mt-2 outline-none focus:outline-none text-gray-700 pt-2 pb-2 no-border-select " + (errorselectRef.current ? 'border-red-500' : '')}
                            onChange={(e)=>setSelected(e)}
                            placeholder="Select Hold"
                            value={selectedRef.current}
                            options={dataRef.current}
                        />
                        {!props.vin &&
                            <textarea rows="10" onChange={(e)=>setVins(e.target.value)} placeholder={'PASTE VINS'} className={"w-full border-2 focus:outline-none p-3 text-xl font-medium rounded-lg mt-3 " + (errorVinsRef.current ? 'border-red-500' : '')}></textarea>
                        }
                    </Modal>
                </Blackback>
            }
            <div onClick={()=>setShowModal(true)} data-tip data-for='addvinstohold' className="w-6 h-6 relative cursor-pointer">
                {props.intable &&
                    <>
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>
                        <span className="text-xs absolute top-0 -right-2">{props.count === null ? '0' : props.count}</span>
                    </>
                }
                {!props.intable &&
                    <>
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                        <svg className="w-4 h-4 absolute top-0 -right-3 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                    </>
                }
                <ReactTooltip backgroundColor="#000" id='addvinstohold' effect='solid' place='bottom' aria-haspopup='true' role='example'>
                    Add VINS to hold
                </ReactTooltip>
            </div>
        </>
    );
}

export default addVinsToHold_;