import React, { useEffect } from 'react';
import useState from 'react-usestateref'
import {Doughnut} from 'react-chartjs-2';
import {graphicYardCapacity} from '../../functions/datafunctions'


const totalSpace = () => {

    
    
    const optionsDonut = {
        responsive: true,
        legend:{
            display: false
        }
    }

    var [data, setData, dataRef] = useState('')
    var [dataDonut, setDataDonut, dataDonutRef] = useState('')


    useEffect(() => {
        var originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
        Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
        draw: function() {
            originalDoughnutDraw.apply(this, arguments);
            
            var chart = this.chart.chart;
            var ctx = chart.ctx;
            var width = chart.width;
            var height = chart.height;

            var fontSize = (height / 114).toFixed(2);
            ctx.font = fontSize + "em Verdana";
            ctx.textBaseline = "middle";

            var text = chart.config.data.text,
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2;
            if(text !== undefined && text !== 'undefined'){
                ctx.fillText(text, textX, textY);
            }
        }
        });
    }, [])

    useEffect(() => {
        graphicYardCapacity().then(res=>{
            if(res.error === false){
                setData(res.data)

                let jsonDonut = {
                    labels: ['USED', "FREE"],
                    datasets: [
                        {
                            label: 'Capacidad',
                            data: [res.data.fill, (res.data.capacity-res.data.fill)],
                            backgroundColor: [
                            'rgba(37, 99, 235, 1)',
                            'rgba(200, 200, 200, 1)'
                            ],
                        },
                    ],
                    text: Number(res.data.percentaje).toFixed(1) + '%'
                }

                setDataDonut(jsonDonut)


            }
        })
    },[])

    return (
        <div className="w-full flex justify-center">
            <div className="bg-transparent border-2 border-gray-200 w-full rounded-3xl flex justify-center items-center ">
                {!dataRef.current &&
                    <div className="w-full relative p-4">
                        <div className="w-full flex justify-center items-center ">
                            <div className="w-52 h-52 animate-pulse bg-gray-200  rounded-full">

                            </div>
                        </div>
                        <div className="w-full flex justify-center space-x-8 mt-5">
                            <div className="w-1/3 h-10 animate-pulse bg-gray-200 "></div>
                            <div className="w-1/3 h-10 animate-pulse bg-gray-200 "></div>
                        </div>
                    </div>
                }
                {dataRef.current &&
                    <div className="relative w-full mt-5">
                        {dataDonutRef.current &&
                            <Doughnut redraw={true} data={dataDonutRef.current} options={optionsDonut} />
                        }
                        {dataRef.current &&
                            <div className="relative w-full mt-5 flex justify-center mb-5">
                                <div className="w-9/12 flex">
                                    <div className="w-1/2 relative text-center">
                                        <h3 className="text-xl font-medium">Total Space</h3>
                                        <p className="text-2xl font-bold">{dataRef.current.capacity}</p>
                                    </div>
                                    <div className="w-1/2 relative text-center">
                                        <h3 className="text-xl font-medium">Used Space</h3>
                                        <p className="text-2xl font-bold">{dataRef.current.fill}</p>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                }

            </div>
        </div>
    );
}

export default totalSpace;