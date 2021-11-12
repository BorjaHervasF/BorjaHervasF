import React, { useEffect } from 'react';
import {Bar} from 'react-chartjs-2';
import { getParkings } from '../../functions/datafunctions'
import useState from 'react-usestateref'



const options = {
    responsive: true,
    legend:{
        display: false
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

const totalparkings = () => {

    var [data, setData, dataRef] = useState('')

    useEffect(() => {
        getParkings().then(res=>{
            if(res.error === false){
                
                let arrayNombres = []
                let arrayCapacidades = []
                let arrayBackground = []

                res.data.forEach((elem)=>{
                    arrayNombres.push(elem.label)
                    arrayCapacidades.push(elem.data.fill)

                    let calculo = (elem.data.fill/elem.data.capacity)*100

                    if(calculo < 15){
                        arrayBackground.push('rgba(29, 78, 216, 1)')
                    }else if(calculo >= 15 && calculo < 30){
                        arrayBackground.push('rgba(37, 99, 235, 1)')
                    }else if(calculo >= 30 && calculo < 45){
                        arrayBackground.push('rgba(59, 130, 246, 1)')
                    }else if(calculo >= 45 && calculo < 65){
                        arrayBackground.push('rgba(96, 165, 250, 1)')
                    }else if(calculo >= 65 && calculo < 80){
                        arrayBackground.push('rgba(100, 175, 250, 1)')
                    }else if(calculo >= 80 && calculo < 95){
                        arrayBackground.push('rgba(120, 185, 250, 1)')
                    }else if(calculo >= 95){
                        arrayBackground.push('rgba(147, 197, 253, 1)')
                    }
                })

                const data_ = {
                    labels: arrayNombres,
                    datasets: [
                        {
                            label: 'Fill',
                            data: arrayCapacidades,
                            backgroundColor: arrayBackground,
                        },
                    ],
                }

                setData(data_)


            }
        })
    }, [])

    return (
        <div className="w-full mt-10 pr-6">
            <div className="bg-transparent border-2 border-gray-200 w-full rounded-2xl p-4">
                <div className="mb-4 w-full flex justify-start">
                    <div className="w-1/2">
                        <span className="text-2xl font-bold ml-2">Parkings</span>
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
                            <Bar data={dataRef.current} options={options} height={65} />
                    </div>
                }
            </div>
        </div>
    );
}

export default totalparkings;