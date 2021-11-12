import React, { useEffect } from 'react';
import useState from 'react-usestateref'
import io from 'socket.io-client'
import Backblack from '../components/utilities/blackback'

const notifications = (props) => {

    var [data, setData, dataRef] = useState([])

    var [showGlobal, setshowGlobal, showGlobalRef] = useState(false)

    useEffect(()=>{
        const api_socket = 'https://realtime.prometeus.dev';
        const token_socket = `${sessionStorage.Authorization}`;
        const compoundID = `${localStorage.compound_id}`;
        const Username = `${localStorage.username}`;
        const socket = io(api_socket, {
    
            query:{token:token_socket, room:"notifications", username:Username, compoundId:compoundID},
    
        });
    
        socket.on('notifications', (res) => {

            if(localStorage.notifications){
                let lcn = JSON.parse(localStorage.notifications)
                if(lcn.length !== res.length){
                    if(props.shownotis){
                        props.shownotis(true)
                    }
                    localStorage.setItem('notifications',JSON.stringify(res))
                }
            }else{
                if(props.shownotis){
                    props.shownotis(true)
                }
                localStorage.setItem('notifications',JSON.stringify(res))
            }
            if(props.countNoti){
                props.countNoti(res.length)
            }

            setData(res)
    
        })

        return () =>{
            socket.disconnect()
        }
    }, [])


    return (
        <>  
            {showGlobalRef.current &&
                <Backblack> 
                    <div className="w-1/3 bg-yellow-100 p-4 rounded-lg overflow-auto max-h-96 notis relative ">
                        <svg onClick={()=>setshowGlobal(false)} class="w-6 h-6 absolute top-5 right-5 text-yellow-600 cursor-pointer " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        <div className="w-full text-center mb-4">
                            <span className="text-2xl font-bold">NOTIFICATIONS</span>
                        </div>
                        {dataRef.current.map((noti,i)=>{
                            return(
                                <div key={i} className="text-center mt-1 bg-yellow-200 rounded py-1">
                                    {noti.action}
                                </div>
                            )
                        })}
                    </div>
                </Backblack>
            }
            <div className={"w-full bg-yellow-100 pt-2 pb-2 " + (props.rounded ? 'rounded-3xl mt-4 ' : 'rounded mt-1 ')}>
                {props.title &&
                    <div className="text-center">
                        <span className="font-bold text-xl"> LAST NOTIFICATIONS </span>
                    </div>
                }
                <div className={props.title ? "mt-2 p-2" : 'p-2'}>
                    {dataRef.current.map((noti,i)=>{
                        return(
                            <div key={i}>
                                {i < props.limit &&
                                    <div className="text-center mt-1 bg-yellow-200 rounded py-1">
                                        {noti.action}
                                    </div>
                                }
                            </div>
                        )
                    })}
                </div>
                <div className="w-full text-center">
                    <span onClick={()=>setshowGlobal(true)} className="font-medium underline cursor-pointer">see all</span>
                </div>
            </div>
        </>
    );
}

export default notifications;