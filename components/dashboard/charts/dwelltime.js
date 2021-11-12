import React, { useEffect } from 'react';
import {Pie} from 'react-chartjs-2';
import { dwellTimeGraphic } from '../../functions/datafunctions'
import useState from 'react-usestateref'


const dwelltime = () => {


    var [data, setData, dataRef] = useState([])
    
    
    useEffect(() => {
        dwellTimeGraphic().then(res=>{
            if(res.error === false){

                let arrayData = []
                if('0' in res.data){
                    arrayData.push(res.data['0'].length)
                }else{
                    arrayData.push(0)
                }
                if('1' in res.data){
                    arrayData.push(res.data['1'].length)
                }else{
                    arrayData.push(0)
                }
                if('2' in res.data){
                    arrayData.push(res.data['2'].length)
                }else{
                    arrayData.push(0)
                }
                if('+3' in res.data){
                    arrayData.push(res.data['+3'].length)
                }else{
                    arrayData.push(0)
                }



                const dataPie = {
                    labels: ['<24h', '24h-48h', '48h-72h', '>72h'],
                    datasets: [
                        {
                            label: 'Capacidad',
                            data: arrayData,
                            backgroundColor: [
                            'rgba(147, 197, 253, 1)',
                            'rgba(96, 165, 250, 1)',
                            'rgba(59, 130, 246, 1)',
                            'rgba(37, 99, 235, 1)',
                            ],
                        },
                    ],
                }

                setData(dataPie)




            }
        })
    }, [])

    return (
        <div className="w-full flex justify-center mt-5">
            <div className="bg-purple-100 w-full rounded-3xl pb-3">
                <div className="mb-4 w-full flex justify-center">
                    <span className="text-2xl font-bold mt-2">DWELL TIME</span>
                </div>  
                {dataRef.current.length === 0 &&
                    <div className="w-full p-4">
                        <div className=" flex space-x-10 ">
                            <div className="bg-gray-400 animate-pulse w-1/4 h-4"></div>
                            <div className="bg-gray-400 animate-pulse w-1/4 h-4"></div>
                            <div className="bg-gray-400 animate-pulse w-1/4 h-4"></div>
                            <div className="bg-gray-400 animate-pulse w-1/4 h-4"></div>
                        </div>

                        <div className="w-full justify-center pt-12 flex items-center relative">
                            <div className="w-40 h-40 absolute mt-28 rounded-full bg-gray-400 animate-pulse ">

                            </div>
                        </div>

                    </div>
                }
                {dataRef.current &&
                    <Pie data={dataRef.current} />
                }
            </div>
        </div>
    );
}

export default dwelltime;