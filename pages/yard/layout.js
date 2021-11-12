import React from 'react'
import Layout from '../../components/Layout'
import Head from 'next/head';
import LayoutYard from '../../components/yard/layout/layout'

const layout = () => {
    return (
        <>
            <Layout>
                <div className="py-4 px-4">
                    <LayoutYard />
                </div>
            </Layout>
        </>
    );
}

export default layout;