import React from 'react'
import Link from 'next/link';
import ReactTooltip from 'react-tooltip'

const CreateHold = () => {
    return (
        <Link href="/admin/holds/create">
            <div data-tip data-for='hold' className="w-6 h-6 relative cursor-pointer">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>
                <svg className="w-4 h-4 absolute top-0 -right-3 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                <ReactTooltip backgroundColor="#000" id='hold' effect='solid' place='bottom' aria-haspopup='true' role='example'>
                    Create New Hold
                </ReactTooltip>
            </div>
        </Link>
    );
}

export default CreateHold;