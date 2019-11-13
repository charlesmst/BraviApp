
import Axios, { filterApiErrorMessage } from '../Axios'
jest.mock('../Axios')
import { reducer, loadPeople, addPerson, updatePerson, deletePerson, addContact, updateContact, deleteContact } from "./PeopleState";
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
    const currentState = { loading: false, data: [] }
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

it('should fetch people from api', async (done) => {
    Axios.get.mockImplementationOnce(() =>
        Promise.resolve({ data: fakePeopleData })
    )
    const dispatch = jest.fn()
    await loadPeople(dispatch)
    expect(dispatch).toHaveBeenNthCalledWith(1, { type: 'FETCH_PEOPLE_START' })
    expect(dispatch).toHaveBeenNthCalledWith(2, { type: 'FETCH_PEOPLE_SUCCESS', data: fakePeopleData })
    expect(dispatch).toHaveBeenCalledTimes(2)
    done()
})


it('should set error when fetch fail', async (done) => {
    const errorMessage = "Wrong"
    Axios.get.mockImplementationOnce(() =>
        Promise.reject(new Error(errorMessage))
    )
    filterApiErrorMessage.mockImplementationOnce(() => errorMessage)
    const dispatch = jest.fn()
    await loadPeople(dispatch)
    expect(dispatch).toHaveBeenNthCalledWith(1, { type: 'FETCH_PEOPLE_START' })
    expect(dispatch).toHaveBeenNthCalledWith(2, { type: 'FETCH_PEOPLE_ERROR', error: errorMessage })
    expect(dispatch).toHaveBeenCalledTimes(2)
    done()
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


it('should save person to api', async (done) => {
    const postMock = jest.fn().mockReturnValueOnce(Promise.resolve({ data: { success: true, id: "id1" } }))
    Axios.post.mockImplementationOnce(postMock)
    const dispatch = jest.fn()
    const entityData = { name: "Charles", birthDate: "any" }
    await addPerson(dispatch, entityData)
    expect(postMock).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenNthCalledWith(1, { type: 'SAVE_PERSON_START' })
    expect(dispatch).toHaveBeenNthCalledWith(2, { type: 'SAVE_PERSON_SUCCESS_ADD', person: { ...entityData, id: "id1" } })
    expect(dispatch).toHaveBeenCalledTimes(2)
    done()
})


it('should set error when fetch fail', async (done) => {
    const errorMessage = "Wrong"
    Axios.post.mockImplementationOnce(() =>
        Promise.reject(new Error(errorMessage))
    )
    filterApiErrorMessage.mockImplementationOnce(() => errorMessage)
    const dispatch = jest.fn()
    await addPerson(dispatch, {})
    expect(dispatch).toHaveBeenNthCalledWith(1, { type: 'SAVE_PERSON_START' })
    expect(dispatch).toHaveBeenNthCalledWith(2, { type: 'SAVE_PERSON_ERROR', error: errorMessage })
    expect(dispatch).toHaveBeenCalledTimes(2)
    done()
})




it('should update person to api', async (done) => {
    const id = "id1"
    const entityData = { name: "Charles", birthDate: "any" }
    const putMock = jest.fn().mockReturnValueOnce(Promise.resolve({ data: { success: true, id } }))
    Axios.put.mockImplementationOnce(putMock)
    const dispatch = jest.fn()
    await updatePerson(dispatch, id, entityData)
    expect(putMock).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenNthCalledWith(1, { type: 'SAVE_PERSON_START' })
    expect(dispatch).toHaveBeenNthCalledWith(2, { type: 'SAVE_PERSON_SUCCESS_UPDATE', person: { ...entityData, id: "id1" } })
    expect(dispatch).toHaveBeenCalledTimes(2)
    done()
})




it('should delete person to api', async (done) => {
    const id = "id1"
    const entityData = { name: "Charles", birthDate: "any" }
    const deleteMock = jest.fn().mockReturnValueOnce(Promise.resolve({ data: { success: true, id } }))
    Axios.delete.mockImplementationOnce(deleteMock)
    const dispatch = jest.fn()
    await deletePerson(dispatch, id)
    expect(deleteMock).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenNthCalledWith(1, { type: 'SAVE_PERSON_START' })
    expect(dispatch).toHaveBeenNthCalledWith(2, { type: 'SAVE_PERSON_SUCCESS_DELETE', id })
    expect(dispatch).toHaveBeenCalledTimes(2)
    done()
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



it('should add contact to api', async (done) => {
    const postMock = jest.fn().mockReturnValueOnce(Promise.resolve({ data: { success: true, id: "id1" } }))
    Axios.post.mockImplementationOnce(postMock)
    const dispatch = jest.fn()
    const entityData = { type: 0, value: "charles.mst@gmail.com" }
    const personId = "person1"
    await addContact(dispatch, personId, entityData)
    expect(postMock).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenNthCalledWith(1, { type: 'SAVE_PERSON_START' })
    expect(dispatch).toHaveBeenNthCalledWith(2, { type: 'SAVE_CONTACT_SUCCESS_ADD', personId, contact: { ...entityData, id: "id1" } })
    expect(dispatch).toHaveBeenCalledTimes(2)
    done()
})


it('should update contact to api', async (done) => {
    const putMock = jest.fn().mockReturnValueOnce(Promise.resolve({ data: { success: true, id: "id1" } }))
    Axios.put.mockImplementationOnce(putMock)
    const dispatch = jest.fn()
    const entityData = { type: 0, value: "charles.mst@gmail.com" }
    const personId = "person1"
    await updateContact(dispatch, personId, "id1", entityData)
    expect(putMock).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenNthCalledWith(1, { type: 'SAVE_PERSON_START' })
    expect(dispatch).toHaveBeenNthCalledWith(2, { type: 'SAVE_CONTACT_SUCCESS_UPDATE', personId, contact: { ...entityData, id: "id1" } })
    expect(dispatch).toHaveBeenCalledTimes(2)
    done()
})


it('should delete contact to api', async (done) => {
    const deleteMock = jest.fn().mockReturnValueOnce(Promise.resolve({ data: { success: true, id: "id1" } }))
    Axios.delete.mockImplementationOnce(deleteMock)
    const dispatch = jest.fn()
    const personId = "person1"
    const id = "id1"
    await deleteContact(dispatch, personId, id)
    expect(deleteMock).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenNthCalledWith(1, { type: 'SAVE_PERSON_START' })
    expect(dispatch).toHaveBeenNthCalledWith(2, { type: 'SAVE_CONTACT_SUCCESS_DELETE', personId, id })
    expect(dispatch).toHaveBeenCalledTimes(2)
    done()
})