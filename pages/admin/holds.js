import React, { useEffect } from 'react'
import Layout from '../../components/Layout'
import Table from '../../components/Table'
import useState from 'react-usestateref'
import { getHolds,toggleHold } from '../../components/functions/datafunctions'
import ReactTooltip from 'react-tooltip'
import Blackback from '../../components/utilities/blackback'
import Modal from '../../components/utilities/modal'

const layout = () => {

    var [data, setData, dataRef] = useState([])
    var [columns, setColumns, columnsRef] = useState([])

    var [dataInfo, setDataInfo, dataInfoRef] = useState([])
    var [columnsInfo, setColumnsInfo, columnsInfoRef] = useState([])
    var [showModal, setShowModal, showModalRef] = useState(false)

    const MontarTabla = () =>{

        getHolds().then(res=>{
            console.log(res)
            let json_columnas = [
                { Header: '', accessor: 'actions', width: 60},
                { Header: 'NAME', accessor: 'name'},
                { Header: 'ACTIVE', accessor: 'active'},
                { Header: 'PRIORITY', accessor: 'priority'},
                { Header: 'COUNT', accessor: 'count'},
            ]
    
            res.data.forEach((element,i)=>{
                let json = {
                    objeto: (
                        <>
                            <div class="relative inline-block w-10 mr-2 align-bottom select-none transition duration-200 ease-in">
                                <input onClick={()=>{
                                    toggle(element)
                                }} type="checkbox" name={"toggle_"+i} id={"toggle_"+i} className={"focus:outline-none toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-all duration-300 " +(element.active ? '-right-0.5' : '')}/>
                                <label for={"toggle_"+i} className={"focus:outline-none toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-all duration-300 " + (element.active ? 'bg-blue-500' : 'bg-gray-300')}></label>
                            </div>
                            <label onClick={()=>{
                                    toggle(element)
                            }} for={"toggle_"+i} className="text-md text-gray-700">{element.active ? 'ENABLED' : 'DISABLED'}</label>
                        </>
                    ),
                    actions:(
                        <>
                            <div>
                                <svg data-tip data-for={'showinfo_'+i} onClick={()=>mostrarInformacion(element)} class="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <ReactTooltip backgroundColor="#000" id={'showinfo_'+i} effect='solid' place='bottom' aria-haspopup='true' role='example'>
                                    Show info
                                </ReactTooltip>
                            </div>
                        </>
                    )
                }
                element.actions = json['actions']
                element.active = json['objeto']
            })
    
            setColumns(json_columnas)
            setData(res.data)
        })
    }

    useEffect(() => {
        MontarTabla()
    },[])

    const toggle = (element) =>{
        toggleHold(element.id).then(res=>{
            MontarTabla()
        })
    }

    const mostrarInformacion = (element) =>{
        if(element){
            let columnas = JSON.parse(localStorage.getItem('profile'))
            let new_arrayColumnas = []
            columnas['config']['stock'].forEach((col)=>{
                if(col.active == 1){
                    new_arrayColumnas.push(col)
                }
            })
            setColumnsInfo(new_arrayColumnas)
            setDataInfo(element.vehicle)
            setShowModal(true)
        }
    }


    return (
        <>
            {showModalRef.current &&
                <Blackback>
                    <Modal size={true} closeModal={setShowModal} header="HOLD">
                        <Table pagDefault={5} data={dataInfoRef.current} columns={columnsInfoRef.current} download={true} download_title={'hold'} montarTablaHolds={MontarTabla} />
                    </Modal>
                </Blackback>
            }
            <Layout>
                <div className="py-4 px-4">
                    <Table actualizar={MontarTabla} data={dataRef.current} columns={columnsRef.current} createHold={true} addvinstohold={true} releasehold={true} />
                </div>
            </Layout>
        </>
    );
}

export default layout;