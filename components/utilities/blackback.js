import React from 'react';

const blackback = (props) => {
    return (
        <div className={"w-screen h-screen  bg-black bg-opacity-60 justify-center flex items-center z-50 mr-0-imp ml-0-imp " + (props.fulltotal ? 'fixed top-0 left-0' : 'fixed top-0 left-0')}>
            {props.children}
        </div>
    );
}

export default blackback;