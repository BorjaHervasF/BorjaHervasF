import React, { useEffect } from 'react';
import ReactTooltip from 'react-tooltip'
import Blackback from '../utilities/blackback'
import Modal from '../utilities/modal'
import useState from 'react-usestateref'
import {elim_duplicates} from '../utilities/elim_duplicates'
import {vintoshort} from '../utilities/VintoShort'
import {releaseVinsHold, getHoldsFast} from '../functions/datafunctions'
import Select from 'react-select'

const releaseHolds_ = (props) => {

    var [vins,setVins, vinsRef] = useState('')

    var [errorselect, setErrorselect, errorselectRef] = useState(false)
    var [errorVins, setErrorVins, errorVinsRef] = useState(false)

    var [selected, setSelected, selectedRef] = useState('')

    var [data, setData, dataRef] = useState([])

    var [showModal, hideModal, showModalRef] = useState(false)

    var [oksuccess, setoksuccess, oksuccessRef] = useState(false)
    var [successtext, setsuccesstext, successtextRef] = useState('')

    var [errortext, seterrortext, errortextRef] = useState('')

    useEffect(() => {
        getHoldsFast().then(res=>{
            if(res.error === false){
                setData(res.data)
            }
        })
    },[])

    const release = async () =>{

        if(!vinsRef.current){
            setErrorVins(true)
            return;
        }
        setErrorVins(false)

        if(!selectedRef.current){
            setErrorselect(true)
            return;
        }
        setErrorselect(false)

        let vins_ = await vintoshort(elim_duplicates(vinsRef.current.split('\n')))

        let json = {
            holdId: selectedRef.current.value,
            vins: vins_
        }

        releaseVinsHold(json).then(res=>{
            if(res.error === false){
                seterrortext('')
                setoksuccess(true)
                setsuccesstext('Released!')
                props.actualizar()

                setTimeout(() => {
                    setVins('')
                    setsuccesstext('')
                    setoksuccess(false)
                    hideModal(false)
                }, 2500);
            }else{
                seterrortext(res.message)
            }
        })
    }

    return (
        <>
            {showModalRef.current &&
                <Blackback>
                    <Modal errortext={errortextRef.current} successtext={successtextRef.current} header="Release VINs" okbutton={release} okbuttontext="Release" closeModal={hideModal} >
                        <Select 
                            className={"border-2 text-xl font-medium rounded-lg mt-2 outline-none focus:outline-none text-gray-700 pt-2 pb-2 no-border-select " + (errorselectRef.current ? 'border-red-500' : '')}
                            onChange={(e)=>setSelected(e)}
                            placeholder="Select Hold"
                            value={selectedRef.current}
                            options={dataRef.current}
                        />
                        <textarea rows="10" onChange={(e)=>setVins(e.target.value)} placeholder={'PASTE VINS'} className={"w-full border-2 focus:outline-none p-3 text-xl font-medium rounded-lg mt-3 " + (errorVinsRef.current ? 'border-red-500' : '')}></textarea>    
                    </Modal>  
                </Blackback>
            }
            <div data-tip data-for='releasehold' className="w-6 h-6 relative cursor-pointer">
                <svg onClick={()=>hideModal(true)} class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                <svg class="w-2 h-2 absolute top-0.5 text-black -right-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>
                <ReactTooltip backgroundColor="#000" id='releasehold' effect='solid' place='bottom' aria-haspopup='true' role='example'>
                    Release VINs from hold
                </ReactTooltip>
            </div>
        </>
    );
}

export default releaseHolds_;