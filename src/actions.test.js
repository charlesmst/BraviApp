
import Axios, { filterApiErrorMessage } from './Axios'
jest.mock('./Axios')
import { loadPeople, addPerson, updatePerson, deletePerson, addContact, updateContact, deleteContact } from "./actions";
const fakePeopleData = [
    {
        id: "id1",
        name: "Charles",
        contacts: [
            { id: "contact2", type: 0, value: "55999999999" }
        ]
    }
]

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


it('should add contact to api', async (done) => {
    const postMock = jest.fn().mockReturnValueOnce(Promise.resolve({ data: { success: true, id: "id1" } }))
    Axios.post.mockImplementationOnce(postMock)
    const dispatch = jest.fn()
    const entityData = { type: 0, value: "charles.mst@gmail.com" }
    const personId = "person1"
    await addContact(dispatch, personId, entityData)
    expect(postMock).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenNthCalledWith(1, { type: 'SAVE_CONTACT_START' })
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
    expect(dispatch).toHaveBeenNthCalledWith(1, { type: 'SAVE_CONTACT_START' })
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
    expect(dispatch).toHaveBeenNthCalledWith(1, { type: 'SAVE_CONTACT_START' })
    expect(dispatch).toHaveBeenNthCalledWith(2, { type: 'SAVE_CONTACT_SUCCESS_DELETE', personId, contactId: id })
    expect(dispatch).toHaveBeenCalledTimes(2)
    done()
})