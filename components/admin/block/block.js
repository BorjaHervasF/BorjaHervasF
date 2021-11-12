import React, { useEffect } from 'react';
import {getBlocks, removeBlock, toggleBlock} from '../../functions/datafunctions'
import useState from 'react-usestateref'
import CreateBlock from '../../Table/CreateBlock'
import $ from 'jquery'

const block = () => {

    var [blocks,setBlocks, blocksRef] = useState([])
    var [blocksAux,setBlocksAux, blocksAuxRef] = useState([])

    var [Positions, setPositions, PositionsRef] = useState([])
    var [PositionsAux, setPositionsAux, PositionsAuxRef] = useState([])

    var [BlockSelect, setBlockSelect, BlockSelectRef] = useState('')

    const get_blocks = (type) =>{
        getBlocks().then(res=>{
            if(res.error === false){
                console.log(res.data)
                setBlocks(res.data)
                setBlocksAux(res.data)
                if(type){
                    res.data.forEach(elm=>{
                        if(elm.name === BlockSelectRef.current.name){
                            getChildBlock(elm)
                        }
                    })
                }
            }
        })
    }

    useEffect(() => {
        get_blocks()
    }, [])

    const getChildBlock = (block) =>{
        if(block.blockPositions.length > 0){
            setBlockSelect(block)
            setPositions(block.blockPositions)
            setPositionsAux(block.blockPositions)
        }
    }


    const search = (e) =>{
        if(e.trim() === ''){
            setBlocks(blocksAuxRef.current)
            setPositions(PositionsAuxRef.current)
            return;
        }

        let new_array = []
        if(PositionsRef.current.length === 0){
            blocksAuxRef.current.forEach((elem)=>{
                if(elem.name.toUpperCase().includes(e.toUpperCase())){
                    new_array.push(elem)
                }
            })
            setBlocks(new_array)
        }else{
            PositionsAuxRef.current.forEach((elem)=>{
                if(elem.name.toUpperCase().includes(e.toUpperCase())){
                    new_array.push(elem)
                }
            })
            setPositions(new_array)
        }

    }

    const toggleBlock_ = (block) =>{
        toggleBlock(block.id).then(res=>{
            get_blocks()
        })
    }



    return (
        <>  
            <div className="flex">
                <div className="w-1/2 flex">
                    {BlockSelectRef.current &&
                        <>
                            <span className="font-medium cursor-pointer vertical-middle" onClick={()=>{
                                setPositionsAux([])
                                setPositions([])
                                setBlockSelect('')
                            }}> {BlockSelectRef.current.name} </span>
                            <svg className="w-4 h-4 transform translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            <span className="vertical-middle">POSITIONS</span>
                        </>
                    }
                </div>
                <div className="mt-2 w-1/2 flex justify-end">
                    <div className="mr-2">
                        <CreateBlock montarBloques={get_blocks} idblock={BlockSelectRef.current ? BlockSelectRef.current.id : ''} />
                    </div>
                </div>
            </div>
            <div className="mt-2 w-full ">
                <input onChange={(e)=>search(e.target.value)} type="text" placeholder="Search block" className="w-full  mb-4 p-4 pr-2 border-2 text-lg focus:outline-none focus:border-blue-600 border-gray-200 rounded-lg" />
            </div>
            <div className="mt-2 grid grid-cols-6 gap-8">
                {PositionsRef.current.length === 0 &&
                blocksRef.current.map((block,i)=>{
                    return(
                        <div key={i} className="col-span-2 bg-gray-100 rounded p-4 text-lg ">
                            
                            <div className="w-full flex border-b-2 pb-2 border-gray-200 border-opacity-30 ">
                                <div className="w-1/2 truncate">
                                    <span className="truncate font-medium vertical-middle" >{block.name}</span>
                                </div>
                                <div className="w-1/2">
                                    <div className="w-full justify-end flex">
                                        <span className="text-gray-300 text-sm">Last update:</span>
                                    </div>
                                    <div className="w-full justify-end flex">
                                        <span className="text-black text-sm font-medium">{block.blockPositions.length > 0 ? block.blockPositions.updated_at === null ? 'There is no data yet' : (block.blockPositions[block.blockPositions.length - 1].updated_at) : 'There is no data yet'}</span>
                                    </div>
                                </div>
                            </div>


                            <div className="w-full mt-2 flex ">
                                <div className="w-1/2">
                                    <div class="relative inline-block w-10 mr-2 align-bottom vertical-middle select-none transition duration-200 ease-in">
                                        <input onClick={()=>{
                                            toggleBlock_(block)
                                        }} type="checkbox" name={"toggle_"+i} id={"toggle_"+i} className={"focus:outline-none toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-all duration-300 " +(block.active === 1 ? '-right-0.5' : '')}/>
                                        <label for={"toggle_"+i} className={"focus:outline-none  toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-all duration-300 " + (block.active === 1 ? 'bg-blue-500' : 'bg-gray-300')}></label>
                                    </div>
                                    <label for={"toggle_"+i} className="text-md vertical-middle text-gray-700">{block.active === 1 ? 'ACTIVE' : 'DISABLED'}</label>
                                </div>
                                <div className="w-1/2 flex justify-end">
                                    {/* <svg class="cursor-pointer hover:bg-red-300 mt-1 w-8 h-8 text-red-500 bg-red-200 p-2 rounded" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg> */}
                                    <div className="mr-4">
                                        <CreateBlock montarBloques={get_blocks} idblock={block.id} diseno={true} />
                                    </div>
                                    <svg onClick={()=>getChildBlock(block)} class="cursor-pointer hover:bg-blue-300 mt-1 w-8 h-8 text-blue-600 bg-blue-200 p-1 rounded" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg>
                                </div>
                            </div>

                        </div>
                    )
                })}

                {PositionsRef.current.length > 0 &&
                    PositionsRef.current.map((block,i)=>{
                        return(
                            <div key={i} className="col-span-1 bg-gray-100 rounded p-4 text-lg ">
                                <div className="w-full flex ">
                                    <div className="w-2/3 truncate">
                                        <span className="truncate font-medium vertical-middle" >{block.name}</span>
                                    </div>
                                    <div className="w-1/3 flex justify-end">
                                        <svg id={"svg_"+i} onClick={()=>{
                                            $('#secure_'+i).removeClass('hidden')
                                            $('#svg_'+i).addClass('hidden')

                                            setTimeout(() => {
                                                $('#secure_'+i).addClass('hidden')
                                                $('#svg_'+i).removeClass('hidden')
                                            }, 3500);
                                        }} class="cursor-pointer hover:bg-red-300 mt-1 w-8 h-8 text-red-500 bg-red-200 p-2 rounded" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                        <div onClick={()=>{
                                            removeBlock(block.id).then(res=>{
                                                console.log(res)
                                                get_blocks(true)
                                            })
                                        }}
                                         id={"secure_"+i} className="cursor-pointer hover:bg-red-300 text-sm font-medium mt-1 text-red-500 bg-red-200 pl-2 pr-2 rounded hidden">
                                            <span className="vertical-middle">Sure?</span>
                                        </div>
                                    </div>
                                </div>
                            </div>    
                        )
                    })
                }
            </div>
        </>
    );
}

export default block;