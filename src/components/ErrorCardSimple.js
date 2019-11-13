import React from "react";
import { Alert, Button } from "react-bootstrap";
export default function ErrorCardSimple({ message, tryAgain }) {

    if (!message)
        return null
    return (
        <Alert variant={"danger"}>
            <p>{message}</p>

            <Button onClick={tryAgain} variant="outline-danger">
                Try Again
            </Button>

        </Alert>

    )
}