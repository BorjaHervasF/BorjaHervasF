import React, { useEffect } from 'react';
import Router from 'next/router';
import {useRouter} from 'next/router';
import {createInsertArray, InsertArrayEditor, updateWithArrayEditor} from '../functions/datafunctions'
import useState from 'react-usestateref'
import Select from 'react-select'
import $ from 'jquery'

const inputs = (props) => {

    const router = useRouter() 

    var [data, setData, dataRef] = useState([])

    var [error, seterror, errorRef] = useState('')
    var [successtext, setsuccesstext, successtextRef] = useState('')

    useEffect(() => {
        iniciar()
    },[router.query])

    const iniciar = () =>{
        console.log("desde inputs", router.query)
        createInsertArray(router.query.database).then(res=>{
            console.log(res)
            let array = []
            res.data.fillable.forEach(elm=>{
                if(elm.includes('dt') || elm.includes('_at')){
                    array.push({name: elm, type: 'dt'})
                }else{
                    array.push({name: elm, type: 'text'})
                }
            })
            console.log(res.data.fillable_relashionship)
            if(typeof res.data.fillable_relashionship === 'object' && res.data.fillable_relashionship != null && res.data.fillable_relashionship != undefined){
                Object.entries(res.data.fillable_relashionship).forEach(obj=>{
                    array.forEach(elm=>{
                        if(elm.name === obj[0]){
                            elm.type = 'select'
                            elm.options = obj[1]
                        }
                    })
                })
            }
            console.log(array)
            if(props.type == 'edit'){
                montar_edit(props.dato, array)
            }else{
                setData(array)
            }

        })
    }

    const montar_edit = (e, array) =>{
        console.log(e)
        let new_array = array
        new_array.forEach(elm=>{
            if(elm.type == 'text'){
                elm.result = e[elm.name]
                $('#input_'+elm.name).val(e[elm.name])
            }

            if(elm.type == 'select'){
                elm.options.forEach(opt=>{
                    if(elm.name.includes('_')){
                        if(opt.label == e[elm.name.split('_')[0]]){
                            elm.result = opt
                        }
                    }
                })
            }
        })
        setData(new_array)
    }

    const crear = () =>{
        console.log(dataRef.current)

        let objeto = {}
        
        dataRef.current.forEach(elm=>{
            if(elm.result == undefined){
                objeto[elm['name']] = null
            }else{
                if(elm.type == 'select'){
                    objeto[elm['name']] = elm['result'].value
                }else{
                    objeto[elm['name']] = elm['result']
                }
            }
        })

        let json = {
            name: router.query.database,
            object: objeto
        }

        console.log(json)

        InsertArrayEditor(json).then(res=>{
            console.log(res)
            if(res.error === true || String(res).includes('Error')){
                seterror(res.message)
            }else{
                setsuccesstext(res.message)
            }

            props.actualizar()
            setTimeout(() => {
                props.close(false)
            }, 2000);
        })
    }


    const editar = () =>{

        let objeto = {}

        dataRef.current.forEach(elm=>{
            if(elm.result == undefined){
                objeto[elm['name']] = null
            }else{
                objeto[elm['name']] = elm['result']
            }
        })

        let json = {
            name: router.query.database,
            id: props.dato.id,
            object: objeto
        }
        console.log("json")
        console.log(json)

        updateWithArrayEditor(json).then(res=>{
            if(res.error === true){
                seterror(res.message)
            }else{
                setsuccesstext(res.message)
                props.actualizar()
                setTimeout(() => {
                    props.close(false)
                }, 2000);
            }
        })


    }



    return (
        <div className="">
            {dataRef.current.length > 0 &&
                dataRef.current.map((elm,i)=>{
                    return(
                        <div className={"w-full block " + (i != 0 ? 'mt-3' : '')}>
                            <div className="text-md font-medium">
                                {elm.name}
                            </div>
                            <div className="w-full">

                                {elm.type == 'select' &&
                                    <Select
                                        id={'input_'+elm.name}
                                        onChange={(e)=>{
                                            let array = dataRef.current
                                            array.forEach(dat=>{
                                                if(dat.name === elm.name){
                                                    dat.result = e
                                                }
                                            })
                                            setData(array)
                                        }}
                                        placeholder={elm.result ? elm.result.label : 'Select an option'}
                                        options={elm.options}
                                    />
                                }

                                {elm.type == 'text' &&
                                    <input defaultValue={elm.result} onChange={(e)=>{
                                        let array = dataRef.current
                                        array.forEach(dat=>{
                                            if(dat.name === elm.name){
                                                dat.result = e.target.value
                                            }
                                        })
                                        setData(array)
                                    }} id={'input_'+elm.name} type="text" className="w-full mt-1 py-1.5 px-3 text-md border-2 rounded focus:outline-none focus:border-blue-500" placeholder={elm.name} />
                                }

                                {elm.type == 'dt' &&
                                    <input onChange={(e)=>{
                                        let array = dataRef.current
                                        array.forEach(dat=>{
                                            if(dat.name === elm.name){
                                                dat.result = e.target.value
                                            }
                                        })
                                        setData(array)
                                    }} id={'input_'+elm.name} type="datetime-local" className="w-full mt-1 py-1 px-2 border-2 rounded focus:outline-none focus:border-blue-500" />
                                }
                            </div>
                        </div>
                    )
                })
            }
            <div className="w-full justify-center mt-4 flex items-center">
                {props.type == 'create' &&
                    <button className="border-2 border-green-500 text-lg text-green-500 rounded hover:bg-green-500 duration-300 transition-all hover:text-white font-medium py-1.5 px-5" onClick={()=>crear()}>
                        Create
                    </button>
                }

                {props.type == 'edit' &&
                    <button className="border-2 border-blue-500 text-lg text-blue-500 rounded hover:bg-blue-500 duration-300 transition-all hover:text-white font-medium py-1.5 px-5" onClick={()=>editar()}>
                        Edit
                    </button>
                }
            </div>

            <div className="w-full justify-center mt-2 flex items-center">
                {errorRef.current &&
                    <span className="text-red-500">{errorRef.current}</span>
                }
                {successtextRef.current &&
                    <span className="text-green-500">{successtextRef.current}</span>
                }
            </div>
        </div>
    );
}

export default inputs;