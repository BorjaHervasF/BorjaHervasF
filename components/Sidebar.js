import React, { useEffect } from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {getUsersStates} from './functions/datafunctions'
import Notifications from './notifications'
import useState from 'react-usestateref'
import $ from 'jquery'
import Getpin from './getPin'
import {columns} from '../components/editor/columns'

const Sidebar = () => {

    var [users, setUsers, usersRef] = useState('')
    var [localE, setlocalE, localERef] = useState(false)

    var [showpin, setshowpin, showpinRef] = useState(false)

    var [countnotifications, setcountnotifications, countnotificationsRef] = useState(0)
    var [shownot, setshownot, shownotRef] = useState(false)

    const router = useRouter()

    useEffect(()=>{
        getUsersStates().then(res=>{
            if('data' in res){
                if('info' in res.data){
                    setUsers(res.data)
                }
            }
        })

    }, [])

    // VERIFICAR QUE EXISTA EL LOCALSTORAGE PARA AÑADIRLO AL NOMBRE
    useEffect(()=>{
        console.log(router)
        if(localStorage){
            setlocalE(true)
        }
    },[])


    //USAR POR VOZ
    // useEffect(()=>{
    //     window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    //     const recognition = new SpeechRecognition();
    //     recognition.interimResults = true;

    //     recognition.addEventListener("result", (e) => {
    //         const text = Array.from(e.results)
    //           .map((result) => result[0])
    //           .map((result) => result.transcript)
    //           .join("");
          
    //         if (e.results[0].isFinal) {
    //           console.log(text)
    //         }
    //     });

    //     recognition.addEventListener("end", () => {
    //         recognition.start();
    //     });
          
    //     recognition.start();


    // }, [])

    return (
        <>  
            <Getpin showpin={showpinRef.current} toggleshow={setshowpin} />
            <div className="min-w-full w-full h-full flex justify-center">
                <div id="sidebar" className="flex w-full max-w-xs h-full p-4 rounded-lg overflow-x-auto">
                    <ul className="flex flex-col w-full">
                        <div className="min-w-full flex justify-center items-center mt-8">
                            <img src="/img/logo.png" className="w-52 h-auto mb-6" />
                        </div>
                        <Link href="/dashboard">
                            <li className="my-px">
                                <a href="#"
                                className={"flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100 " + (router.pathname.split('/')[router.pathname.split('/').length -1] === 'dashboard' ? 'bg-gray-100' : '')}>
                                    <span className="flex items-center justify-center text-lg text-gray-400">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
                                    </span>
                                    <span className="ml-3">Dashboard</span>
                                    {/* <span className="flex items-center justify-center text-sm text-blue-500 font-semibold bg-blue-200 h-6 px-2 rounded-full ml-2">3</span> */}
                                </a>
                            </li>
                        </Link>
                        <li className="my-px">
                            <span className="flex font-medium text-sm text-gray-400 px-4 my-4 uppercase">REPORTING</span>
                        </li>
                        <Link href="/reports/yard">
                            <li className="my-px">
                                <a href="#"
                                className={"flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100 "  +  (router.pathname.split('/')[router.pathname.split('/').length -1] === 'yardreport' ? 'bg-gray-100' : '')}>
                                    <span className="flex items-center justify-center text-lg text-gray-400">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                                    </span>
                                    <span className="ml-3">Load Info</span>
                                </a>
                            </li>
                        </Link>
                        <li className="my-px">
                            <span className="flex font-medium text-sm text-gray-400 px-4 my-4 uppercase">YARD</span>
                        </li>
                        <Link href="/yard/stock">
                            <li className="my-px">
                                <a href="#"
                                className={"flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100 "  +  (router.pathname.split('/')[router.pathname.split('/').length -1] === 'stock' ? 'bg-gray-100' : '')}>
                                    <span className="flex items-center justify-center text-lg text-gray-400">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                                    </span>
                                    <span className="ml-3">Stock</span>
                                </a>
                            </li>
                        </Link>
                        <Link href="/yard/search">
                            <li className="my-px">
                                <a href="#"
                                className={"flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100 " + (router.pathname.split('/')[router.pathname.split('/').length -1] === 'search' ? 'bg-gray-100' : '')}>
                                    <span className="flex items-center justify-center text-lg text-gray-400">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" /></svg>
                                    </span>
                                    <span className="ml-3">Search</span>
                                </a>
                            </li>
                        </Link>
                        <Link href="/yard/users">
                            <li className="my-px">
                                <a href="#"
                                className={"flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100 " + (router.pathname.split('/')[router.pathname.split('/').length -1] === 'users' ? 'bg-gray-100' : '') }>
                                    <span className="flex items-center justify-center text-lg text-gray-400">
                                        <svg fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            className="h-6 w-6">
                                            <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                        </svg>
                                    </span>
                                    <span className="ml-3">Users</span>
                                    {usersRef.current &&
                                        <span className="flex items-center justify-center text-sm text-green-600 font-semibold bg-green-200 h-6 px-2 rounded-full ml-2">{usersRef.current.info.handheld.online}</span>
                                    }
                                </a>
                            </li>
                        </Link>
                        <Link href="/yard/layout">
                            <li className="my-px">
                                <a href="#"
                                className={"flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100 " +  (router.pathname.split('/')[router.pathname.split('/').length -1] === 'layout' ? 'bg-gray-100' : '')}>
                                    <span className="flex items-center justify-center text-lg text-gray-400">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                                    </span>
                                    <span className="ml-3">Layout</span>
                                </a>
                            </li>
                        </Link>
                        <Link href="/loads">
                            <li className="my-px">
                                <a href="#"
                                className={"flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100 "  +  (router.pathname.split('/')[router.pathname.split('/').length -1] === 'loads' ? 'bg-gray-100' : '')}>
                                    <span className="flex items-center justify-center text-lg text-gray-400">
                                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
                                    </span>
                                    <span className="ml-3">Loads</span>
                                </a>
                            </li>
                        </Link>
                        <Link href="/yard/reworks">
                            <li className="my-px">
                                <a href="#"
                                className={"flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100 "  +  (router.pathname.split('/')[router.pathname.split('/').length -1] === 'reworks' ? 'bg-gray-100' : '')}>
                                    <span className="flex items-center justify-center text-lg text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-tools" viewBox="0 0 16 16">
  <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.356 3.356a1 1 0 0 0 1.414 0l1.586-1.586a1 1 0 0 0 0-1.414l-3.356-3.356a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3c0-.269-.035-.53-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814L1 0zm9.646 10.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708zM3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026L3 11z"/>
</svg>
                                    </span>
                                    <span className="ml-3">Inspection</span>
                                </a>
                            </li>
                        </Link>
                        {/* <li className="my-px">
                            <a href="#"
                            className={"flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100 "}>
                                <span className="flex items-center justify-center text-lg text-gray-400">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
                                </span>
                                <span className="ml-3">Quality</span>
                            </a>
                        </li> */}

                        
                        {/* <li className="my-px">
                            <a href="#"
                            className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100">
                                <span className="flex items-center justify-center text-lg text-green-400">
                                    <svg fill="none"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="h-6 w-6">
                                        <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </span>
                                <span className="ml-3">Add new</span>
                                </a>
                            </li> */}
                        <li className="my-px">
                            <span className="flex font-medium text-sm text-gray-400 px-4 my-4 uppercase">Admin</span>
                        </li>
                        <Link href="/admin/parking">
                            <li className="my-px">
                                <a href="#"
                                className={"flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100 "  +  (router.pathname.split('/')[router.pathname.split('/').length -1] === 'parking' ? 'bg-gray-100' : '')}>
                                    <span className="flex items-center justify-center text-lg text-gray-400 rounded-full border-2 border-dotted border-gray-300">
                                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                                    </span>
                                    <span className="ml-2">Parking</span>
                                </a>
                            </li>
                        </Link>
                        <Link href="/admin/map">
                            <li className="my-px">
                                <a href="#"
                                className={"flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100 " +(router.pathname.split('/')[router.pathname.split('/').length -1] === 'map' ? 'bg-gray-100' : '')}>
                                    <span className="flex items-center justify-center text-lg text-gray-400">
                                        <div>
                                            <svg className="w-4 h-4 z-10 transform translate-y-6 translate-x-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                                            <svg className="w-6 h-6 z-0 transform -translate-y-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                                        </div>
                                    </span>
                                    <span className="ml-3">Map</span>
                                </a>
                            </li>
                        </Link>
                        <Link href="/admin/rules">
                            <li className="my-px">
                                <a href="#"
                                className={"flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100 "  +  (router.pathname.split('/')[router.pathname.split('/').length -1] === 'rules' ? 'bg-gray-100' : '')}>
                                    <span className="flex items-center justify-center text-lg text-gray-400">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                                    </span>
                                    <span className="ml-3">Rules</span>
                                </a>
                            </li>
                        </Link>
                        <Link href="/admin/blocks">
                            <li className="my-px">
                                <a href="#"
                                className={"flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100 "  +  (router.pathname.split('/')[router.pathname.split('/').length -1] === 'blocks' ? 'bg-gray-100' : '') }>
                                    <span className="flex items-center justify-center text-lg text-gray-400">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                                    </span>
                                    <span className="ml-3">Blocks</span>
                                </a>
                            </li>
                        </Link>
                        <Link href="/admin/holds">
                            <li className="my-px">
                                <a href="#"
                                className={"flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100 "   +  (router.pathname.split('/')[router.pathname.split('/').length -1] === 'holds' ? 'bg-gray-100' : '')}>
                                    <span className="flex items-center justify-center text-lg text-gray-400">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                                    </span>
                                    <span className="ml-3">Holds</span>
                                </a>
                            </li>
                        </Link>

                        <li className="my-px">
                            <span className="flex font-medium text-sm text-gray-400 px-4 my-4 uppercase">Editor</span>
                        </li>
                        {columns.length > 0 &&
                            columns.map((column,i)=>{
                                return(
                                    <li className="my-px" onClick={()=>{
                                        router.push('/editor/'+column.column, undefined, { shallow: true })
                                    }}>
                                        <a href="#"
                                        className={"flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100 " + (router.asPath.split('/')[router.asPath.split('/').length -1] === column.column ? 'bg-gray-100' : '')}>
                                            <span className="flex items-center justify-center text-lg text-gray-400">
                                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>
                                            </span>
                                            <span className="ml-3">{column.name}</span>
                                        </a>
                                    </li>
                                )
                            })
                        }
                        <li className="my-px">
                            <span className="flex font-medium text-sm text-gray-400 px-4 my-4 uppercase">Account</span>
                        </li>
                        <li className="my-px relative" onClick={()=>{
                            setTimeout(() => {
                                setshownot(false)
                            }, 1000);
                            $("#notificaciones").slideToggle("slow")
                        }}>
                            <a href="#"
                            className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100">
                                <span className="flex items-center justify-center text-lg text-gray-400 relative">
                                    <svg fill="none"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="h-6 w-6">
                                        <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                                    </svg>
                                    {shownotRef.current &&
                                        <>
                                            <span class="animate-ping absolute right-0 top-0 inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
                                            <span class="absolute right-0 top-0 inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
                                        </>
                                    }
                                </span>
                                <span className="ml-3">Notifications</span>
                                {/* <span className="flex items-center justify-center text-sm text-red-500 font-semibold bg-red-200 h-6 px-2 rounded-full ml-2">{countnotificationsRef.current}</span> */}
                            </a>
                            <div id="notificaciones" className="hidden">
                                <Notifications limit={5} shownotis={setshownot} countNoti={setcountnotifications} />
                            </div>
                        </li>
                        <li onClick={()=>setshowpin(true)} className="my-px">
                            <a href="#"
                            className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100">
                                <span className="flex items-center justify-center text-lg text-gray-400">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg>
                                </span>
                                <span className="ml-3">Get PIN</span>
                            </a>
                        </li>
                        <li className="my-px">
                            <a href="#"
                            className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100">
                                <span className="flex items-center justify-center text-lg text-gray-400">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </span>
                                <span className="ml-3">{localERef.current ? localStorage.username : ''}</span>
                            </a>
                        </li>
                        <li className="my-px pb-4">
                            <Link href="/login">
                                <a href="#"
                                className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100">
                                    <span className="flex items-center justify-center text-lg text-red-400">
                                        <svg fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            className="h-6 w-6">
                                            <path d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
                                        </svg>
                                    </span>
                                    <span className="ml-3">Logout</span>
                                </a>
                            </Link>
                        </li>

                    </ul>
                </div>
            </div>
        </>
    );
}

export default Sidebar;