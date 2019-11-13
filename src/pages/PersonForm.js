import React, { useState } from 'react';
import { Button, Modal } from "react-bootstrap";
import { withRouter, Route } from "react-router-dom";
import { addPerson, updatePerson, deletePerson } from '../actions';
import { useStateValue } from '../components/StateProvider';
import ErrorCardSimple from '../components/ErrorCardSimple';
import LoadingOverlay from '../components/LoadingOverlay';
import LoadingInput from '../components/LoadingInput';
import ContactList from '../components/ContactList';
import _ from 'lodash'
import ContactForm from './ContactForm';
function PersonForm({ history, match }) {
    const personId = match.params.id
    const isEditing = !!personId
    const [state, dispatch] = useStateValue();
    const [name, setName] = useState("")
    const contacts = state.data && personId ? _.get(_.first(state.data.filter(x => x.id === personId)), "contacts", []) : []
    React.useEffect(() => {
        if (state.loading)
            return
        if (isEditing && state.data && history) {
            const people = state.data.filter(x => x.id === personId)
            if (people[0]) {
                console.log({ people })
                setName(people[0].name)
            } else {
                history.replace("/")
            }
        }
    }, [state.data, personId, history, isEditing, state.loading])
    const redirectToList = () => history.push("/")
    const onSubmit = async (e) => {
        e.preventDefault()
        if (!name)
            return
        if (!isEditing) {
            const id = await addPerson(dispatch, { name })
            if (id)
                history.replace("/edit/" + id)
        } else {
            await updatePerson(dispatch, personId, { name })
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
                        <LoadingInput type="text" className="form-control"
                            required
                            placeholder="Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <ErrorCardSimple message={state.errorSave} tryAgain={onSubmit} />
                    </div>
                    <LoadingOverlay loading={state.loadingSave} />
                    <Route path={match.url + "/contact/add"} render={props => <ContactForm backUrl={match.url} personId={personId} {...props} />} />
                    <Route path={match.url + "/contact/edit/:id"} render={props => <ContactForm backUrl={match.url} personId={personId} {...props} />} />

                    <ContactList
                        contacts={contacts}
                        onAdd={() => history.push(match.url + "/contact/add")}
                        onEdit={(id) => {
                            history.push(match.url + "/contact/edit/" + id)
                        }} />
                </Modal.Body>

                <Modal.Footer>
                    {isEditing && <Button variant="danger" onClick={() => deletePerson(dispatch, personId)}>Delete</Button>}
                    <Button variant="secondary" onClick={redirectToList}>Close</Button>
                    <Button variant="primary" type={"submit"}>Save</Button>

                </Modal.Footer>
            </form>

        </Modal>
    </React.Fragment>)
}
export default withRouter(PersonForm)