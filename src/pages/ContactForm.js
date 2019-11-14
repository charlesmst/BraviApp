import _ from 'lodash';
import React, { useState } from 'react';
import { Button, Form, Modal } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { addContact, deleteContact, openContactForm, updateContact } from '../actions';
import ConfirmDelete from '../components/ConfirmDelete';
import ErrorCardSimple from '../components/ErrorCardSimple';
import { useStateValue } from '../components/StateProvider';
import { ContactTypeDescription } from '../enums';
function ContactForm({ history, match, personId, backUrl }) {
    const contactId = match.params.id
    const isEditing = !!contactId
    const [state, dispatch] = useStateValue();
    const [value, setValue] = useState("")
    const [type, setType] = useState(0)
    const inputRef = React.useRef()

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
    React.useEffect(() => {
        openContactForm(dispatch)
        if (inputRef.current && match.isExact) {
            inputRef.current.focus()
        }
    }, [dispatch, match.isExact])

    const redirectToList = () => history.push(backUrl)
    const onSubmit = async (e) => {
        e.preventDefault()
        if (state.loadingSaveContact)
            return
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
    const fieldType = typeof ContactTypeDescription[type] !== "undefined" ? ContactTypeDescription[type].inputType : "text"
    const fieldDescription = typeof ContactTypeDescription[type] !== "undefined" ? ContactTypeDescription[type].description : "text"
    return (<React.Fragment>
        <Modal show onHide={redirectToList} key={"modal"}>
            <form onSubmit={onSubmit}>

                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? "Edit" : "New"} Contact</Modal.Title>
                </Modal.Header>

                <Modal.Body>


                    <Form.Group controlId="exampleForm.ControlSelect2">
                        <Form.Control as="select" value={type} onChange={e => setType(e.target.value)}>
                            {ContactTypeDescription.map((x, i) => <option value={i}>{x.description}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <div className="form-group">
                        <input type={fieldType} className="form-control"
                            required
                            placeholder={fieldDescription}
                            value={value}
                            ref={inputRef}
                            onChange={e => setValue(e.target.value)}
                        />

                    </div>
                    <ErrorCardSimple message={state.errorSaveContact} tryAgain={onSubmit} />



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
                    <Button variant="info" id={"savePersonButton"} type={"submit"} title={"Save Contact"} disabled={state.loadingSaveContact}>Save</Button>
                </Modal.Footer>
            </form>

        </Modal>
    </React.Fragment>)
}
export default withRouter(ContactForm)