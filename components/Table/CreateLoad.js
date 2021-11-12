import React from 'react';
import ReactTooltip from 'react-tooltip'
import Blackback from '../utilities/blackback'
import Modal from '../utilities/modal'
import useState from 'react-usestateref'
import {setLoad} from '../functions/datafunctions'

const CreateLoad = (props) => {

    var [show, setShow, showRef] = useState(false)
    var [vins,setVins,vinsRef] = useState('')

    var [error, setError, errorRef] = useState('')
    var [success, setSuccess, SuccessRef] = useState(false)

    const create_load = () =>{
        setShow(true)
        console.log(props.vins)
        let text_ = props.vins.join(', ')
        setVins(text_)
    }

    const create = () =>{

        let json = {
            vins: props.vins
        }

        setLoad(json).then(res=>{
            console.log(res)
            if(res.error === true){
                setSuccess(false)
                setError(res.message)

                setTimeout(() => {
                    setError('') 
                }, 5000);
            }else{
                setError('')
                setSuccess(true)

                setTimeout(() => {
                    setShow(false)
                }, 2000);
            }
        })

    }

    return (
        <>
            {showRef.current &&
                <Blackback>
                    <Modal header="Create Load" closeModal={setShow}>
                        <div className="text-center">
                            <span className="font-medium text-xl">You're about to create a load with these vins: &nbsp;</span>
                            <span>{vinsRef.current}</span>
                        </div>

                        <div className="text-center mt-4">
                            <button onClick={()=>create()} className="focus:outline-none border-2 rounded border-green-500 text-green-500 py-3 px-5 hover:bg-green-500 hover:text-white duration-300 transition-all ">
                                Create
                            </button>
                        </div>

                        {errorRef.current &&
                            <div className="text-center mt-4">
                                <span className="text-red-500">{errorRef.current}</span>
                            </div>
                        }

                        {SuccessRef.current &&
                            <div>
                                <span className="text-green-500">Created Successfully</span>
                            </div>
                        }
                    </Modal>
                </Blackback>
            }
            <div onClick={()=>create_load()} className="cursor-pointer">
                <svg data-tip data-for='createload' class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                <ReactTooltip backgroundColor="#000" id='createload' effect='solid' place='bottom' aria-haspopup='true' role='example'>
                    {'Create Load'}
                </ReactTooltip>
            </div>
        </>
    );
}

export default CreateLoad;