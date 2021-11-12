import React, { useEffect } from 'react'
import Head from 'next/head';
import Layout from '../../components/Layout'
import Table from '../../components/Table'
import useState from 'react-usestateref'
import {getUsersTable, resetPassUser, logoutUser} from '../../components/functions/datafunctions'
import Blackback from '../../components/utilities/blackback'
import Modal from '../../components/utilities/modal'
import io from 'socket.io-client'
import ReactTooltip from 'react-tooltip'

const users = () => {
    

    var [data, setData, dataRef] = useState([])
    var [dataAux, setdataAux, dataAuxRef] = useState([])
    var [columns, setColumns, columnsRef] = useState([])

    var [modalVisible, setmodalVisible, modalVisibleRef] = useState(false)

    var [modalData, setmodalData, modalDataRef] = useState('')
    var [userSel, setuserSel, userSelRef] = useState('')


    var [stateUsed, setStateUsed, stateUsedRef] = useState('')

    const montarTabla = () =>{
        let columnas = [
            {
                Header: '',
                accessor: 'actions',
                width: 90
            },
            {
                Header: 'USER',
                accessor: 'user'
            },
            {
                Header: 'NAME',
                accessor: 'name'
            },
            {
                Header: 'SURNAME',
                accessor: 'surname'
            },
            {
                Header: 'STATE',
                accessor: 'online'
            },
            {
                Header: 'DEVICE',
                accessor: 'device'
            },
            {
                Header: 'DEVICE TYPE',
                accessor: 'deviceType'
            },
            {
                Header: 'DEVICE VERSION',
                accessor: 'deviceVersion'
            },
            {
                Header: 'LAST LOGIN',
                accessor: 'last_login'
            },
        ]
        setColumns(columnas)
        getUsersTable().then(res=>{
            console.log(res)
            let array = []
            if(res.error === false){
                res.data.forEach((e,i)=>{
                    let object = {
                        object: (
                            <>
                                <div className="flex space-x-3">
                                    <svg data-tip data-for={'res_pass_'+i} onClick={()=>res_password({user: e})} id={'res_pass_'+i} className="w-6 h-6 text-gray-800 cursor-pointer hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                                    <ReactTooltip backgroundColor="#000" id={'res_pass_'+i} effect='solid' place='bottom' aria-haspopup='true' role='example'>
                                        Restore Password
                                    </ReactTooltip>
                                    <svg data-tip data-for={'logout_'+i} onClick={()=>logout({user: e})} id={'logout_'+i} className="w-6 h-6  text-red-500 cursor-pointer hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                    <ReactTooltip backgroundColor="#000" id={'logout_'+i} effect='solid' place='bottom' aria-haspopup='true' role='example'>
                                        Logout
                                    </ReactTooltip>
                                </div>
                            </>
                        )
                    }
    
                    e['actions'] = object['object']
    
                    array.push(e)
                })
                setData(array)
                setdataAux(array)
            }
        })
    }


    useEffect(()=>{
        montarTabla()
    }, [])

    const res_password = ({user, tipo}) =>{
        if(!tipo){
            setmodalData({header: "Restore password", okbuttontext: 'Confirm', okbutton: res_password})
            setStateUsed('restore password')
            setmodalVisible(true)
            setuserSel(user)
        }else{
            resetPassUser(userSelRef.current.id).then(res=>{
                montarTabla()
                if('error' in res){
                    if(res.error === true){
                        console.log(res)
                    }else{
                        setmodalVisible(false)
                    }
                }else{
                    setmodalVisible(false)
                }
            })
        }
    }

    const logout = ({user, tipo}) =>{
        if(!tipo){
            setmodalData({header: "Logout", okbuttontext: 'Confirm', okbutton: logout})
            setStateUsed('logout')
            setmodalVisible(true)
            setuserSel(user)
        }else{
            logoutUser(userSelRef.current.id).then(res=>{
                montarTabla()
                if('error' in res){
                    if(res.error === true){
                        console.log(res)
                    }else{
                        setmodalVisible(false)
                    }
                }else{
                    setmodalVisible(false)
                }
            })
            
        }
    }


    return (
        <>
            {modalVisibleRef.current &&
                <Blackback>
                    <Modal header={modalDataRef.current.header} closeModal={setmodalVisible} okbutton={modalDataRef.current.okbutton} okbuttontext={modalDataRef.current.okbuttontext} >
                        <span className="text-xl font-medium">Are you sure you want to <span class="text-red-500">{stateUsedRef.current}</span> to <b>{userSelRef.current.name + ' ' + userSelRef.current.surname }</b></span>
                    </Modal>
                </Blackback>
            }
            <Layout>
                <div className="py-4 px-4">
                    <Table sendMessageUsers={true} montarTablaUsers={montarTabla} data={dataRef.current} columns={columnsRef.current} users={true} createUser={true} createDevice={false} />
                </div>
            </Layout>
        </>
    );
}

export default users;