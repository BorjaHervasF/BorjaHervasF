import React from 'react'
import Layout from '../../components/Layout'
import Head from 'next/head';
import LayoutRework from '../../components/yard/reworks/Reworks'

const rework = () => {
    return (
        <>
            <Layout>
                    <LayoutRework />
            </Layout>
        </>
    );
}

export default rework;