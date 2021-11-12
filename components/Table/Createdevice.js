import React, { useEffect } from 'react';
import ReactTooltip from 'react-tooltip'
import useState from 'react-usestateref'
import Blackback from '../utilities/blackback'
import Modal from '../utilities/modal'
import { getDevices , createDevice } from '../functions/datafunctions'
import Select from 'react-select'

const Createuser = () => {

    var [nombre, setNombre, nombreRef] = useState('')
    var [imei, setimei, imeiRef] = useState('')
    var [codigoUser, setCodigouser, codigoUserRef] = useState('')

    var [errorNombre, seterrorNombre, errorNombreRef] = useState('')
    var [errorimei, seterrorimei, errorimeiRef] = useState('')
    var [errorselect, seterrorselect, errorselectRef] = useState('')

    var [successtext, setsuccesstext, successtextRef] = useState('')
    var [errortext, seterrortext, errortextRef] = useState('')

    var [selectoptions, setSelectoptions, selectoptionsRef] = useState([])
    var [select, setselect, selectRef] = useState('')
    
    

    var [showModal, setshowModal, showModalRef] = useState(false)

    useEffect(() => {
        getDevices().then(res=>{
            if('error' in res){
                if(res.error === false){
                    setSelectoptions(res.data)
                }
            }
        })
    }, [])



    const createdevice = (tipo) =>{
        if(tipo){
            if(!nombreRef.current){
                seterrorNombre('Introduce a correct name')
                return;
            }else{
                seterrorNombre('')
            }

            if(!imeiRef.current){
                seterrorimei('Introduce a correct imei')
                return;
            }else{
                seterrorimei('')
            }

            if(!selectRef.current){
                seterrorselect('Introduce a correct Device')
                return;
            }else{
                seterrorselect('')
            }

            createDevice(nombreRef.current, imeiRef.current, selectRef.current.value).then(res=>{
                console.log(res)
                if('error' in res){
                    if(res.error === true){
                        seterrortext(res.message)
                        setsuccesstext('')
                    }else{
                        setsuccesstext(res.message)
                        seterrortext('')

                        setTimeout(() => {
                            setsuccesstext('')
                            setimei('')
                            setNombre('')
                            setshowModal(false)
                        }, 3000);
                    }
                }
                return;
            })
            return;


        }
    }


    return (
        <>
            {showModalRef.current &&
                <Blackback>
                    <Modal header="Create Device" closeModal={setshowModal} okbuttontext="Create" okbutton={createdevice} successtext={successtextRef.current} errortext={errortextRef.current}>
                        <input value={nombreRef.current} onChange={(e)=>{
                            setNombre(e.target.value)
                        }} className={"w-full border-2 focus:outline-none p-3 text-lg font-medium rounded-lg " + (errorNombreRef.current ? ' border-red-500' : '')} placeholder="Name" />
                        {errorNombreRef.current &&
                            <span className="text-red-500">{errorNombreRef.current}</span>
                        }
                        <input value={imeiRef.current} onChange={(e)=>{
                            setimei(e.target.value)
                        }} className={"w-full p-3 text-lg font-medium border-2 focus:outline-none rounded-lg mt-2 " + (errorimeiRef.current ? ' border-red-500' : '')} placeholder="Imei" />
                        {errorimeiRef.current &&
                            <span className="text-red-500">{errorimeiRef.current}</span>
                        }
                        <Select 
                        className={"border-2 text-xl font-medium rounded-lg mt-2 outline-none focus:outline-none text-gray-700 pt-2 pb-2 no-border-select " + (errorselectRef.current ? 'border-red-500' : '')}
                            onChange={(e)=>setselect(e)}
                            placeholder="Select device"
                            value={selectRef.current}
                            options={selectoptionsRef.current}
                        />
                        {errorselectRef.current &&
                            <span className="text-red-500">{errorselectRef.current}</span>
                        }
                    </Modal>
                </Blackback>
            }
            <div onClick={()=>setshowModal(true)} className="cursor-pointer">
                <svg data-tip data-for='create_device' class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                <ReactTooltip backgroundColor="#000" id='create_device' effect='solid' place='bottom' aria-haspopup='true' role='example'>
                    Create Device
                </ReactTooltip>
            </div>
        </>
    );
}

export default Createuser;