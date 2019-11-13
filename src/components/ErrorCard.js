import React from "react";
import { Alert, Button } from "react-bootstrap";
export default function ErrorCard({ message, tryAgain }) {

    if (!message)
        return null
    return (
        <Alert variant={"danger"}>
            <Alert.Heading>Something went wrong?!</Alert.Heading>
            <p>{message}</p>
            <hr />
            <div className="d-flex justify-content-end">
                <Button onClick={tryAgain} variant="outline-danger">
                    Retry
                </Button>
            </div>
        </Alert>

    )
}