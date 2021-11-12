import React from 'react'
import Layout from '../../components/Layout'
import Head from 'next/head';
import SearchComp from '../../components/yard/search/SearchComp'

const search = () => {
    return (
        <>
            <Layout>
                <div className="py-4 px-4">
                    <SearchComp />
                </div>
            </Layout>
        </>
    );
}

export default search;