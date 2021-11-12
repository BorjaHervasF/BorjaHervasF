import React, { useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import Modal from '../utilities/modal'
import Blackback from '../utilities/blackback'
import Select from 'react-select'
import useState from 'react-usestateref'
import io from 'socket.io-client'

const SendMessageUsers = () => {

    var [closeModal, setCloseModal, closeModalRef] = useState(false)
    
    var [select, setSelect, selectRef] = useState('')
    var [selectoptions, setSelectoptions, selectoptionsRef] = useState([])
    var [errorselect, setErrorselect, errorselectRef] = useState(false)

    var [nombre, setNombre, nombreRef] = useState('')

    var [successtext, setSuccesstext, successtextRef] = useState('')


    useEffect(() => {
        console.log("Me voy a conectar")
        const api_socket = 'https://realtime.prometeus.dev/';
        const token_socket = `${sessionStorage.Authorization}`;
        const compoundID = `${localStorage.compound_id}`;
        const Username = `${localStorage.username}`;

        const socket = io(api_socket, {
    
            query:{token:token_socket, room:"onlineUsers", username:Username, compoundId:compoundID},
    
        });

        socket.on('users', (res) => {
    
            console.log("Conexion USERS SOCKET")
            console.log(res);

            res.forEach(element=>{
                element.label = element.username
                element.value = element.socketId
            })

            setSelectoptions(res)
    
        })

        return () =>{
            socket.disconnect()
        }
    },[])

    const enviar_mensaje = () =>{
        if(!selectRef.current){
            setErrorselect(true)
            return;
        }
        if(!nombreRef.current){
            setErrorselect(true)
            return;
        }

        setErrorselect(false)

        console.log("Bien")
        selectRef.current.forEach(user=>{
            sendMessage(user)
        })

        setTimeout(() => {
            setSelect('')
            setNombre('')
            setSuccesstext('Sent!')
        }, 1000);

        setTimeout(() => {
            setSuccesstext('')
        }, 3500);

    }

    const sendMessage = (user) => {

        let go = true

        if(selectoptionsRef.current.map(elm => elm.username == user.label).includes(true)){
            // console.log("Online")
            
        }else{
            // console.log("OFFLINE!")
            go = false
        }

        if(go){
            const api_socket = 'https://realtime.prometeus.dev/';
            const token_socket = `${sessionStorage.Authorization}`;
            const compoundID = `${localStorage.compound_id}`;
            const Username = `${localStorage.username}`;
    
            const socket = io(api_socket, {
        
                query:{token:token_socket, room:"onlineUsers", username:Username, compoundId:compoundID},
        
            });
    
            socket.emit("private message", {
                message: nombreRef.current,
                to: user.value,
                from: localStorage.username
            })
        }

        // console.log("hola");
    }
    

    return (
        <>
            {closeModalRef.current &&
                <Blackback>
                    <Modal header="Send Message to Users" closeModal={setCloseModal} okbutton={enviar_mensaje} okbuttontext="SEND" successtext={successtextRef.current}>
                        <Select 
                            className={"border-2 text-xl font-medium rounded-lg mt-2 outline-none focus:outline-none text-gray-700 pt-2 pb-2 no-border-select " + (errorselectRef.current ? 'border-red-500' : '')}
                            onChange={(e)=>setSelect(e)}
                            placeholder="Select Users"
                            isMulti={true}
                            closeMenuOnSelect={false}
                            value={selectRef.current}
                            options={selectoptionsRef.current}
                        />

                        <textarea value={nombreRef.current} onChange={(e)=>setNombre(e.target.value)} rows="6" placeholder="Message" className={"border-2 text-xl font-medium rounded-lg mt-2 outline-none focus:outline-none text-gray-700 p-2 w-full "  + (errorselectRef.current ? 'border-red-500' : '')} />
                    </Modal>
                </Blackback>
            }

            <svg onClick={()=>setCloseModal(true)} data-tip data-for='message_users' class="w-6 h-6 hover:text-black text-gray-800 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
            <ReactTooltip backgroundColor="#000" id='message_users' effect='solid' place='bottom' aria-haspopup='true' role='example'>
                Message Users
            </ReactTooltip>
        </>
    );
}

export default SendMessageUsers;