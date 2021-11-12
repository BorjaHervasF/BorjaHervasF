import React, { useEffect } from 'react';
import ReactTable from '../Table'
import Router from 'next/router';
import {useRouter} from 'next/router';
import {getTableEditor, deleteEditorRecord} from '../functions/datafunctions'
import useState from 'react-usestateref'
import BlackBack from '../utilities/blackback'
import Modal from '../utilities/modal'
import Inputs from '../editor/inputs'
import { propTypes } from 'qrcode.react';

const Table = () => {

    const router = useRouter()

    var [col, setCol, colRef] = useState('')

    var [data,setData, dataRef] = useState([])
    var [columns, setColumns, columnsRef] = useState([])

    var [showModal, setShowModal, showModalRef] = useState(false)
    var [showModalEliminar, setShowModalEliminar, showModalEliminarRef] = useState(false)

    var [datoEditar, setDatoEditar, datoEditarRef] = useState('')

    var [success, setSuccess, successRef] = useState(false)
    var [error, setError, errorRef] = useState('')

    useEffect(() => {
        setCol(Router.query.database)
        montarTabla()
    },[router.query])

    const montarTabla = () =>{
        getTableEditor(colRef.current).then(res=>{
            if(res.data){
                if(res.data.length > 0){
                    res.data.forEach(elm=>{
                        let obj = {obj: (
                            <div className="space-x-2 flex">
                                <svg onClick={()=>editar(elm)} class="w-6 h-6 ml-2 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                <svg onClick={()=>{
                                    setDatoEditar(elm)
                                    setShowModalEliminar(true)
                                }} class="w-6 h-6 text-red-500 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </div>
                        )}
                        elm.actions = obj['obj']
                    })
                    let columnas = []
                    Object.keys(res.data[0]).forEach(elm=>{
                        if(elm != 'actions'){
                            columnas.push({Header: elm, accessor: elm})
                        }
                    })
                    columnas.unshift({Header: '', accessor:'actions'})
                    setColumns(columnas)
                    setData(res.data)
                }else{
                    setColumns([])
                    setData([])
                }
            }else{
                setData([])
                setColumns([])
            }
        })
    }

    const editar = (dato) =>{
        setDatoEditar(dato)
        setShowModal(true)
    }

    const eliminar = () =>{
        let json = {
            name: Router.query.database,
            id: datoEditarRef.current.id
        }

        deleteEditorRecord(json).then(res=>{
            if(res.error === false){
                setError('')
                setSuccess(true)
                montarTabla()

                setTimeout(() => {
                    setError('')
                    setSuccess('')
                    setShowModalEliminar(false)
                }, 2000);
            }else{
                setSuccess(false)
                setError(res.message)
            }
        })
    }

    return (
        <>
            {showModalEliminarRef.current &&
                <BlackBack>
                    <Modal header={"Delete"} closeModal={setShowModalEliminar} >
                        <div className="flex justify-center items-center text-xl">
                            <span>Are you sure you want to delete record with <b>ID: {datoEditarRef.current.id}</b></span>
                        </div>
                        <div className="flex justify-center items-center text-xl mt-5 space-x-4">
                            <button onClick={()=>eliminar()} className="px-6 py-3 bg-red-500 rounded-lg text-white hover:bg-red-600 duration-300 transition-colors">
                                Delete
                            </button>

                            <button onClick={()=>setShowModalEliminar(false)} className="px-6 py-3 bg-gray-800 rounded-lg text-white hover:bg-black duration-300 transition-colors">
                                Cancel
                            </button>
                        </div>

                        <div className="flex justify-center items-center w-full">
                            {successRef.current &&
                                <span className="text-green-500">Deleted successfully</span>
                            }
                            {errorRef.current &&
                                <span className="text-red-500">{errorRef.current}</span>
                            }
                        </div>
                    </Modal>
                </BlackBack>
            }
            {showModalRef.current &&
                <BlackBack>
                    <Modal header="Edit Data" closeModal={setShowModal} >
                        <Inputs data={dataRef.current} type="edit" dato={datoEditarRef.current} close={setShowModal} actualizar={montarTabla} />
                    </Modal>
                </BlackBack>
            }
            <div className="font-bold text-xl pb-4">
               {Router.query.database} {">"}
            </div>
            <ReactTable load={true} montarTabla={montarTabla} data={dataRef.current} columns={columnsRef.current} create_db={true} actualizar={montarTabla} />
        </>
    );
}

export default Table;