import React, { useEffect } from 'react'
import Head from 'next/head';
import Layout from '../../components/Layout'
import Table from '../../components/Table'
import useState from 'react-usestateref'
import {getStock} from '../../components/functions/datafunctions'
import Vininfo from '../../components/Vininfo'
import Changeposition from '../../components/yard/stock/Changeposition'
import io from 'socket.io-client'
import Addvinstohold from '../../components/Table/addVinsToHold'

const stock = () => {
    
    
    var [data, setData, dataRef] = useState([])
    var [dataAux, setdataAux, dataAuxRef] = useState([])
    var [columns, setColumns, columnsRef] = useState([])
    
    var [dataVin, setdataVin, dataVinRef] = useState([])
    
    var [showVinInfo, setshowVinInfo, showVinInfoRef] = useState(false)
    var [showChangePosition, setshowChangePosition, showChangePositionRef] = useState(false)
    
    useEffect(()=>{
        montarTabla()
    }, [])
    
    useEffect(()=>{

        const api_socket = 'http://81.36.152.196:4000';
        const token_socket = `${sessionStorage.Authorization}`;
        const compoundID = `${localStorage.compound_id}`;
        const Username = `${localStorage.username}`;
        const socket = io(api_socket, {
    
            query:{token:token_socket, room:"stock", username:Username, compoundId:compoundID},
    
        });
    
        socket.on('vehicles', (res) => {
    
            // console.log(res);
            let array = []
            res.forEach((e,i)=>{
                let object = {
                    object: (
                        <>
                            <div className="flex space-x-2">
                                <svg onClick={()=>change_position({data: e})} id={'change_position_'+i} className="w-6 h-6 text-gray-800 cursor-pointer hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                <svg onClick={()=>vin_info({data: e})} id={'vin_info_'+i} className="w-6 h-6 text-gray-800 cursor-pointer hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                                <Addvinstohold count={e.holdsCount} intable={true} vin={e.vin} />
                            </div>
                        </>
                    )
                }

                e['actions'] = object['object']

                array.push(e)
            })
            setData(array)
            setdataAux(array)
    
        })

        return () =>{
            socket.disconnect()
        }
    }, [])

    const montarTabla = () =>{
        let columnas = JSON.parse(localStorage.getItem('profile'))
        let new_arrayColumnas = []
        columnas['config']['stock'].forEach((col)=>{
            if(col.active == 1){
                new_arrayColumnas.push(col)
            }
        })
        new_arrayColumnas.unshift({Header: '', accessor: 'actions', width: 120, filterable: false})


        setColumns(new_arrayColumnas)
    }

    const vin_info = ({data, tipo}) =>{
        if(!tipo){
            setdataVin(data)
            setshowVinInfo(true)
        }
    }

    const change_position = ({data, tipo}) =>{
        
        if(!tipo){
            setdataVin(data)
            setshowChangePosition(true)
        }
    }

    return (
        <>
            {showVinInfoRef.current &&
                <Vininfo closeButton={setshowVinInfo} idVin={dataVinRef.current.id} />
            }
            {showChangePositionRef.current &&
                <Changeposition montarTabla={montarTabla} closeButton={setshowChangePosition} idVin={dataVinRef.current} />
            }
            <Layout>
                <div className="py-4 px-4">
                    <Table copy={true} createLoad={true} montarTabla={montarTabla} configColumns={'stock'} data={dataRef.current} columns={columnsRef.current} calendar={true} download={true} orderColumns={true} calendar_column={'dt_onterminal'} download_title={'stock'} />
                </div>
            </Layout>
        </>
    );
}

export default stock;