import React from 'react'
import Link from 'next/link';
import ReactTooltip from 'react-tooltip'

const CreateRule = () => {
    return (
        <Link href="/admin/rules/create">
            <div data-tip data-for='rule' className="w-6 h-6 relative cursor-pointer">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                <svg className="w-4 h-4 absolute top-0 -right-2 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                <ReactTooltip backgroundColor="#000" id='rule' effect='solid' place='bottom' aria-haspopup='true' role='example'>
                    Create New Rule
                </ReactTooltip>
            </div>
        </Link>
    );
}

export default CreateRule;