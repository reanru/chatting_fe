import React, { useEffect, useRef } from 'react'

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        // console.log('testing check previous ', ref.current);
        ref.current = value; //assign the value of ref to the argument
    },[value]); //this code will run when the value of 'value' changes

    return ref.current === undefined ? value : ref.current; //in the end, return the current ref value.
}

export default usePrevious;