import React from 'react';
import ReactTooltip from 'react-tooltip'
import useState from 'react-usestateref'
import Blackback from '../utilities/blackback'
import Modal from '../utilities/modal'
import { generateUsernameHandheld , createHandheldUser } from '../functions/datafunctions'

const Createuser = (props) => {

    var [nombre, setNombre, nombreRef] = useState('')
    var [apellido, setApellido, apellidoRef] = useState('')
    var [codigoUser, setCodigouser, codigoUserRef] = useState('')

    var [errorNombre, seterrorNombre, errorNombreRef] = useState('')
    var [errorApellido, seterrorApellido, errorApellidoRef] = useState('')

    var [successtext, setsuccesstext, successtextRef] = useState('')
    var [errortext, seterrortext, errortextRef] = useState('')
    

    var [showModal, setshowModal, showModalRef] = useState(false)

    const createUser = (tipo) =>{
        if(!tipo){
            setshowModal(true)
        }else{
            if(!nombreRef.current){
                seterrorNombre('Introduce a correct name')
                return;
            }else{
                seterrorNombre('')
            }

            if(!apellidoRef.current){
                seterrorApellido('Introduce a correct surname')
                return;
            }else{
                seterrorApellido('')
            }

            if(!codigoUserRef.current){
                seterrorNombre('Wait to user code')
                seterrorApellido('Wait to user code')
                return;
            }else{
                seterrorNombre('')
                seterrorApellido('')
            }

            createHandheldUser(nombreRef.current, apellidoRef.current, codigoUserRef.current).then(res=>{
                if(props.montarTablaUsers){
                    props.montarTablaUsers()
                }
                if('error' in res){
                    if(res.error === true){
                        seterrortext(res.message)
                        setsuccesstext('')
                    }else{
                        setsuccesstext(res.message)
                        seterrortext('')

                        setTimeout(() => {
                            setsuccesstext('')
                            setApellido('')
                            setNombre('')
                            setshowModal(false)
                        }, 3000);
                    }
                }
            })


        }
    }

    const generarCodigoNombre = () =>{
        generateUsernameHandheld(nombreRef.current, apellidoRef.current).then(res=>{
            if('username' in res){
                setCodigouser(res.username)
            }
        })
    }


    return (
        <>
            {showModalRef.current &&
                <Blackback>
                    <Modal header="Create User" closeModal={setshowModal} okbuttontext="Create" okbutton={createUser} successtext={successtextRef.current} errortext={errortextRef.current}>
                        <input value={nombreRef.current} onChange={(e)=>{
                            setNombre(e.target.value)
                            generarCodigoNombre()
                        }} className={"w-full border-2 focus:outline-none p-3 text-lg font-medium rounded-lg " + (errorNombreRef.current ? ' border-red-500' : '')} placeholder="Name" />
                        {errorNombreRef.current &&
                            <span className="text-red-500">{errorNombreRef.current}</span>
                        }
                        <input value={apellidoRef.current} onChange={(e)=>{
                            setApellido(e.target.value)
                            generarCodigoNombre()
                        }} className={"w-full p-3 text-lg font-medium border-2 focus:outline-none rounded-lg mt-2 " + (errorApellidoRef.current ? ' border-red-500' : '')} placeholder="Surnames" />
                        {errorApellidoRef.current &&
                            <span className="text-red-500">{errorApellidoRef.current}</span>
                        }
                        <input value={codigoUserRef.current} disabled className="w-full p-3 text-lg font-medium border-2 focus:outline-none rounded-lg mt-2 bg-gray-200" placeholder="Cod. User" />
                    </Modal>
                </Blackback>
            }
            <div onClick={()=>createUser(false)} className="cursor-pointer">
                <svg data-tip data-for='create_user' class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
                <ReactTooltip backgroundColor="#000" id='create_user' effect='solid' place='bottom' aria-haspopup='true' role='example'>
                    Create User
                </ReactTooltip>
            </div>
        </>
    );
}

export default Createuser;