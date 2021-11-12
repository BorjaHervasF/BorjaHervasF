import React, { useEffect } from 'react';
import {Line} from 'react-chartjs-2';
import { movementsGraphic } from '../../functions/datafunctions'
import useState from 'react-usestateref'


const optionsLine = {
    responsive: true,
    legend:{
        display: true
    },
    scales: {
        yAxes: [
            {
                gridLines: {
                    drawBorder: false,
                    color: "rgba(253,93,147,0.0)",
                    zeroLineColor: "transparent"
                },
                ticks: {
                    min: 0,
                    suggestedMin: 0,
                    suggestedMax: 6,
                    padding: 20,
                    fontColor: "#9e9e9e"
                }
            }
        ],
        xAxes: [
            {
                gridLines: {
                    drawBorder: true,
                    color: "rgba(253,93,147,0.0)",
                    zeroLineColor: "transparent"
                },
                ticks: {
                    padding: 20,
                    fontColor: "#9e9e9e"
                }
            }
        ]
    }
}

const totalMovements = () => {

    var [data, setData, dataRef] = useState('')


    useEffect(() => {
        movementsGraphic().then(res=>{
            if(res.error === false){
                
                let fechasInicio = []
                let fechasFin = []
                
                res.days.forEach((day, i)=>{
                    if(i < 7){
                        fechasInicio.push(day)
                    }else{
                        fechasFin.push(day)
                    }
                })

                let datosInicio = []
                let datosFinal = []

                fechasInicio.forEach((dato)=>{
                    if(dato in res.data.thisWeek){
                        datosInicio.push(res.data.thisWeek[dato].length)
                    }else{
                        datosInicio.push(0)
                    }
                })

                fechasFin.forEach((dato)=>{
                    if(dato in res.data.moreThanWeek){
                        datosFinal.push(res.data.moreThanWeek[dato].length)
                    }else{
                        datosFinal.push(0)
                    }
                })
                
                
                
                const dataLine = {
                    labels: fechasInicio.reverse(),
                    datasets: [
                        {
                            label: 'This week',
                            data: datosInicio.reverse(),
                            fill: false,
                            backgroundColor: 'rgb(54, 162, 235)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                        },
                        {
                            label: 'Last Week',
                            data: datosFinal.reverse(),
                            fill: false,
                            backgroundColor: 'rgb(107, 114, 128)',
                            borderColor: 'rgba(107, 114, 128, 0.2)',
                        },
                    ],
                }

                setData(dataLine)


            }
        })
    }, [])

    return (
        <div className="w-full mt-5 pr-6">
            <div className="bg-transparent border-2 border-gray-200 w-full rounded-2xl p-4">
                <div className="mb-4 w-full flex justify-start">
                    <div className="w-1/2">
                        <span className="text-2xl font-bold ml-4">Movements</span>
                    </div>
                </div>

                {!dataRef.current &&
                    <div className="mt-4 p-2">
                        <div className="w-full flex space-x-10 h-40 overflow-auto">
                            <div className="relative"><div className="bottom-0 h-36 absolute w-8 bg-gray-200 animate-pulse "></div></div>
                            <div className="relative"><div className="bottom-0 absolute h-40 w-8 bg-gray-200 animate-pulse "></div></div>
                            <div className="relative"><div className="bottom-0 absolute h-10 w-8 bg-gray-200 animate-pulse "></div></div>
                            <div className="relative"><div className="bottom-0 absolute h-8 w-8 bg-gray-200 animate-pulse "></div></div>
                            <div className="relative"><div className="bottom-0 absolute h-24 w-8 bg-gray-200 animate-pulse "></div></div>
                            <div className="relative"><div className="bottom-0 absolute h-32 w-8 bg-gray-200 animate-pulse "></div></div>
                            <div className="relative"><div className="bottom-0 absolute h-40 w-8 bg-gray-200 animate-pulse "></div></div>
                            <div className="relative"><div className="bottom-0 absolute h-36 w-8 bg-gray-200 animate-pulse "></div></div>
                            <div className="relative"><div className="bottom-0 absolute h-24 w-8 bg-gray-200 animate-pulse "></div></div>
                            <div className="relative"><div className="bottom-0 absolute h-12 w-8 bg-gray-200 animate-pulse "></div></div>
                            <div className="relative"><div className="bottom-0 absolute h-40 w-8 bg-gray-200 animate-pulse "></div></div>
                            <div className="relative"><div className="bottom-0 absolute h-2 w-8 bg-gray-200 animate-pulse "></div></div>
                            <div className="relative"><div className="bottom-0 absolute h-12 w-8 bg-gray-200 animate-pulse "></div></div>
                            <div className="relative"><div className="bottom-0 absolute h-24 w-8 bg-gray-200 animate-pulse "></div></div>
                            <div className="relative"><div className="bottom-0 absolute h-40 w-8 bg-gray-200 animate-pulse "></div></div>
                            <div className="relative"><div className="bottom-0 absolute h-24 w-8 bg-gray-200 animate-pulse "></div></div>
                            <div className="relative"><div className="bottom-0 absolute h-10 w-8 bg-gray-200 animate-pulse "></div></div>
                            <div className="relative"><div className="bottom-0 absolute h-2 w-8 bg-gray-200 animate-pulse "></div></div>
                            <div className="relative"><div className="bottom-0 absolute h-24 w-8 bg-gray-200 animate-pulse "></div></div>
                        </div>
                        <div className="w-full flex space-x-10 mt-3">
                            <div className="animate-pulse bg-gray-200 h-6 w-1/6 "></div>
                            <div className="animate-pulse bg-gray-200 h-6 w-1/6 "></div>
                            <div className="animate-pulse bg-gray-200 h-6 w-1/6 "></div>
                            <div className="animate-pulse bg-gray-200 h-6 w-1/6 "></div>
                            <div className="animate-pulse bg-gray-200 h-6 w-1/6 "></div>
                            <div className="animate-pulse bg-gray-200 h-6 w-1/6 "></div>
                            <div className="animate-pulse bg-gray-200 h-6 w-1/6 "></div>
                            <div className="animate-pulse bg-gray-200 h-6 w-1/6 "></div>
                            <div className="animate-pulse bg-gray-200 h-6 w-1/6 "></div>
                        </div>

                    </div>
                }

                {dataRef.current &&
                    <div className="mt-4">
                            <Line data={dataRef.current} options={optionsLine} height={65} />
                    </div>
                }
            </div>
        </div>
    );
}

export default totalMovements;