import React from 'react'
import Layout from '../components/Layout'
import Charts from '../components/dashboard/Charts'
import $ from 'jquery'

import Totalspace from '../components/dashboard/charts/totalSpace'
import Notifications from '../components/notifications'

import Dwelltime from '../components/dashboard/charts/dwelltime'

import Totalparkings from '../components/dashboard/charts/totalParkings'
import Totalmovements from '../components/dashboard/charts/totalMovements'

import TopRules from '../components/dashboard/tops/topRules'
import TopMovements from '../components/dashboard/tops/topMovements'

import Transport from '../components/dashboard/charts/transport'

const dashboard = () => {

    return (
        <>
            <Layout>
                <div className="py-4 px-4">
                    {/* <Charts /> */}
                    <div className="w-full grid gap-4 grid-cols-6">
                        <div className="col-span-4">
                            <div className="grid grid-cols-6 gap-4 w-full">
                                <div className="col-span-2">
                                    <TopRules />
                                </div>
                                <div className="col-span-2">
                                    <TopMovements />
                                </div>
                                <div className="col-span-2">
                                    <Transport />
                                </div>
                                
                            </div>
                            <Totalparkings />
                            <Totalmovements />
                        </div>
                        <div className="col-span-2">
                            <Totalspace />
                            <Notifications limit={4} title={true} rounded={true} />
                            <Dwelltime />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default dashboard;