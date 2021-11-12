import React from 'react';
import Layout from '../../components/Layout'
import Block from '../../components/admin/block/block'

const blocks = () => {
    return (
        <Layout>
            <div className="py-4 px-4">
                <Block />
            </div>
        </Layout>
    );
}

export default blocks;