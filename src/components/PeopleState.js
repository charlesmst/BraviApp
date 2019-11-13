
import axios, { filterApiErrorMessage } from "../Axios";
export function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_PEOPLE_START':
            return { ...state, loading: true }
        case 'FETCH_PEOPLE_SUCCESS':
            return { ...state, loading: false, data: action.data, error: null }
        case 'FETCH_PEOPLE_ERROR':
            return { ...state, loading: false, data: [], error: action.error }
        case 'SAVE_PERSON_START':
            return { ...state, loadingSave: true, errorSave: null }
        case 'SAVE_PERSON_SUCCESS_ADD':
            return { ...state, loadingSave: false, data: [...state.data, action.person], errorSave: null }
        case 'SAVE_PERSON_SUCCESS_UPDATE':
            return { ...state, loadingSave: false, data: state.data.map(x => x.id == action.person.id ? { ...x, ...action.person } : x), errorSave: null }
        case 'SAVE_PERSON_SUCCESS_DELETE':
            return { ...state, loadingSave: false, data: state.data.filter(x => x.id != action.id), errorSave: null }

        case 'SAVE_PERSON_ERROR':
            return { ...state, loadingSave: false, errorSave: action.error }

    }
}
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
        const response = await axios.post('/person')
        const id = response.data.id
        dispatch({ type: 'SAVE_PERSON_SUCCESS_ADD', person: { ...data, id } })
    } catch (e) {
        dispatch({ type: 'SAVE_PERSON_ERROR', error: filterApiErrorMessage(e) })
    }

}


export async function updatePerson(dispatch, id, data) {
    dispatch({ type: 'SAVE_PERSON_START' })
    try {
        const response = await axios.put('/person/' + id)
        dispatch({ type: 'SAVE_PERSON_SUCCESS_UPDATE', person: { ...data, id } })
    } catch (e) {
        dispatch({ type: 'SAVE_PERSON_ERROR', error: filterApiErrorMessage(e) })
    }

}

export async function deletePerson(dispatch, id) {
    dispatch({ type: 'SAVE_PERSON_START' })
    try {
        const response = await axios.delete('/person/' + id)
        dispatch({ type: 'SAVE_PERSON_SUCCESS_DELETE', id })
    } catch (e) {
        dispatch({ type: 'SAVE_PERSON_ERROR', error: filterApiErrorMessage(e) })
    }

}