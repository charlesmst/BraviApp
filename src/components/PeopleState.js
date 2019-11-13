
import axios, { filterApiErrorMessage } from "../Axios";
export function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_PEOPLE_START':
            return { ...state, loading: true }
        case 'FETCH_PEOPLE_SUCCESS':
            return { ...state, loading: false, data: action.data, error: null }
        case 'FETCH_PEOPLE_ERROR':
            return { ...state, loading: false, data: [], error: action.error }

    }
}
export async function loadPeople(dispatch) {
    dispatch({ type: 'FETCH_PEOPLE_START' })
    try {
        const response = await axios.get('/person')
        dispatch({ type: 'FETCH_PEOPLE_SUCCESS', data:response.data })
    } catch (e) {
        dispatch({ type: 'FETCH_PEOPLE_ERROR', error: filterApiErrorMessage(e) })
    }

}