import React, { useEffect, useState } from 'react'
import Head from 'next/head';

import {Bar,Pie, Doughnut, Line} from 'react-chartjs-2';
import Table from './Table';
import Select from 'react-select'

const data = {
    labels: ['PU', 'PR', 'PB', 'PA', 'PC', 'PD', 'ZP', 'PM', 'P1A', 'P1B'],
    datasets: [
        {
            label: 'Capacidad',
            data: [34, 29, 31, 22, 17, 40,23,34,31,21],
            backgroundColor: [
            'rgba(96, 165, 250, 1)',
            'rgba(59, 130, 246, 1)',
            'rgba(37, 99, 235, 1)',
            'rgba(147, 197, 253, 1)',
            'rgba(29, 78, 216, 1)',
            'rgba(30, 64, 175, 1)',
            'rgba(37, 99, 235, 1)',
            'rgba(147, 197, 253, 1)',
            'rgba(29, 78, 216, 1)',
            'rgba(30, 64, 175, 1)',
            ],
        },
    ],
}

const dataPie = {
    labels: ['<24h', '24h-48h', '48h-72h', '>72h'],
    datasets: [
        {
            label: 'Capacidad',
            data: [34, 29, 31, 22],
            backgroundColor: [
            'rgba(96, 165, 250, 1)',
            'rgba(59, 130, 246, 1)',
            'rgba(37, 99, 235, 1)',
            'rgba(147, 197, 253, 1)',
            ],
        },
    ],
}



const dataDonut = {
    labels: ['USED', "FREE"],
    datasets: [
        {
            label: 'Capacidad',
            data: [34, 66],
            backgroundColor: [
            'rgba(96, 165, 250, 1)',
            'rgba(200, 200, 200, 1)'
            ],
        },
    ],
    text: '23%'
}



const data2 = {
    labels: ["Night","Morning","Afternoon"],
    datasets: [
        {
            label: 'Capacidad',
            data: [34, 22, 27],
            backgroundColor: [
            'rgba(30, 64, 175, 1)',
            'rgba(96, 165, 250, 1)',
            'rgba(59, 130, 246, 1)',
            ],
        },
        {
            label: 'Capacidad',
            data: [46,38,48],
            backgroundColor: [
            'rgba(30, 64, 175, 1)',
            'rgba(96, 165, 250, 1)',
            'rgba(59, 130, 246, 1)',
            ],
        },
    ],
}


const dataLine = {
    labels: ['17/03','18/03', '19/03', '20/03', '21/03', '22/03', '23/03'],
    datasets: [
      {
        label: 'Last Week',
        data: [289,345, 234, 187, 543, 378, 213],
        fill: false,
        backgroundColor: 'rgb(107, 114, 128)',
        borderColor: 'rgba(107, 114, 128, 0.2)',
      },
      {
        label: 'This week',
        data: [324, 290, 199, 230, 440, 298, 177],
        fill: false,
        backgroundColor: 'rgb(54, 162, 235)',
        borderColor: 'rgba(54, 162, 235, 1)',
      },
    ],
  }

const data3 = {
    labels: ['Antwerp', 'Liverpool', 'Soton', 'Swiss' ],
    datasets: [
        {
            label: 'Capacidad',
            data: [40, 33, 7, 20],
            backgroundColor: [
            'rgba(96, 165, 250, 1)',
            'rgba(59, 130, 246, 1)',
            'rgba(37, 99, 235, 1)',
            'rgba(37, 99, 235, 1)',
            ],
        },
    ],
}
  
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

const optionsDonut = {
    responsive: true,
    legend:{
        display: false
    }
}

