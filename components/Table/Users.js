import React, { useEffect } from 'react';
import ReactTooltip from "react-tooltip";
import {getUsersStates} from '../functions/datafunctions'
import useState from 'react-usestateref'

const Users = () => {

    var [data, setData, dataRef] = useState('')

    useEffect(() => {
        getUsersStates().then(res=>{
            if('data' in res){
                if('info' in res.data){
                    setData(res.data)
                }
            }
        })
    }, [])


    return (
        <div className="space-x-2 mr-2 flex">
            <svg data-tip data-for='users-online' class="w-6 h-6 text-green-500 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            {dataRef.current &&
                <>
                    <ReactTooltip backgroundColor="#06d6a0" id='users-online' effect='solid' place='bottom' aria-haspopup='true' role='example'>
                        {dataRef.current.info.handheld.online} Users Online
                    </ReactTooltip>
                    <svg data-tip data-for='users-offline' class="w-6 h-6 text-red-500 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    <ReactTooltip backgroundColor="#e63946" id='users-offline' effect='solid' place='bottom' aria-haspopup='true' role='example'>
                        {dataRef.current.info.handheld.offline} Users Offline
                    </ReactTooltip>
                    <svg data-tip data-for='users-total' class="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                    <ReactTooltip backgroundColor="#000" id='users-total' effect='solid' place='bottom' aria-haspopup='true' role='example'>
                        {dataRef.current.info.handheld.total} Users
                    </ReactTooltip>
                </>
            }
        </div>
    );
}

export default Users;