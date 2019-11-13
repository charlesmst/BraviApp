
import Axios, { filterApiErrorMessage } from './Axios'
import { reducer } from "./reducer";
jest.mock('./Axios')
const fakePeopleData = [
    {
        id: "id1",
        name: "Charles",
        contacts: [
            { id: "contact2", type: 0, value: "55999999999" }
        ]
    }
]
it('should start loading when fetch starts', () => {
    const currentState = { loading: false, data: [] }
    const result = reducer(currentState, { type: 'FETCH_PEOPLE_START' })
    expect(result.loading).toBeTruthy()
})

it('should reset error when loading starts', () => {
    const currentState = { loading: false, data: [], error: "Error" }
    const result = reducer(currentState, { type: 'FETCH_PEOPLE_START' })
    expect(result.error).toBeFalsy()
})

it('should set error when loading fails', () => {
    const currentState = { loading: true, data: [] }
    const result = reducer(currentState, { type: 'FETCH_PEOPLE_ERROR', error: "Generic error" })
    expect(result.error).toBe("Generic error")
})

it('should set data when loading is succeess', () => {
    const currentState = { loading: true, data: [] }
    const result = reducer(currentState, { type: 'FETCH_PEOPLE_SUCCESS', data: fakePeopleData })
    expect(result.data).toEqual(fakePeopleData)
})

it('should reset error when data loads when', () => {
    const currentState = { loading: true, data: [], error: 'any error' }
    const result = reducer(currentState, { type: 'FETCH_PEOPLE_SUCCESS', data: fakePeopleData })
    expect(result.error).toBeFalsy()
})


it('should start loading when save starts', () => {
    const currentState = { loadingSave: false, data: [] }
    const result = reducer(currentState, { type: 'SAVE_PERSON_START' })
    expect(result.loadingSave).toBeTruthy()
})

it('should reset errorSave when save loading starts', () => {
    const currentState = { loadingSave: false, errorSave: "some error" }
    const result = reducer(currentState, { type: 'SAVE_PERSON_START' })
    expect(result.errorSave).toBeFalsy()
})

it('should set error when loading save person fails', () => {
    const currentState = { loadingSave: true }
    const result = reducer(currentState, { type: 'SAVE_PERSON_ERROR', error: "Generic error" })
    expect(result.errorSave).toBe("Generic error")
})

it('should add person to list when save is succeess', () => {
    const currentState = { loadingSave: true, data: [] }
    const result = reducer(currentState, { type: 'SAVE_PERSON_SUCCESS_ADD', person: { id: "id1" } })
    expect(result.data).toEqual([{ id: "id1" }])
})


it('should update person to list when update is succeess', () => {
    const currentState = { loadingSave: true, data: [{ id: "id1", name: "Charles" }] }
    const result = reducer(currentState, { type: 'SAVE_PERSON_SUCCESS_UPDATE', person: { id: "id1", name: "Charles updated" } })
    expect(result.data).toEqual([{ id: "id1", name: "Charles updated" }])
})

it('should delete person from list when delete is succeess', () => {
    const currentState = { loadingSave: true, data: [{ id: "id1", name: "Charles" }] }
    const result = reducer(currentState, { type: 'SAVE_PERSON_SUCCESS_DELETE', id: "id1" })
    expect(result.data).toEqual([])
})

it('should reset error when data add saves success', () => {
    const currentState = { loadingSave: true, errorSave: 'any error', data: [] }
    const result = reducer(currentState, { type: 'SAVE_PERSON_SUCCESS_ADD', person: {} })
    expect(result.errorSave).toBeFalsy()
})




it('should add contact to person to list when save is succeess', () => {
    const currentState = { loadingSave: true, data: fakePeopleData }
    const result = reducer(currentState, { type: 'SAVE_CONTACT_SUCCESS_ADD', personId: fakePeopleData[0].id, contact: { id: "contact1" } })
    expect(result.data).toEqual([{ ...fakePeopleData[0], contacts: [...fakePeopleData[0].contacts, { id: "contact1" }] }])
})


it('should update contact to person to list when update is succeess', () => {
    const currentState = { loadingSave: true, data: fakePeopleData }
    const newContactValue = { id: "contact2", type: 2, value: "newValue" }
    const result = reducer(currentState, { type: 'SAVE_CONTACT_SUCCESS_UPDATE', personId: fakePeopleData[0].id, contact: newContactValue })
    expect(result.data).toEqual([{ ...fakePeopleData[0], contacts: [newContactValue] }])
})


it('should remove contact from person  when delete  is succeess', () => {
    const currentState = { loadingSave: true, data: fakePeopleData }
    const result = reducer(currentState, { type: 'SAVE_CONTACT_SUCCESS_DELETE', personId: fakePeopleData[0].id, contactId: "contact2" })
    expect(result.data).toEqual([{ ...fakePeopleData[0], contacts: [] }])
})


