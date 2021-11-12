import React, { useEffect } from 'react';
import Blackback from './utilities/blackback'
import Modal from './utilities/modal'
import {generatePin, deletePin} from './functions/datafunctions'
import QRCode from 'qrcode.react'
import useState from 'react-usestateref'

const getPin = (props) => {

    var [pin,setPin,pinRef] = useState('')
    var [counters, setcounters, countersRef] = useState(30)

    var [cerrar, setcerrar, cerrarRef] = useState(false)

    const generarPin = () =>{
        if(!cerrarRef.current){
            if(props.showpin){
                generatePin().then(res=>{
                    if(res.error === false){
                        setPin(res.pin)
                        setcounters(30)
                    }
                })
        
                restar()
                setTimeout(() => {
                    generarPin()
                }, 30000);
            }
        }
    }

    const restar = () =>{
        if(!cerrarRef.current){
            if(props.showpin){
                setcounters(countersRef.current - 1)
                if(countersRef.current !== 1){
                    setTimeout(() => {
                        restar()
                    }, 1000);
                }
            }
        }
    }

    useEffect(() => {
        if(props.showpin){
            setcerrar(false)
            generarPin()
        }
    },[props.showpin])

    const cerrarModal = () =>{
        props.toggleshow()
        deletePin().then(res=>{
            setcerrar(true)
        })
    }


    return (
        <>
            {props.showpin &&
                <Blackback>
                    <Modal header={'PIN'} closeModal={cerrarModal}>
                        <div className="w-full justify-center flex">
                            <QRCode renderAs={"svg"} value={pinRef.current} bgColor={'transparent'} size={250} />
                        </div>
                        <div className="w-full text-center mt-2">
                            <span className="text-2xl font-medium">{pinRef.current}</span>
                        </div>
                        <div className={"w-full text-center mt-2 " + ((countersRef.current < 30 && countersRef.current >= 15) ? 'progress-verde' : (countersRef.current < 15 && countersRef.current >= 5) ? 'progress-amarillo' : (countersRef.current < 5) ? 'progress-rojo' : 'progress-verde' )}>
                            <progress value={countersRef.current} max="30"> {countersRef.current} </progress>
                        </div>
                    </Modal>
                </Blackback>
            }
        </>
    );
}

export default getPin;