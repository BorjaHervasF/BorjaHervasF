import React, { useEffect } from 'react'
import Layout from '../../components/Layout'
import Table from '../../components/Table'
import {getRules, activarRule} from '../../components/functions/datafunctions'
import useState from 'react-usestateref'


const layout = () => {

    var [data, setData, dataRef] = useState([])
    var [columns, setColumns, columnsRef] = useState([])

    const MontarTable = () =>{
        getRules().then(res=>{
            console.log("rules", res)
            if(res.error === false){
                let columnas = [
                    { Header: 'NAME', accessor: 'name'},
                    { Header: 'OVERFLOW', accessor: 'overflow'},
                    { Header: 'ACTIVE', accessor: 'active'},
                    { Header: 'BLOCK NAME', accessor: 'blockName'},
                    { Header: 'COUNT', accessor: 'count'},
                ]
                res.data.forEach((element,i)=>{
                    let json = {
                        objeto: (
                            <>
                                <div class="relative inline-block w-10 mr-2 align-bottom select-none transition duration-200 ease-in">
                                    <input onClick={()=>{
                                        toggleRule(element)
                                    }} type="checkbox" name={"toggle_"+i} id={"toggle_"+i} className={"focus:outline-none toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-all duration-300 " +(element.active ? '-right-0.5' : '')}/>
                                    <label for={"toggle_"+i} className={"focus:outline-none toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-all duration-300 " + (element.active ? 'bg-blue-500' : 'bg-gray-300')}></label>
                                </div>
                                <label onClick={()=>{
                                        toggleRule(element)
                                }} for={"toggle_"+i} className="text-md text-gray-700">{element.active ? 'ENABLED' : 'DISABLED'}</label>
                            </>
                        )
                    }

                    element.active = json['objeto']
                })
                setData(res.data)
                setColumns(columnas)
            }
        })
    }

    useEffect(() => {
        MontarTable()
    },[])

    const toggleRule = (element) =>{
        activarRule(element.id).then(res=>{
            MontarTable()
        })
    }


    return (
        <Layout>
            <div className="py-4 px-4">
                <Table data={dataRef.current} load={true} columns={columnsRef.current} createRule={true} />
            </div>
        </Layout>
    );
}

export default layout;