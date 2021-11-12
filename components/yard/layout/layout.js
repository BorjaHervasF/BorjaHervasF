import React, { useState } from 'react'
import Grid from './grid'
import Map from './map'
import Table from './table'

const LayoutYard = () => {

    const [Tab, setTab] = useState('table')


    return (
        <>
            <div className="w-full justify-center flex mt-10">
                <div className="bg-gray-200 text-md text-gray-500 leading-none border-2 border-gray-200 rounded-full inline-flex">
                    <button onClick={()=>setTab('table')} className={"inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-gray-700 focus:text-gray-700 rounded-l-full px-4 py-2 " + (Tab === 'table' ? 'bg-white border-full text-gray-700' : '')} id="table">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                        <span className="ml-1">Table</span> 
                    </button>
                    <button onClick={()=>setTab('grid')} className={"inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-gray-700 focus:text-gray-700 px-4 py-2 " + (Tab === 'grid' ? 'bg-white text-gray-700' : '')} id="grid">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                        <span className="ml-1">Grid</span>
                    </button>
                    <button onClick={()=>setTab('map')} className={"inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-gray-700 focus:text-gray-700 rounded-r-full px-4 py-2 "  + (Tab === 'map' ? 'bg-white border-full text-gray-700' : '')} id="map">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                        <span className="ml-1">Map</span>
                    </button>
                </div>
            </div>

            <div className="w-full mt-10">
                <div className={Tab === 'table' ? " transition-all ease-in-out duration-300 " : ' hidden '}>
                    <Table></Table>
                </div>
                <div className={Tab === 'grid' ? " transition-all ease-in-out duration-300 " : ' hidden '}>
                    <Grid></Grid>
                </div>
                <div className={Tab === 'map' ? " transition-all ease-in-out duration-300 " : ' hidden '}>
                    <Map></Map>
                </div>
            </div>
        </>
    );
}

export default LayoutYard;