import React from 'react';
import Layout from '../../components/Layout'
import Table from '../../components/editor/Table'

const database = () => {
    return (
        <Layout>
            <div className="py-4 px-4">
                <Table></Table>
            </div>
        </Layout>
    );
}

export default database;