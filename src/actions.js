
import axios, { filterApiErrorMessage } from "./Axios";



export async function loadPeople(dispatch) {
    dispatch({ type: 'FETCH_PEOPLE_START' })
    try {
        const response = await axios.get('/person')
        dispatch({ type: 'FETCH_PEOPLE_SUCCESS', data: response.data })
    } catch (e) {
        dispatch({ type: 'FETCH_PEOPLE_ERROR', error: filterApiErrorMessage(e) })
    }

}


export async function addPerson(dispatch, data) {
    dispatch({ type: 'SAVE_PERSON_START' })
    try {
        const response = await axios.post('/person', data)
        const id = response.data.id
        dispatch({ type: 'SAVE_PERSON_SUCCESS_ADD', person: { ...data, id } })
        return id
    } catch (e) {
        dispatch({ type: 'SAVE_PERSON_ERROR', error: filterApiErrorMessage(e) })
    }

}


export async function updatePerson(dispatch, id, data) {
    dispatch({ type: 'SAVE_PERSON_START' })
    try {
        await axios.put('/person/' + id, data)
        dispatch({ type: 'SAVE_PERSON_SUCCESS_UPDATE', person: { ...data, id } })
        return id
    } catch (e) {
        dispatch({ type: 'SAVE_PERSON_ERROR', error: filterApiErrorMessage(e) })
    }

}

export async function deletePerson(dispatch, id) {
    dispatch({ type: 'SAVE_PERSON_START' })
    try {
        await axios.delete('/person/' + id)
        dispatch({ type: 'SAVE_PERSON_SUCCESS_DELETE', id })
    } catch (e) {
        dispatch({ type: 'SAVE_PERSON_ERROR', error: filterApiErrorMessage(e) })
    }

}



export async function addContact(dispatch, personId, data) {
    dispatch({ type: 'SAVE_CONTACT_START' })
    try {
        const response = await axios.post(`/contact/${personId}`, data)
        const id = response.data.id
        dispatch({ type: 'SAVE_CONTACT_SUCCESS_ADD', personId, contact: { ...data, id } })
        return id
    } catch (e) {
        dispatch({ type: 'SAVE_CONTACT_ERROR', error: filterApiErrorMessage(e) })
    }

}


export async function updateContact(dispatch, personId, id, data) {
    dispatch({ type: 'SAVE_CONTACT_START' })
    try {
        await axios.put(`/contact/${personId}/${id}`, data)
        dispatch({ type: 'SAVE_CONTACT_SUCCESS_UPDATE', personId, contact: { ...data, id } })
        return id
    } catch (e) {
        dispatch({ type: 'SAVE_CONTACT_ERROR', error: filterApiErrorMessage(e) })

    }

}

export async function deleteContact(dispatch, personId, id) {
    dispatch({ type: 'SAVE_CONTACT_START' })
    try {
        await axios.delete(`/contact/${personId}/${id}`)
        dispatch({ type: 'SAVE_CONTACT_SUCCESS_DELETE', personId, contactId: id })
        return id
    } catch (e) {
        dispatch({ type: 'SAVE_CONTACT_ERROR', error: filterApiErrorMessage(e) })
    }

}

export function openContactForm(dispatch) {
    dispatch({ type: 'OPEN_CONTACT_FORM' })
}

export function openPersonForm(dispatch) {
    dispatch({ type: 'OPEN_PERSON_FORM' })
}