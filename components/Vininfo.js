import React, { useEffect } from 'react';
import Blackback from './utilities/blackback'
import {VinInfo} from './functions/datafunctions'
import useState from 'react-usestateref'
import Table from './Table'
import $ from 'jquery'

const Vininfo = (props) => {

    var [data, setData, dataRef] = useState('')

    var [dataTable, setDataTable, dataTableRef] = useState([])
    var [columns, setcolumns, columnsRef] = useState([])
    

    useEffect(()=>{
        if(props.idVin){
            VinInfo(props.idVin).then(res=>{
                if('error' in res){
                    if(res.error === false){
                        console.log("vin info")
                        console.log(res)
                        setData(res.data)

                        if('svg' in res.data.vehicle){
                            if(res.data.vehicle.svg !== null){
                                let nuevo_svg = res.data.vehicle.svg.replace('.cls-2{}','.cls-2{fill:'+res.data.vehicle.hex+';}')
                                $('#car_svg').append(nuevo_svg)
                            }
                        }

                        if('movements' in res.data){
                            setDataTable(res.data.movements)
                            let jsonColumnas = [
                                { Header: 'VIN', accessor: 'vin'},
                                { Header: 'ORIGIN', accessor: 'origin'},
                                { Header: 'DESTINATION', accessor: 'destination'},
                                { Header: 'RULE', accessor: 'rule'},
                                { Header: 'USER', accessor: 'user'},
                                { Header: 'DT START', accessor: 'dt_start'},
                                { Header: 'DT END', accessor: 'dt_end'},
                            ]
                            setcolumns(jsonColumnas)
                        }
                    }
                }
            })
        }
    }, [props.idVin])


    return (
        <Blackback>
            <div className="w-1/3 bg-white rounded ml-4 mr-4 p-2">
                <div className="flex w-full">
                    <div className="w-2/3 p-2 font-bold text-xl">
                        {dataRef.current &&
                            <>
                                {dataRef.current.vehicle.vin}
                            </>
                        }
                    </div>
                    <div className="w-1/3 flex justify-end p-2">
                        <svg onClick={()=>{props.closeButton(false)}} class="w-6 h-6 text-red-500 transform translate-y-0.5 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                </div>

                <div className="w-full p-2 text-lg">
                    <div id="car_svg" className="p-5 mt-1 mb-1">

                    </div>
                    {dataRef.current &&
                        <>
                        <div className="mt-1">
                            <span className="font-medium">Position: </span> {dataRef.current.vehicle.position}
                        </div>
                        <div className="mt-1">
                            <span className="font-medium">Model: </span> {dataRef.current.vehicle.model}
                        </div>
                        <div className="mt-1">
                            <span className="font-medium">Color: </span> {dataRef.current.vehicle.color}
                        </div>
                        <div className="mt-1">
                            <span className="font-medium">Country: </span> {dataRef.current.vehicle.country}
                        </div>
                        <div className="mt-1">
                            <span className="font-medium">Shipping Rule: </span> {dataRef.current.vehicle.shipping_rule}
                        </div>
                        <div className="mt-1">
                            <span className="font-medium">State: </span> {dataRef.current.vehicle.state}
                        </div>
                        <div className="mt-1">
                            <span className="font-medium">DT Terminal: </span> {dataRef.current.vehicle.dt_onterminal}
                        </div>
                        <div className="mt-1">
                            <span className="font-medium">DT Left: </span> {dataRef.current.vehicle.dt_left}
                        </div>
                    </>
                    }
                </div>
            </div>

            <div className="w-2/3 ml-4 mr-4">
                <div className="w-full">
                    <span className="pr-4 pl-4 pb-2 pt-2 font-bold rounded-t bg-white mr-1">
                        Movimientos
                    </span>
                </div>
                <div className="w-full bg-white z-10 p-4">
                    <Table data={dataTableRef.current} columns={columnsRef.current} pagDefault={7} download={true} download_title={'movements'} />
                </div>
            </div>
        </Blackback>
    );
}

export default Vininfo;