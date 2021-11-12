import React, { useEffect } from 'react';
import { topRules } from '../../functions/datafunctions'
import useState from 'react-usestateref'

const topRules_ = () => {

    var [data, setData, dataRef] = useState([])
    var [arrived, setArrived, arrivedRef] = useState(false)


    useEffect(() => {
        topRules().then(res=>{
            setArrived(true)
            if(res.error === false){
                let array = []
                if(res.data.top != undefined){
                    res.data.top.forEach(key =>{
                        array.push([key.name,key.vins])
                    })
                }
                setData(array)
            }
        })
    },[])


    return (
        <div className="w-full mr-2">
            <div className="bg-transparent border-2 border-gray-200 w-full rounded-2xl">
                {(dataRef.current.length === 0 && arrivedRef.current === false) &&
                    <div className="w-full relative p-3">
                        <div className="animate-pulse h-6 w-2/3 bg-gray-200 "></div>
                        <div className="animate-pulse h-4 w-1/2 bg-gray-200 mt-2 "></div>
                        <div className="animate-pulse h-4 w-1/2 bg-gray-200 mt-2 "></div>
                        <div className="animate-pulse h-4 w-1/2 bg-gray-200 mt-2 "></div>
                        <div className="animate-pulse h-4 w-1/2 bg-gray-200 mt-2 "></div>
                        <div className="animate-pulse h-4 w-1/2 bg-gray-200 mt-2 "></div>
                    </div>
                }
                {(dataRef.current.length === 0 && arrivedRef.current === true) &&
                    <div className="w-full relative p-5 font-bold">
                        There is no data to show
                    </div>
                }
                {dataRef.current.length > 0 &&
                    <>
                        <div className="w-full flex p-2">
                            <div className="w-11/12 ml-2">
                                <span className="font-medium">TOP RULES  <span className="bg-blue-300 text-blue-500 rounded-full pt-0.5 pb-0.5 pl-3 pr-3 text-sm">TODAY</span></span>
                            </div>
                            {/* <div className="justify-end flex w-1/12 mr-2">
                                <svg className="w-6 h-6 text-gray-700 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                            </div> */}
                        </div>


                        <div className="w-full relative">
                            {dataRef.current.map((rule,i)=>{
                                return(
                                    <div key={i} className="flex w-full pl-4 pt-2 pb-2 ">
                                        <div className="numeracion w-1/12">
                                            <span className="font-medium">{i+1}</span>
                                        </div>
                                        <div className="ml-3 w-6/12">
                                            <span>{rule[0]}</span>
                                        </div>
                                        <div className="">
                                            <span className="bg-gray-200 text-gray-500 font-medium rounded-full px-3">{rule[1]}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </>
                }
            </div>
        </div>
    );
}

export default topRules_;