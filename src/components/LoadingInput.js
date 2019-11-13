import React from "react";
export default function LoadingInput({ loading, inputRef, ...props }) {

    return (
        <input className="form-control" disabled={loading}
            ref={inputRef}
            {...props} />

    )
}