import _ from 'lodash';
import React, { useState } from 'react';
import { Button, Modal } from "react-bootstrap";
import { Route, withRouter } from "react-router-dom";
import { addPerson, deletePerson, openPersonForm, updatePerson } from '../actions';
import ConfirmAction from '../components/ConfirmAction';
import ConfirmDelete from '../components/ConfirmDelete';
import ContactList from '../components/ContactList';
import ErrorCardSimple from '../components/ErrorCardSimple';
import LoadingOverlay from '../components/LoadingOverlay';
import { useStateValue } from '../components/StateProvider';
import ContactForm from './ContactForm';
function PersonForm({ history, match }) {
    const personId = match.params.id
    const isEditing = !!personId
    const [state, dispatch] = useStateValue()
    const [name, setName] = useState("")
    const inputRef = React.useRef()
    const [deleteVisible, setDeleteVisible] = useState(false)
    const showDelete = () => setDeleteVisible(true)
    const hideDelete = () => setDeleteVisible(false)
    const [confirmSave, setConfirmVisible] = useState(false)
    const showConfirmSave = () => setConfirmVisible(true)
    const hideConfirmSave = () => setConfirmVisible(false)

    const contacts = state.data && personId ? _.get(_.first(state.data.filter(x => x.id === personId)), "contacts", []) : []
    React.useEffect(() => {
        if (state.loading)
            return
        if (isEditing && state.data && history) {
            const people = state.data.filter(x => x.id === personId)
            if (people[0]) {
                setName(people[0].name)
            } else {
                history.replace("/")
            }
        }
    }, [state.data, personId, history, isEditing, state.loading])
    React.useEffect(() => {
        openPersonForm(dispatch)

        setTimeout(() => {
            if (inputRef.current && match.isExact)
                inputRef.current.focus()
        }, 100)
    }, [dispatch, match.isExact])
    const redirectToList = () => history.push("/")
    const onSubmit = async (e) => {
        e.preventDefault()
        if (state.loadingSave)
            return
        if (!name)
            return
        if (!isEditing) {
            const id = await addPerson(dispatch, { name })
            if (id)
                history.push("/")
        } else {
            const id = await updatePerson(dispatch, personId, { name })
            if (id) {
                history.push("/")
            }
        }
    }
    const confirmSaveAddContact = async () => {
        if (state.loadingSave)
            return
        hideConfirmSave()
        const id = await addPerson(dispatch, { name })
        if (id)
            history.replace("/edit/" + id + "/contact/add")

    }
    const onDelete = () => deletePerson(dispatch, personId)
    const onAddContact = () => {
        if (isEditing) {
            history.push(match.url + "/contact/add")
        } else {
            showConfirmSave()
        }
    }
    return (<React.Fragment>
        <Modal show onHide={redirectToList} key={"modal"}>
            <form onSubmit={onSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? "Edit" : "New"} Person</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="form-group">
                        <input type="text" className="form-control"
                            required
                            placeholder="Name"
                            value={name}
                            ref={inputRef}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <ErrorCardSimple message={state.errorSave} tryAgain={onSubmit} />

                    <Route path={match.url + "/contact/add"} render={props => <div>Adding</div>} />

                    <ContactList
                        contacts={contacts}
                        onAdd={onAddContact}
                        onEdit={(id) => {
                            history.push(match.url + "/contact/edit/" + id)
                        }} />
                    <ConfirmDelete
                        onConfirm={onDelete}
                        visible={deleteVisible}
                        body="Are you sure you want to delete this?"
                        confirmText="Confirm Delete"
                        onClose={hideDelete}
                        title="Deleting Person">
                    </ConfirmDelete>

                    <ConfirmAction
                        onConfirm={confirmSaveAddContact}
                        visible={confirmSave}
                        body="To add contacts you should first save the person?"
                        confirmText="Save person"
                        onClose={hideConfirmSave}
                        title="Saving Person">
                    </ConfirmAction>
                </Modal.Body>

                <Modal.Footer >
                    {isEditing && <Button variant="danger" className={"mr-auto"} onClick={showDelete}>Delete</Button>}

                    <Button variant="secondary" onClick={redirectToList}>Close</Button>
                    <Button variant="info" type={"submit"} disabled={state.loadingSave}>Save</Button>



                </Modal.Footer>
            </form>

        </Modal>
        <Route path={match.url + "/contact/add"}  >
            <ContactForm backUrl={match.url} personId={personId} />
        </Route>
        <Route path={match.url + "/contact/edit/:id"}  >
            <ContactForm backUrl={match.url} personId={personId} />
        </Route>

    </React.Fragment>)
}
export default withRouter(PersonForm)