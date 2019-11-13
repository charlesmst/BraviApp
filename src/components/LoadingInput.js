import React from "react";
export default function LoadingInput({ loading, ...props }) {

    return (
        <input className="form-control" disabled={loading}
            {...props} />

    )
}