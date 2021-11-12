import React from 'react';
import ReactTooltip from 'react-tooltip';
import Modal from '../utilities/modal'
import BlackBack from '../utilities/blackback'
import useState from 'react-usestateref'
import Inputs from '../editor/inputs'

const create_db = (props) => {

    var [showModal, setShowModal, showModalRef] = useState(false) 

    return (
        <>  
            {showModalRef.current &&
                <BlackBack>
                    <Modal header="Insert Data" closeModal={setShowModal} >
                        <Inputs data={props.data} type="create" close={setShowModal} actualizar={props.actualizar} />
                    </Modal>
                </BlackBack>
            }
            <div onClick={()=>setShowModal(true)} className="cursor-pointer relative">
                <svg data-tip data-for='database' class="w-6 h-6 hover:text-black text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>
                <svg class="w-4 h-4 absolute -right-2.5 -bottom-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                <ReactTooltip backgroundColor="#000" id='database' effect='solid' place='bottom' aria-haspopup='true' role='example'>
                    Insert data
                </ReactTooltip>
            </div>
        </>
    );
}

export default create_db;