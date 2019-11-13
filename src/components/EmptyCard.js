import React from "react";
import { Alert, Button } from "react-bootstrap";
export default function EmptyCard({ message, add }) {

    if (!message)
        return null
    return (
        <Alert variant={"info"}>
            <Alert.Heading>Nothing here yet!</Alert.Heading>
            <p>{message}</p>
            <hr />
            <div className="d-flex justify-content-start">
                <Button onClick={add} variant="outline-info">
                    Add
                </Button>
            </div>
        </Alert>

    )
}