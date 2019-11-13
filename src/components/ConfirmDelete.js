import React from 'react'
import { Modal, Button } from 'react-bootstrap'
export default function ConfirmDelete({ visible, title, body, confirmText, onConfirm, onClose }) {
    return (<Modal show={visible} onHide={onClose} key={"modal"}>
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            {body}

        </Modal.Body>
        <Modal.Footer>

            <Button variant="secondary" onClick={onClose}>Cancel</Button>
            <Button variant="danger" onClick={onConfirm}>{confirmText}</Button>
        </Modal.Footer>


    </Modal>)
}