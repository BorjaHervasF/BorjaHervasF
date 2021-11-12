import React, { useEffect } from 'react'
import Link from 'next/link';
import Router from 'next/router'
import {Login, getCompounds} from '../functions/datafunctions'
import useState from 'react-usestateref'
import Select from 'react-select'

const login = () => {

    const [User, setUser, UserRef] = useState('')
    const [Password, setPassword, PasswordRef] = useState('')

    const [Compound, setCompound, CompoundRef] = useState([])
    const [CompoundID, setCompoundID, CompoundIDRef] = useState('')
    const [afterLoginMessage, setAfterLoginMessage] = useState('');
    
    useEffect(()=>{
        getCompounds().then(res=>{
            if(!res.error){
                setCompound(res.data)
            }
        })

        window.addEventListener('keyup', (event) => {
            if (event.keyCode == 13) {
                login_app();
            }
          });
    }, [])

    const login_app = () =>{

        Login(UserRef.current, PasswordRef.current, CompoundIDRef.current.value).then(res=>{
            if(!res.error){
                sessionStorage.setItem('Authorization', res.token)
                localStorage.setItem('profile', JSON.stringify(res.profile))
                localStorage.setItem('username', UserRef.current)
                localStorage.setItem('compound_id', CompoundIDRef.current.value)
                sessionStorage.setItem('auth', res.auth_role.auth_level);
                console.log(res)
                setTimeout(() => {
                    Router.push("/yard/stock")
                }, 300);
            }else{
                if (res.code == "changePass") {
                    sessionStorage.setItem('recoveryKey', res.token);
                    setTimeout(() => {
                        Router.push("/recovery")
                    }, 300);
                }else{
                    setAfterLoginMessage(res.message);
                    setTimeout(() => {
                        setAfterLoginMessage('');
                    }, 3200)
                }
            }
        })
    }

    return (
        <>
        <div className="w-full h-screen flex">
            <img src="img/mapatopo.jpg" alt="background" className="absolute object-cover object-center h-screen w-full md:w-5/12 z-0 -right-0 opacity-10" />
            <img src="img/fondoparking.gif" alt="background" className="hidden md:inline object-cover object-center h-screen w-7/12 z-10 " />
            <div className="flex flex-col justify-center items-center w-full md:w-5/12 shadow-lg z-10">
                <img src="img/logo.png" className="w-64 h-auto" />
                <div className="w-1/2 text-center mt-10">
                    <Select
                    value={CompoundID}
                    onChange={(e)=>setCompoundID(e)}
                    placeholder="Select Compound"
                    className={"mb-8 " + (CompoundRef.current ? CompoundRef.current.length === 0 ? 'cursor-not-allowed' : '' : '')}
                    options={CompoundRef.current} />
                    <input value={User} onChange={(e)=>setUser(e.target.value)} type="text" name="username" placeholder="username" autoComplete="off"
                        className="w-full pl-3 pr-10 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-blue-500 transition-colors" />
                    <input value={Password} onChange={(e)=>setPassword(e.target.value)} type="password" name="password" placeholder="password" autoComplete="off"
                        className="w-full pl-3 pr-10 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-blue-500 transition-colors mt-5" />
                    <label className="text-xs text-right hover:text-semibold"><a className="hover:text-base" href="/sendRecovery">Forgot Password?</a></label><br/>

                    {
                        afterLoginMessage != '' &&
                        <div className="bg-red-400 rounded p-3 mt-3 -mb-3 text-white font-bold">{afterLoginMessage}</div>
                    }
                   
                    <button onClick={()=>login_app()} className="border-2 border-gray-700 hover:bg-gray-700 hover:text-gray-100 mt-3 text-gray-700 text-center p-3 px-4 text-sm rounded cursor-pointer font-bold mt-10">Sign In</button>
                </div>
            </div>
        </div>
        </>
    );
}

export default login;