const Charts = () => {

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

    const [blockunblock, setBlockunblock] = useState(false)
    return (
        <>
            <div class="container mx-auto my-6">

                <div className="w-full flex">
                    <div className="w-8/12">


                        <div className="w-full flex">
                            <div className="w-1/3 mr-2">
                                <div className="bg-transparent border-2 border-gray-200 w-full rounded-2xl">
                                    <div className="w-full flex p-2">
                                        <div className="w-11/12 ml-2">
                                            <span className="font-medium">TOP DESTINATIONS</span>
                                        </div>
                                        <div className="justify-end flex w-1/12 mr-2">
                                            <svg className="w-6 h-6 text-gray-700 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                                        </div>
                                    </div>

                                    <div className="w-full relative">
                                        <div className="flex w-full pl-4 pt-2 pb-2 ">
                                            <div className="numeracion w-1/12">
                                                <span className="font-medium">1</span>
                                            </div>
                                            <div className="ml-1 w-1/12">
                                                <img src="/img/flags/belgica.svg" className="w-6 h-6" />
                                            </div>
                                            <div className="ml-3 w-6/12">
                                                <span>ANTWERP</span>
                                            </div>
                                        </div>

                                        <div className="flex w-full pl-4 pt-2 pb-2 ">
                                            <div className="numeracion w-1/12">
                                                <span className="font-medium">2</span>
                                            </div>
                                            <div className="ml-1 w-1/12">
                                                <img src="/img/flags/estados-unidos.svg" className="w-6 h-6" />
                                            </div>
                                            <div className="ml-3">
                                                <span className="uppercase">Newark</span>
                                            </div>
                                        </div>

                                        <div className="flex w-full pl-4 pt-2 pb-2 ">
                                            <div className="numeracion w-1/12">
                                                <span className="font-medium">3</span>
                                            </div>
                                            <div className="ml-1 w-1/12">
                                                <img src="/img/flags/dinamarca.svg" className="w-6 h-6" />
                                            </div>
                                            <div className="ml-3">
                                                <span className="uppercase">Denmark</span>
                                            </div>
                                        </div>

                                        <div className="flex w-full pl-4 pt-2 pb-2 ">
                                            <div className="numeracion w-1/12">
                                                <span className="font-medium">4</span>
                                            </div>
                                            <div className="ml-1 w-1/12">
                                                <img src="/img/flags/reino-unido.svg" className="w-6 h-6" />
                                            </div>
                                            <div className="ml-3">
                                                <span className="uppercase">Soton</span>
                                            </div>
                                        </div>

                                        <div className="flex w-full pl-4 pt-2 pb-4 ">
                                            <div className="numeracion w-1/12">
                                                <span className="font-medium">5</span>
                                            </div>
                                            <div className="ml-1 w-1/12">
                                                <img src="/img/flags/egipto.svg" className="w-6 h-6" />
                                            </div>
                                            <div className="ml-3">
                                                <span className="uppercase">Egypt</span>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>


                            <div className="w-1/3 mr-2 ml-2">
                                <div className="bg-transparent border-2 border-gray-200 w-full rounded-2xl">
                                    <div className="w-full flex p-2">
                                        <div className="w-11/12 ml-2 flex">
                                            <span className="font-medium">TOP MOVEMENTS</span>

                                            <div className="flex">
                                                <span className="bg-blue-200 text-blue-500 font-medium rounded-full px-3 ml-2">
                                                    YARD
                                                </span>
                                                <svg className="w-4 h-4 transform translate-y-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                            </div>
                                        </div>
                                        <div className="justify-end flex w-1/12 mr-2">
                                            <svg className="w-6 h-6 text-gray-700 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                                        </div>
                                    </div>

                                    <div className="w-full relative">
                                        <div className="flex w-full pl-4 pt-2 pb-2 ">
                                            <div className="numeracion w-1/12">
                                                <span className="font-medium">1</span>
                                            </div>
                                            <div className="ml-1 w-4/12">
                                                <span className="uppercase">ZP</span>
                                            </div>
                                            <div className="">
                                                <span className="bg-gray-200 text-gray-500 font-medium rounded-full px-3">287</span>
                                            </div>
                                        </div>

                                        <div className="flex w-full pl-4 pt-2 pb-2 ">
                                            <div className="numeracion w-1/12">
                                                <span className="font-medium">2</span>
                                            </div>
                                            <div className="ml-1 w-4/12">
                                                <span className="uppercase">PU</span>
                                            </div>
                                            <div className="">
                                                <span className="bg-gray-200 text-gray-500 font-medium rounded-full px-3">263</span>
                                            </div>
                                        </div>

                                        <div className="flex w-full pl-4 pt-2 pb-2 ">
                                            <div className="numeracion w-1/12">
                                                <span className="font-medium">3</span>
                                            </div>
                                            <div className="ml-1 w-4/12">
                                                <span className="uppercase">P1A</span>
                                            </div>
                                            <div className="">
                                                <span className="bg-gray-200 text-gray-500 font-medium rounded-full px-3">233</span>
                                            </div>
                                        </div>

                                        <div className="flex w-full pl-4 pt-2 pb-2 ">
                                            <div className="numeracion w-1/12">
                                                <span className="font-medium">4</span>
                                            </div>
                                            <div className="ml-1 w-4/12">
                                                <span className="uppercase">P3</span>
                                            </div>
                                            <div className="">
                                                <span className="bg-gray-200 text-gray-500 font-medium rounded-full px-3">197</span>
                                            </div>
                                        </div>

                                        <div className="flex w-full pl-4 pt-2 pb-4 ">
                                            <div className="numeracion w-1/12">
                                                <span className="font-medium">5</span>
                                            </div>
                                            <div className="ml-1 w-4/12">
                                                <span className="uppercase">P.MOLINO</span>
                                            </div>
                                            <div className="">
                                                <span className="bg-gray-200 text-gray-500 font-medium rounded-full px-3">178</span>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>

                            <div className="w-1/3 mr-6 ml-2">
                                <div className="bg-transparent border-2 border-gray-200 w-full rounded-2xl">
                                    <div className="w-full flex p-2">
                                        <div className="w-11/12 ml-2 flex">
                                            <span className="font-medium">TRANSPORT</span>
                                        </div>
                                        <div className="justify-end flex w-1/12 mr-2">
                                            <svg className="w-6 h-6 text-gray-700 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                                        </div>
                                    </div>

                                    <div className="flex w-full pl-4 pt-2 pb-4 ">
                                        <Bar data={data2} options={options} height={185} />
                                    </div>
                                </div>
                            </div>


                        </div>


                        <div className="w-full mt-10 pr-6">
                            <div className="bg-transparent border-2 border-gray-200 w-full rounded-2xl p-4">
                                <div className="mb-4 w-full flex justify-start">
                                    <div className="w-1/2">
                                        <span className="text-2xl font-bold ml-4">Parkings</span>
                                    </div>
                                    {/* <div className="w-1/2 flex justify-end">
                                        <button onClick={()=>{
                                            if(blockunblock){
                                                setBlockunblock(false)
                                            }else{
                                                setBlockunblock(true)
                                            }
                                        }} className={"pl-2 pr-2 pt-1 pb-1 bg-blue-600 rounded text-white focus:outline-none transition-all duration-200 transform  " + (blockunblock ? 'bg-blue-700 translate-y-1 shadow-inner' : 'd3')}>
                                            Block / Unblock
                                        </button>
                                    </div> */}
                                </div>

                                <div className="mt-4">
                                    <Bar data={data} options={options} height={65} />
                                </div>
                            </div>
                        </div>

                        <div className="w-full mt-5 pr-6">
                            <div className="bg-transparent border-2 border-gray-200 w-full rounded-2xl p-4">
                                <div className="mb-4 w-full flex justify-start">
                                    <div className="w-1/2">
                                        <span className="text-2xl font-bold ml-4">Movements</span>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <Line data={dataLine} options={optionsLine} height={65} />
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className="w-4/12">

                        {/* GRAFICA TOTAL */}
                        <div className="w-full flex justify-center">
                            <div className="bg-transparent border-2 border-gray-200 w-full rounded-3xl flex justify-center items-center ">
                                <div className="relative w-full mt-5">
                                    <Doughnut redraw={true} data={dataDonut} options={optionsDonut} />
                                    <div className="relative w-full mt-5 flex justify-center mb-5">
                                        <div className="w-9/12 flex">
                                            <div className="w-1/2 relative text-center">
                                                <h3 className="text-xl font-medium">Total Space</h3>
                                                <p className="text-2xl font-bold">4893</p>
                                            </div>
                                            <div className="w-1/2 relative text-center">
                                                <h3 className="text-xl font-medium">Used Space</h3>
                                                <p className="text-2xl font-bold">1276</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>


                        <div className="w-full flex justify-center mt-10">
                            <div className="bg-yellow-100 w-full rounded-3xl">
                                <div className="mb-4 w-full flex justify-center">
                                    <span className="text-2xl font-bold mt-2">Last Notifications</span>
                                </div>  
                                <div className="mb-3 w-full justify-center flex">
                                    <span className="text-xl bg-yellow-200 rounded pt-1 pb-1 pl-2 pr-2">64 Line of <span className="font-medium">PU</span> is now filled</span>
                                </div> 
                                <div className="mb-3 w-full justify-center flex">
                                    <span className="text-xl bg-yellow-200 rounded pt-1 pb-1 pl-2 pr-2">Rule <span className="font-medium">"Swiss"</span> was created just now</span>
                                </div> 
                            </div>
                        </div>

                        <div className="w-full flex justify-center mt-5">
                            <div className="bg-purple-100 w-full rounded-3xl pb-3">
                                <div className="mb-4 w-full flex justify-center">
                                    <span className="text-2xl font-bold mt-2">DWELL TIME</span>
                                </div>  
                                <Pie data={dataPie} />
                            </div>
                        </div>




                    </div>
                </div>

                {/* <div className={"w-full p-4 bg-white shadow-sm rounded-lg " + (blockunblock ? 'cursor-crosshair' : '')}>
                    <div className="mb-4 w-full flex justify-start">
                        <div className="w-1/2">
                            <span className="text-2xl font-bold ml-4">Parkings</span>
                        </div>
                        <div className="w-1/2 flex justify-end">
                            <button onClick={()=>{
                                if(blockunblock){
                                    setBlockunblock(false)
                                }else{
                                    setBlockunblock(true)
                                }
                            }} className={"pl-2 pr-2 pt-1 pb-1 bg-blue-600 rounded text-white focus:outline-none transition-all duration-200 transform  " + (blockunblock ? 'bg-blue-700 translate-y-1 shadow-inner' : 'd3')}>
                                Block / Unblock
                            </button>
                        </div>
                    </div>

                    <div className="mt-4">
                        <Bar data={data} options={options} width={400} height={100} />
                    </div>
                </div> */}

                {/* <div className="flex mt-8">


                    <div className="w-2/4 mr-5">
                        <div className="w-full p-4 bg-white shadow-sm rounded-lg">
                            <div className="mb-4 w-full flex justify-start">
                                <div className="w-1/2">
                                    <span className="text-2xl font-bold ml-4">Movimientos</span>
                                </div>
                                <div className="w-1/2 flex justify-end">
                                    <svg className="w-6 h-6 transform translate-y-0.5 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                </div>
                            </div>

                            <div className="mt-4 w-full">
                                <Bar data={data2} options={options} width={600} height={200} />
                            </div>  
                        </div>
                    </div>

                    <div className="w-2/4 mr-5">
                        <div className="w-full p-4 bg-white shadow-sm rounded-lg">
                            <div className="mb-4 w-full flex justify-center">
                                <span className="text-2xl font-bold ml-4">Time Calculation</span>
                            </div>

                            <div className="mt-4 w-full justify-start flex">
                                <div className="w-1/3">
                                    <Select
                                        options={[
                                            { value: 'ZP', label: 'ZP' },
                                            { value: 'PU', label: 'PU' },
                                            { value: 'PR', label: 'PR' },
                                        ]}
                                    />
                                </div>
                                <div className="w-1/3 flex justify-center">
                                    <svg className="w-8 h-8 transform translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </div>
                                <div className="w-1/3">
                                    <Select
                                        options={[
                                            { value: 'ZP', label: 'ZP' },
                                            { value: 'PU', label: 'PU' },
                                            { value: 'PR', label: 'PR' },
                                        ]}
                                    />
                                </div>
                            </div>  
                        </div>

                        <div className="w-full mt-4 flex">

                            <div className="w-1/2 p-4 bg-yellow-100 shadow-sm rounded-lg mt-4 mr-2">
                                <div className="mb-4 w-full flex justify-center">
                                    <span className="text-2xl font-bold">Last Notifications</span>
                                </div>  
                                <div className="mb-4 w-full justify-center flex">
                                    <span className="text-xl bg-yellow-200 rounded pt-1 pb-1 pl-2 pr-2">64 Line of <span className="font-medium">PU</span> is now filled</span>
                                </div>  
                            </div>

                            <div className="w-1/2 p-4 bg-white shadow-sm rounded-lg mt-4 ml-2">
                                <div className="w-full flex justify-start">
                                    <div className="w-8/12">
                                        <span className="font-medium text-xl">Users</span>
                                    </div>
                                    <div className="w-4/12 flex justify-end">
                                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                                    </div>
                                </div>
                                <div className="w-full justify-center flex mt-4">
                                    <input type="text"  className="border-2 rounded pt-1 pb-1 border-gray-200 w-full pr-2 pl-2 focus:outline-none focus:border-blue-400" placeholder="Search"></input>
                                </div>
                            </div>


                        </div>

                    </div> */}
                    {/* <div className="w-1/4 mr-5">
                        <div className="w-full flex justify-center p-4 bg-white shadow-sm rounded-lg">
                            <Pie
                                data={dataPie}
                                width={110}
                                height={110}
                            />
                        </div>
                    </div>

                    <div className="w-1/4 ml-5">
                        <div className="w-full p-4 bg-white max-h-96 shadow-sm rounded-lg">
                            <div className="w-full text-center">
                                <span className="font-medium text-xl">Release Holds</span>
                            </div>
                            <div className="w-full justify-center flex mt-4">
                                <input type="text"  className="border-2 rounded pt-1 pb-1 border-gray-200 w-full pr-2 pl-2 focus:outline-none focus:border-blue-400" placeholder="Search"></input>
                            </div>

                            <div className="w-full justify-center flex mt-3">
                                <div className="pt-2 pb-2 bg-blue-100 hover:bg-blue-200 justify-center flex w-full rounded cursor-pointer">
                                    <div className="w-10/12 flex justify-center">
                                        <div className="w-2/12">
                                            <div className="rounded bg-white bg-opacity-70 flex justify-center w-6 h-6 items-center transform translate-y-0.5">
                                                <svg class="w-4 h-4 transform translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                                            </div>
                                        </div>
                                        <div className="w-10/12">
                                            <span className="text-lg">Hold 1</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full justify-center flex mt-2">
                                <div className="pt-2 pb-2 bg-blue-100 hover:bg-blue-200 justify-center flex w-full rounded cursor-pointer">
                                    <div className="w-10/12 flex justify-center">
                                        <div className="w-2/12">
                                            <div className="rounded bg-white bg-opacity-70 flex justify-center w-6 h-6 items-center transform translate-y-0.5">
                                                <svg class="w-4 h-4 transform translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                                            </div>
                                        </div>
                                        <div className="w-10/12">
                                            <span className="text-lg">Hold 2</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full justify-center flex mt-2">
                                <div className="pt-2 pb-2 bg-blue-100 hover:bg-blue-200 justify-center flex w-full rounded cursor-pointer">
                                    <div className="w-10/12 flex justify-center">
                                        <div className="w-2/12">
                                            <div className="rounded bg-white bg-opacity-70 flex justify-center w-6 h-6 items-center transform translate-y-0.5">
                                                <svg class="w-4 h-4 transform translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                                            </div>
                                        </div>
                                        <div className="w-10/12">
                                            <span className="text-lg">Hold 3</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            
                        </div>
                    </div> */}


                    {/* <div className="w-2/4 ml-5">
                        <div className="w-full p-4 bg-white max-h-96 shadow-sm rounded-lg">
                            <div className="w-full flex justify-start">
                                <div className="w-8/12">
                                    <span className="font-medium text-xl">Users</span>
                                </div>
                                <div className="w-4/12 flex justify-end">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                                </div>
                            </div>
                            <div className="w-full justify-center flex mt-4">
                                <input type="text"  className="border-2 rounded pt-1 pb-1 border-gray-200 w-full pr-2 pl-2 focus:outline-none focus:border-blue-400" placeholder="Search"></input>
                            </div>

                            <div className="w-full justify-center flex mt-3">
                                <div className="pt-2 pb-2 bg-purple-100 hover:bg-purple-200 justify-center flex w-full rounded cursor-pointer">
                                    <div className="w-10/12 flex justify-center">
                                        <div className="w-1/12">
                                            <div className="rounded bg-white bg-opacity-70 flex justify-center w-6 h-6 items-center transform translate-y-0.5">
                                                <svg class="w-4 h-4 transform translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                                            </div>
                                        </div>
                                        <div className="w-10/12">
                                            <span className="text-lg">User 1</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            
                        </div>
                    </div> */}

                    {/* <div className="w-3/4 ml-5">
                        <div className="w-full flex justify-center p-4 bg-white shadow-sm rounded-lg">
                            <Table />
                        </div>
                    </div> */}
                {/* </div> */}


                {/* <div className="flex mt-8">
                    <div className="w-1/2 p-4 bg-white shadow-sm rounded-lg mr-4">

                        <div className="mb-4 w-full flex justify-start">
                            <div className="w-1/2">
                                <span className="text-2xl font-bold ml-4">Category Distribution</span>
                            </div>
                        </div>

                        <div className="mt-4">
                        <Bar data={data3} options={options} width={400} height={100} />
                        </div>
                    </div>

                    <div className="w-1/2 p-4 bg-transparent ml-4 rounded-lg">
                        <div>

                        </div>
                    </div>
                </div> */}
            </div>
        </>
    );
}

export default Charts;