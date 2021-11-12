import React from 'react'
import Head from 'next/head';
import SendRecovery from '../components/auth/sendRecovery'

const sendRecovery = () => {
    return (
        <>
            <Head>
                <title>WPARK SOFTWARE</title>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossorigin="anonymous" />
                <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet" />
            </Head>

            <SendRecovery/>
        </>
    );
}

export default sendRecovery;