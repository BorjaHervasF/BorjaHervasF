import React, { useEffect } from 'react';
import {reportYardWeb} from '../../components/functions/datafunctions'
import Layout from '../../components/Layout'
import PrintLoad from '../../components/yard/loads/PrintLoad';

const yard = () => {

    useEffect(() => {
        reportYardWeb().then(res=>{
            console.log(res)
            
        })
    }, [])

    return (
        <>
            {/* <Layout> */}
                <PrintLoad />
                <div id="report" className="w-full justify-center flex items-center p-2">
                </div>
            {/* </Layout> */}
        </>
    );
}

export default yard;