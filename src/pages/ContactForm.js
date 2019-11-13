import _ from 'lodash';
import React, { useState } from 'react';
import { Button, Form, Modal } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { addContact, deleteContact, updateContact, openContactForm } from '../actions';
import LoadingInput from '../components/LoadingInput';
import { useStateValue } from '../components/StateProvider';
import { ContactType } from '../enums';
import ErrorCardSimple from '../components/ErrorCardSimple';
import ConfirmDelete from '../components/ConfirmDelete';
function ContactForm({ history, match, personId, backUrl }) {
    const contactId = match.params.id
    const isEditing = !!contactId
    const [state, dispatch] = useStateValue();
    const [value, setValue] = useState("")
    const [type, setType] = useState(0)
    const [deleteVisible, setDeleteVisible] = useState(false)
    const showDelete = () => setDeleteVisible(true)
    const hideDelete = () => setDeleteVisible(false)
    const contacts = state.data && personId ? _.get(_.first(state.data.filter(x => x.id === personId)), "contacts", []) : []
    React.useEffect(() => {
        if (state.loading)
            return
        if (isEditing && contacts && history) {
            const contact = contacts.filter(x => x.id === contactId)
            if (contact[0]) {
                if (!value) {
                    setValue(contact[0].value)
                    setType(contact[0].type)
                }
            } else {
                history.replace("/")
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contacts, contactId, isEditing, state.data, history, state.loading])
    React.useEffect(() => openContactForm(dispatch), [dispatch])

    const redirectToList = () => history.push(backUrl)
    const onSubmit = async (e) => {
        e.preventDefault()
        if (!isEditing) {
            const id = await addContact(dispatch, personId, { type, value })
            if (id)
                history.replace(backUrl)
        } else {
            const id = await updateContact(dispatch, personId, contactId, { type, value })
            if (id)
                history.replace(backUrl)

        }
    }
    const onDelete = () => {
        const id = deleteContact(dispatch, personId, contactId)
        if (id)
            history.replace(backUrl)
    }
    return (<React.Fragment>
        <Modal show onHide={redirectToList} key={"modal"}>
            <form onSubmit={onSubmit}>

                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? "Edit" : "New"} Contact</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <form>
                        <Form.Group controlId="exampleForm.ControlSelect2">
                            <Form.Control as="select" value={type} onChange={e => setType(e.target.value)}>
                                {ContactType.map((x, i) => <option value={i}>{x}</option>)}
                            </Form.Control>
                        </Form.Group>
                        <div className="form-group">
                            <LoadingInput type="text" className="form-control"
                                required
                                placeholder="Name"
                                value={value}
                                onChange={e => setValue(e.target.value)}
                            />

                        </div>
                        <ErrorCardSimple message={state.errorSaveContact} tryAgain={onSubmit} />

                    </form>

                    <ConfirmDelete
                        onConfirm={onDelete}
                        visible={deleteVisible}
                        body="Are you sure you want to delete this?"
                        confirmText="Confirm Delete"
                        onClose={hideDelete}
                        title="Deleting Contact">
                    </ConfirmDelete>
                </Modal.Body>

                <Modal.Footer>
                    {isEditing && <Button variant="danger" className={"mr-auto"} onClick={() => showDelete()}>Delete</Button>}
                    <Button variant="secondary" onClick={redirectToList}>Close</Button>
                    <Button variant="primary" type={"submit"}>Save</Button>
                </Modal.Footer>
            </form>

        </Modal>
    </React.Fragment>)
}
export default withRouter(ContactForm)