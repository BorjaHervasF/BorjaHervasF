import React, { useEffect } from 'react';
import { transportGraphic } from '../../functions/datafunctions'
import {Bar} from 'react-chartjs-2';
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

const transport = () => {

    var [data, setData, dataRef] = useState([])

    useEffect(() => {
        transportGraphic().then(res=>{
            console.log(res)
            if(res.error == false){
                

                const data_ = {
                    labels: ["Left","On Terminal"],
                    datasets: [
                        {
                            label: 'Vehicles',
                            data: [res.data.left, res.data.terminal],
                            backgroundColor: [
                            'rgba(30, 64, 175, 1)',
                            'rgba(96, 165, 250, 1)',
                            ],
                        },
                    ],
                }

                setData(data_)


            }
        })
    }, [])

    return (
        <div className="w-full">
            <div className="bg-transparent border-2 border-gray-200 w-full rounded-2xl">
                <div className="w-full flex p-2">
                    <div className="w-11/12 ml-2 flex">
                        <span className="font-medium">REALTIME TRANSPORT</span>
                    </div>
                </div>

                <div className="flex w-full pl-4 pt-2 pb-4 ">
                    <Bar data={dataRef.current} options={options} height={185} />
                </div>
            </div>
        </div>
    );
}

export default transport;