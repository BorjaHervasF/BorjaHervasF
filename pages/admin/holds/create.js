import React from 'react'
import Layout from '../../../components/Layout'
import Head from 'next/head';
import Hold from '../../../components/admin/createHold'

const layout = () => {
    return (
        <>
            <Layout>
                <div className="py-4 px-4">
                    <Hold />
                </div>
            </Layout>
        </>
    );
}

export default layout;