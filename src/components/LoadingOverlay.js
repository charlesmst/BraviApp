import React from "react";
import { Modal, Spinner } from "react-bootstrap";
export default function LoadingOverlay({ loading }) {

    return (
        <Modal show={loading}>

            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>

        </Modal>

    )
}