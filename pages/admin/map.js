import React from 'react';
import Head from 'next/head';
import Map from '../../components/admin/Map'
import Layout from '../../components/Layout'

const map = () => {
    return (
        <>
            <Layout>
                <div className="py-4 px-4">
                    <Map />
                </div>
            </Layout>
        </>
    );
}

export default map;