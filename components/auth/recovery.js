import React, { useEffect } from 'react'
import Router from 'next/router'
import {resetPassword} from '../functions/datafunctions'
import useState from 'react-usestateref'

const recovery = () => {

    var [recoveryKey, setRecoveryKey, recoveryKeyRef] = useState('');
    var [password, setPassword, passwordRef] = useState('');
    var [repeatPassword, setRepeatPassword, repeatPasswordRef] = useState('');
    var [errorMessage, setErrorMessage, errorMessageRef] = useState('');
    var [successMessage, setSuccessMessage, successMessageRef] = useState('');

    useEffect(()=>{
       
        if (sessionStorage.recoveryKey != null) {
            setRecoveryKey(sessionStorage.recoveryKey)
        }

    }, [])

    const recoveryAction = () => {

        if(password !== repeatPassword){
            setErrorMessage('Password does not match.')
        }else{

            if (recoveryKey == '' || recoveryKey == null) {
                setErrorMessage('Token is required.');
            }else{  

                let hasNumber = /\d/;
                let regex = /[A-Z]/;
                let symbolregex = /\W/
    
                if (password.length < 8) {
                    setErrorMessage('Minimun password length is 8.');
                }else if(!hasNumber.test(password)){
                    setErrorMessage('Password must have a number.');
                }else if(!regex.test(password)){
                    setErrorMessage('Password must have an uppercase.');
                }else if(!symbolregex.test(password)){
                    setErrorMessage('Password must have a symbol.');
                }else{
                    resetPassword(password, repeatPassword, recoveryKey).then((res => {
                        if (!res.error) {
                            setErrorMessage('');
                            setSuccessMessage('Password has been changed.');
                            sessionStorage.removeItem('recoveryKey');
                            setTimeout(() => {
                                Router.push('/login')
                            }, 3500);
                        }else{
                            setErrorMessage(res.message);
                        }
                    }))
                }

            }
        
        }

        setTimeout(() => {
            setErrorMessage('')
        }, 3500);

    }

    return (
        <>
        <div className="w-full h-screen flex">
            <div className="flex flex-col justify-center items-center w-full md:w-12/12 shadow-lg z-10">
                <img src="img/logo.png" className="w-64 h-auto" />
                <h1 class="my-3 mt-14 text-3xl font-semibold text-gray-700 dark:text-gray-200">Reset Password</h1>
                <div className="w-1/2 text-center mt-10">
                <input value={recoveryKey} onChange={(e)=>setRecoveryKey(e.target.value)} type="text" name="recoveryKey" placeholder="Recovery Key..." autoComplete="off"
                        className="w-full pl-3 pr-10 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-blue-500 transition-colors" />
                    {/* <input value={recoveryKey} onChange={(e)=>setUser(e.target.value)} type="text" name="username" placeholder="username" autoComplete="off"
                        className="w-full pl-3 pr-10 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-blue-500 transition-colors" /> */}
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" name="password" placeholder="New password..." autoComplete="off"
                        className="w-full pl-3 pr-10 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-blue-500 transition-colors mt-5" />
                    <input value={repeatPassword} onChange={(e)=>setRepeatPassword(e.target.value)} type="password" name="repeatPassword" placeholder="Repeat new password..." autoComplete="off"
                        className="w-full pl-3 pr-10 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-blue-500 transition-colors mt-5" />
                    {
                        errorMessage != '' &&
                        <div className="bg-red-400 rounded p-3 mt-3 text-white font-bold">{errorMessage}</div>
                    } 

                    {
                        successMessage != '' &&
                        <div className="bg-green-400 rounded p-3 mt-3 text-white font-bold">{successMessage}</div>
                    }    
                    <label className="text-xs text-right hover:text-semibold"><a className="hover:text-base" href="/login">Back to login</a></label><br/>
                    <button onClick={()=>recoveryAction()} className="border-2 border-gray-700 hover:bg-gray-700 hover:text-gray-100 mt-3 text-gray-700 text-center p-3 px-4 text-sm rounded cursor-pointer font-bold mt-10">Reset Password</button>
                    
                    <div className="mt-16 border rounded p-3">

                        <ul className="list-disc list-inside bg-stripes bg-stripes-white text-light-blue-600 py-2 rounded-md text-left ">

                            <li> Password must have minimun length of 8</li>
                            <li> Password must have an uppercase</li>
                            <li> Password must have a number</li>
                            <li> Password must have a symbol</li>
                        </ul>

                    </div>
                    
                </div>
            </div>
        </div>
        </>
    );
}

export default recovery;