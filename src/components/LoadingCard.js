import React from "react";
import { Spinner } from "react-bootstrap";
export default function LoadingCard({ loading }) {

    if (!loading)
        return null
    return (<center>
        <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>
    </center>
    )
}