import React from 'react'

const Cards = () => {
    return (
        <div class="container mx-auto my-6">
            <div class="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">

                <div class="p-5 bg-transparent rounded-lg shadow-sm">
                    <div className="flex justify-between">
                        <div class="text-base text-gray-400 ">Movements</div>
                        <div>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                        </div>
                    </div>
                    <div class="flex items-center pt-1">
                        <div class="text-2xl font-bold text-gray-900 ">283</div>
                        <span class="flex items-center px-2 py-0.5 mt-1 mx-2 text-sm text-green-600 bg-green-100 rounded-full">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 15L12 9L6 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                            <span>1.8% since yesterday</span>
                            <div className="">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                            </div>
                        </span>
                    </div>
                </div>

                <div class="p-5 bg-transparent rounded-lg shadow-sm">
                    <div className="flex justify-between">
                        <div class="text-base text-gray-400 ">Holds</div>
                        <div>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                        </div>
                    </div>
                    <div class="flex items-center pt-1">
                        <div class="text-2xl font-bold text-gray-900 ">24</div>
                        <span class="flex items-center px-2 py-0.5 mt-1 mx-2 text-sm text-red-600 bg-red-100 rounded-full">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            <span className="ml-0.5">23% since yesterday</span>
                        </span>
                    </div>
                </div>

                <div class="p-5 bg-transparent rounded-lg shadow-sm">
                    <div className="flex justify-between">
                        <div class="text-base text-gray-400 ">Stock</div>
                        <div>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        </div>
                    </div>
                    <div class="flex items-center pt-1">
                        <div class="text-2xl font-bold text-gray-900 ">2963</div>
                    </div>
                </div>

                <div class="p-5 bg-transparent rounded-lg shadow-sm">
                    <div className="flex justify-between">
                        <div class="text-base text-gray-400 ">Rules Working</div>
                        <div>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                        </div>
                    </div>
                    <div class="flex items-center pt-1">
                        <div class="text-2xl font-bold text-gray-900 ">13</div>
                    </div>
                </div>



            </div>
        </div>
    );
}

export default Cards;