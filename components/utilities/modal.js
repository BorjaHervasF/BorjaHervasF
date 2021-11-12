import React from 'react';

const modal = (props) => {
    return (
        <div className={"bg-white rounded w-1/3 p-4 " + (props.size ? 'w-2/3' : '')}>
            {props.header &&
                <>
                    <div className="w-full flex border-b-2 pb-2">
                        <div className="w-10/12 font-medium text-xl">
                            {props.header}
                        </div>
                        <div className="justify-end flex w-2/12 ">
                            <svg onClick={()=>{props.closeModal(false)}} class="w-6 h-6 text-red-500 transform translate-y-0.5 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                    </div>
                </>
            }
            <div className={"w-full " + (props.header ? 'mt-5' : '')}>
                {props.children}
            </div>

            {props.okbuttontext &&
                <>
                    <div className={"w-full justify-center flex mt-4 " + (props.children ? 'border-t-2' : '')}>
                        <button className={"pt-2 pb-2 pl-4 pr-4 border-2 text-green-500 border-green-500 hover:bg-green-500 hover:text-white text-lg m-auto font-medium rounded-lg focus:outline-none " + (props.children ? 'mt-4' : '')} onClick={()=>props.okbutton({tipo: true})}>
                            {props.okbuttontext}
                        </button>
                    </div>

                    {props.successtext &&
                        <div className={"w-full justify-center flex mt-2 "}>
                            <span className="text-green-500">{props.successtext}</span>
                        </div>
                    }

                    {props.errortext &&
                        <div className={"w-full justify-center flex mt-2 "}>
                            <span className="text-red-500">{props.errortext}</span>
                        </div>
                    }
                </>
            }
        </div>
    );
}

export default modal;