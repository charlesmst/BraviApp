
import Axios,{filterApiErrorMessage} from '../Axios'
jest.mock('../Axios')
import { reducer, loadPeople } from "./PeopleState";
const fakePeopleData = [
    {
        name: "Charles"
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
    filterApiErrorMessage.mockImplementationOnce(()=>errorMessage)
    const dispatch = jest.fn()
    await loadPeople(dispatch)
    expect(dispatch).toHaveBeenNthCalledWith(1, { type: 'FETCH_PEOPLE_START' })
    expect(dispatch).toHaveBeenNthCalledWith(2, { type: 'FETCH_PEOPLE_ERROR', error: errorMessage })
    expect(dispatch).toHaveBeenCalledTimes(2)
    done()
})