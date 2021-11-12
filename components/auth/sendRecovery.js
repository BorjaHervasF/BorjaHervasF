import React, { useEffect } from 'react'
import Router from 'next/router'
import {sendRecoveryKey} from '../functions/datafunctions'
import useState from 'react-usestateref'

const sendRecovery = () => {

    var [email, setEmail, emailRef] = useState('');
    var [errorMessage, setErrorMessage, errorMessageRef] = useState('');
    var [successMessage, setSuccessMessage, successMessageRef] = useState('');

    const createRecoveryKey = () => {

        if (email == '') {
            setErrorMessage('Please, check the mail you have entered.');
        }else{
            sendRecoveryKey(email).then((res) => {
                if (res.error) {
                    setErrorMessage(res.message);
                }else{
                    setSuccessMessage("Message has sent. Please copy the Recovery Key. Redirecting...")
                    setTimeout(() => {
                        Router.push('/recovery')
                    }, 3500);
    
                }
            })
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
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" name="email" placeholder="Email..." autoComplete="off"
                        className="w-full pl-3 pr-10 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-blue-500 transition-colors" />
                    {
                        errorMessage != '' &&
                        <div className="bg-red-400 rounded p-3 mt-3  text-white font-bold">{errorMessage}</div>
                    } 

                    {
                        successMessage != '' &&
                        <div className="bg-green-400 rounded p-3 mt-3 text-white font-bold">{successMessage}</div>
                    }
                    <label className="text-xs text-right hover:text-semibold"><a className="hover:text-base" href="/login">Back to login</a></label><br/>

                    <button onClick={()=>createRecoveryKey()} className="border-2 border-gray-700 hover:bg-gray-700 hover:text-gray-100 mt-3 text-gray-700 text-center p-3 px-4 text-sm rounded cursor-pointer font-bold mt-10">Send Recovery Key</button>
                    
                </div>
            </div>
        </div>
        </>
    );
}

export default sendRecovery;