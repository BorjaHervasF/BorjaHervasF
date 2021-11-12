import React, { useEffect } from 'react';
import Table from '../../Table'
import useState from 'react-usestateref'
import {getCompounChildren, toggleActiveParking, getPositionsChildren, getVinsPOST, deleteParking} from '../../functions/datafunctions'
import ReactTooltip from 'react-tooltip'
import BlackBack from '../../utilities/blackback'
import Modal from '../../utilities/modal'

const table = () => {

    var [data, setData, dataRef] = useState([])
    var [columns, setColumns, columnsRef] = useState([])

    var [showPosition, setShowPosition, showPositionRef] = useState(false)

    var [dataPosition, setDataPosition, dataPositionRef] = useState([])

    var [showDeleteModal, setShowDeleteModal, showDeleteModalRef] = useState(false)

    var [Selected, setSelected, SelectedRef] = useState('')

    var [Error, setError, ErrorRef] = useState('')
    var [successtext, setsuccesstext, successtextRef] = useState(false)

    const CargarParking = () =>{
        getCompounChildren().then(res=>{
            setShowPosition(false)
            console.log(res)
            if(res.error === false){
                console.log("entrando")
                let rows = [
                    {Header: '', accessor: 'actions', width: 120},
                    {Header: 'PARKING', accessor: 'name'},
                    {Header: 'CATEGORY', accessor: 'category'},
                    {Header: 'CAPACITY', accessor: 'capacity'},
                    {Header: 'FILL', accessor: 'fill'},
                ]
    
                res.data.forEach((dato,i)=>{
                    let objeto = {
                        actions: (
                            <div className="flex items-center justify-start space-x-3">
                                <svg onClick={()=>{
                                    setSelected(dato)
                                    setShowDeleteModal(true)
                                }} class="w-6 h-6 text-red-500 cursor-pointer" data-tip data-for={'delete_'+i} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                <ReactTooltip backgroundColor="red" id={'delete_'+i} effect='solid' place='bottom' aria-haspopup='true' role='example'>
                                    Delete Parking
                                </ReactTooltip>
                                {dato.active === true &&
                                    <> 
                                        <svg onClick={()=>toggleParking(dato)} data-tip data-for={'block_'+i} class="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                        <ReactTooltip backgroundColor="#000" id={'block_'+i} effect='solid' place='bottom' aria-haspopup='true' role='example'>
                                            Block Parking
                                        </ReactTooltip>
                                    </>
                                }
                                {dato.active !== true &&
                                    <>
                                        <svg onClick={()=>toggleParking(dato)} data-tip data-for={'unblock_'+i} class="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path></svg>
                                        <ReactTooltip backgroundColor="#000" id={'unblock_'+i} effect='solid' place='bottom' aria-haspopup='true' role='example'>
                                            Unblock Parking
                                        </ReactTooltip>
                                    </>
                                }       
                                <svg onClick={()=>expand_parking(dato)} class="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg>     
                            </div>
                        )
                    }
    
                    dato.actions = objeto.actions
                })
    
    
    
                setColumns(rows)
                setData(res.data)
            }
        })
    }
    

    useEffect(() => {
        CargarParking()
    }, [])

    const expand_parking = (parking) =>{
        
        console.log(parking)
        getPositionsChildren(parking.id).then(res=>{
            setShowPosition(true)
            console.log(res)
            res.data.forEach((dato,i)=>{
                let objeto = {
                    actions: (
                        <div className="flex items-center justify-start space-x-3">
                            <svg onClick={()=>{
                                    setSelected(dato)
                                    setShowDeleteModal(true)
                                }} class="w-6 h-6 text-red-500 cursor-pointer" data-tip data-for={'delete_'+i} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            {dato.active === true &&
                                <> 
                                    <svg onClick={()=>toggleParking(dato)} data-tip data-for={'block_'+i} class="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                    <ReactTooltip backgroundColor="#000" id={'block_'+i} effect='solid' place='bottom' aria-haspopup='true' role='example'>
                                        Block Parking
                                    </ReactTooltip>
                                </>
                            }
                            {dato.active !== true &&
                                <>
                                    <svg onClick={()=>toggleParking(dato)} data-tip data-for={'unblock_'+i} class="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path></svg>
                                    <ReactTooltip backgroundColor="#000" id={'unblock_'+i} effect='solid' place='bottom' aria-haspopup='true' role='example'>
                                        Unblock Parking
                                    </ReactTooltip>
                                </>
                            } 
                            <svg onClick={()=>expand_parking_vins(dato)} class="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg>
                        </div>
                    ) 
                }

                dato.actions = objeto.actions
            })
            setData(res.data)
            setDataPosition(res.data)
        })
    }

    const expand_parking_vins = (position) =>{
        getPositionsChildren(position.id).then(res=>{
            console.log(res)
            let positionsChild = []
            if(res.error === false){
                res.data.forEach(elem=>{
                    positionsChild.push(elem.id)
                })
                getVinsPOST(positionsChild).then(res=>{
                    console.log(res)
                })
            }
        })
    }


    const toggleParking = (parking) =>{
        toggleActiveParking(parking.id).then(res=>{
            console.log(res)
            CargarParking()
        })
    }

    const eliminar_parking = () =>{
        deleteParking(SelectedRef.current.id).then(res=>{
            console.log(res)

            if(res.error === false){
                setError('')
                setsuccesstext(true)
                CargarParking()

                setTimeout(() => {
                    setShowDeleteModal(false)
                }, 2000);
            }else{
                setsuccesstext(false)
                setError(res.message)
                setTimeout(() => {
                    setError('')
                }, 2000);
            }
        })
    }

    return (
        <>
            {showDeleteModalRef.current &&
                <BlackBack>
                    <Modal header="Delete Parking" closeModal={setShowDeleteModal}>
                        <div className="font-medium text-xl">
                            Are you sure you want to delete <b>{" " + SelectedRef.current.name}</b> ?
                        </div>

                        <div className="justify-center flex mt-4 text-lg">
                            <button onClick={()=>eliminar_parking()} className="focus:otuline-none border-2 border-red-500 px-6 py-2.5 rounded-lg hover:bg-red-500 duration-300 transition-colors hover:text-white text-red-500">
                                Delete
                            </button>
                        </div>

                        {successtextRef.current &&
                            <div className="justify-center text-green-500 flex ">
                                Deleted!
                            </div>
                        }
                        {ErrorRef.current &&
                            <div className="justify-center flex text-red-500">
                                {ErrorRef.current}
                            </div>
                        }
                    </Modal>
                </BlackBack>
            }
            <div>
                {showPositionRef.current &&
                    <div onClick={()=>{
                        CargarParking()
                    }} className="flex justify-start items-center cursor-pointer space-x-2 mb-2">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
                        <span className="font-medium"> Go Back</span>
                    </div>
                }
                <Table data={dataRef.current} columns={columnsRef.current} pagDefault={16} download={true} download_title={'layout'} />
            </div>
        </>
    );
}

export default table;