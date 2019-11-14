import _ from 'lodash'

export function reducer(state, action) {
    const sortOperation = [person => _.get(person, "name", "").toLowerCase()]
    switch (action.type) {
        case 'FETCH_PEOPLE_START':
            return { ...state, loading: true, error: null }
        case 'FETCH_PEOPLE_SUCCESS':
            return { ...state, loading: false, data: _.orderBy(action.data, sortOperation, ['asc']), error: null }
        case 'FETCH_PEOPLE_ERROR':
            return { ...state, loading: false, data: [], error: action.error }
        case 'SAVE_PERSON_START':
            return { ...state, loadingSave: true, errorSave: null }
        case 'SAVE_PERSON_SUCCESS_ADD':
            return { ...state, loadingSave: false, data: _.orderBy([...state.data, action.person], sortOperation, ['asc']), errorSave: null }
        case 'SAVE_PERSON_SUCCESS_UPDATE':
            return { ...state, loadingSave: false, data: _.orderBy(state.data.map(x => x.id === action.person.id ? { ...x, ...action.person } : x), sortOperation, ['asc']), errorSave: null }
        case 'SAVE_PERSON_SUCCESS_DELETE':
            return { ...state, loadingSave: false, data: state.data.filter(x => x.id !== action.id), errorSave: null }
        case 'SAVE_PERSON_ERROR':
            return { ...state, loadingSave: false, errorSave: action.error }

        case 'SAVE_CONTACT_START':
            return { ...state, loadingSaveContact: true, errorSaveContact: null }
        case 'SAVE_CONTACT_ERROR':
            return { ...state, loadingSaveContact: false, errorSaveContact: action.error }

        case 'SAVE_CONTACT_SUCCESS_ADD':
            return {
                ...state, loadingSaveContact: false, data: state.data.map(x => x.id === action.personId ? {
                    ...x, contacts: [
                        ...(x.contacts || []),
                        action.contact
                    ],
                } : x), errorSaveContact: null
            }
        case 'SAVE_CONTACT_SUCCESS_UPDATE':
            return {
                ...state, loadingSaveContact: false, data: state.data.map(x => x.id === action.personId ? {
                    ...x, contacts: (x.contacts || []).map(y => y.id === action.contact.id ? { ...y, ...action.contact } : y),
                } : x), errorSaveContact: null
            }
        case 'SAVE_CONTACT_SUCCESS_DELETE':
            return {
                ...state, loadingSaveContact: false, data: state.data.map(x => x.id === action.personId ? {
                    ...x, contacts: (x.contacts || []).filter(y => y.id !== action.contactId),
                } : x), errorSaveContact: null
            }

        case 'OPEN_PERSON_FORM':
            return { ...state, errorSave: null }
        case 'OPEN_CONTACT_FORM':
            return { ...state, errorSaveContact: null }
        default:
            return state
    }
}