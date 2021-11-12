import React, { useEffect, forwardRef, useImperativeHandle } from 'react'
import useFade from './useFade'

const Loader = forwardRef((props, ref) => {

    const [isVisible, setVisible, fadeProps] = useFade();

    useImperativeHandle(ref, () => ({

        getDone() {
            setVisible(!isVisible)
        }
    
    }));

    return (
        <div className="w-6 h-6 relative">
            {!isVisible &&
                <div {...fadeProps}>
                    {(props.type === 1 || props.type === '1' || Object.keys(props).length === 0) &&
                        <img className="w-6 h-6" src="/loaders/tail-spin.svg" />
                    }
                    {(props.type === 2 || props.type === '2') &&
                        <img className="w-6 h-6" src="/loaders/oval.svg" />
                    }
                    {(props.type === 3 || props.type === '3') &&
                        <img className="w-6 h-6" src="/loaders/puff.svg" />
                    }
                    {(props.type === 4 || props.type === '4') &&
                        <img className="w-6 h-6" src="/loaders/rings.svg" />
                    }
                </div>
            }
            {isVisible &&
                <div {...fadeProps} className="w-full h-full top-0 absolute flex justify-center items-center">
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
            }
        </div>
    );
});

export default Loader;
