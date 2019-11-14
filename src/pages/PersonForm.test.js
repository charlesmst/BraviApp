import { cleanup, fireEvent, render } from "@testing-library/react";
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { StateProvider } from "../components/StateProvider";
import PersonForm from "./PersonForm";
jest.mock('../actions')

afterEach(cleanup)
function renderPersonWithState(state, { props }) {
    const reducer = jest.fn()
    props = props || {}
    const history = createMemoryHistory()
    return render(<Router history={history}>
        <StateProvider reducer={reducer} initialState={state} >
            <PersonForm {...props} />
        </StateProvider>
    </Router>);
}


it('should load', async () => {
    renderPersonWithState({}, {})
})


it('should load form from state', async () => {
    const reducer = jest.fn()
    const history = createMemoryHistory()

    const wrapper = render(
        <Router history={history}>

            <StateProvider reducer={reducer} initialState={{
                data: [
                    { id: "id1", name: "Charles" }
                ],
                loading: false
            }} >
                <PersonForm.WrappedComponent match={{ params: { id: "id1" } }} history={{}} />
            </StateProvider>
        </Router>
    );
    expect((await wrapper.getByPlaceholderText("Name")).value).toEqual("Charles")

})


it('should redirect when not found', async () => {
    const reducer = jest.fn()
    const history = createMemoryHistory()
    const historyMock = jest.fn()
    const historyFake = { replace: historyMock }
    render(
        <Router history={history}>

            <StateProvider reducer={reducer} initialState={{
                data: [
                    { id: "id1", name: "Charles" }
                ],
                loading: false
            }} >
                <PersonForm.WrappedComponent match={{ params: { id: "id2" } }} history={historyFake} />
            </StateProvider>
        </Router>
    );
    expect(historyMock).toHaveBeenCalledWith("/")

})

it('should ask confirmation to delete', async () => {
    const reducer = jest.fn()
    const history = createMemoryHistory()
    const wrapper = render(
        <Router history={history}>

            <StateProvider reducer={reducer} initialState={{
                data: [
                    { id: "id1", name: "Charles" }
                ],
                loading: false
            }} >
                <PersonForm.WrappedComponent match={{ params: { id: "id1" } }} history={history} />
            </StateProvider>
        </Router>
    )
    const deleteButton = await wrapper.getByText("Delete")
    await fireEvent.click(deleteButton)
    expect(await wrapper.getByText("Confirm Delete")).not.toBe(null)
})