import React, { useState } from 'react';
import { Button, Modal } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { addPerson, updatePerson, deletePerson } from '../components/PeopleState';
import { useStateValue } from '../components/StateProvider';
import ErrorCardSimple from '../components/ErrorCardSimple';
import LoadingOverlay from '../components/LoadingOverlay';
import LoadingInput from '../components/LoadingInput';
function PersonForm({ history, match }) {
    const personId = match.params.id
    const isEditing = !!personId
    const [state, dispatch] = useStateValue();
    const [name, setName] = useState("")
    React.useEffect(() => {
        console.log({ isEditing })
        if (isEditing && state.data && history) {
            const people = state.data.filter(x => x.id === personId)
            if (people[0]) {
                console.log({ people })
                setName(people[0].name)
            } else {
                history.replace("/")
            }
        }
    }, [state.data, personId, history, isEditing])
    const redirectToList = () => history.push("/")
    const tryToSave = async () => {
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
            <Modal.Header closeButton>
                <Modal.Title>{isEditing?"Edit":"New"} Person</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form>
                    <div className="form-group">
                        <LoadingInput type="text" className="form-control"
                            required
                            placeholder="Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            onBlur={tryToSave} />
                        <ErrorCardSimple message={state.errorSave} tryAgain={tryToSave} />
                    </div>
                    <LoadingOverlay loading={state.loadingSave} />
                </form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={redirectToList}>Close</Button>
                {isEditing&& <Button variant="danger" onClick={()=>deletePerson(dispatch,personId)}>Delete</Button>}
            </Modal.Footer>
        </Modal>
    </React.Fragment>)
}
export default withRouter(PersonForm)