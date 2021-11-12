import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import $ from 'jquery'
import Head from 'next/head';

const index = () => {

    return (
      <>
        <Head>
          <title>WPARK</title>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossorigin="anonymous" />
          <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet" />
        </Head>
        <div className="w-full h-screen bg-white flex justify-center items-center">
          <div className="w-2/6">
            <div className="w-full justify-center flex items-center">
              <img src="img/logo.png" className="w-2/3 h-auto" />
            </div>
            <div className="w-full ">
              <a download href="wpark.exe" className="w-full justify-center flex items-center">
                <button className="w-2/4 text-lg space-x-2 mr-4 text-white font-medium mt-8 p-3 justify-center flex items-center bg-gray-800 hover:bg-gray-900 duration-300 transition-colors rounded-lg">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  <span>Download</span> 
                </button>
              </a>
            </div>
          </div>
        </div>
      </>
    );
}

export default index;