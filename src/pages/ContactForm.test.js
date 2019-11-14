import { cleanup, render, fireEvent, queryByAttribute } from "@testing-library/react";
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { StateProvider } from "../components/StateProvider";
import ContactForm from "./ContactForm";
import { updateContact } from "../actions";
jest.mock('../actions')

afterEach(cleanup)
function renderPersonWithState(state, { props }) {
    const reducer = jest.fn()
    props = props || {}
    const history = createMemoryHistory()
    return render(<Router history={history}>
        <StateProvider reducer={reducer} initialState={state} >
            <ContactForm {...props} />
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
                    {
                        id: "id1", name: "Charles", contacts: [
                            { id: "contact1", value: "charles.mst@gmail.com", type: 1 }
                        ]
                    }
                ],
                loading: false
            }} >
                <ContactForm.WrappedComponent personId={"id1"} match={{ params: { id: "contact1" } }} history={{ replace: jest.fn() }} />
            </StateProvider>
        </Router>
    );
    expect((await wrapper.getByPlaceholderText("E-mail")).value).toEqual("charles.mst@gmail.com")

})


it('should save form edit', async () => {
    const reducer = jest.fn()
    const history = createMemoryHistory()
    const mock = jest.fn()
    updateContact.mockImplementationOnce(mock);
    const wrapper = render(
        <Router history={history}>

            <StateProvider reducer={reducer} initialState={{
                data: [
                    {
                        id: "id1", name: "Charles", contacts: [
                            { id: "contact1", value: "charles.mst@gmail.com", type: 1 }
                        ]
                    }
                ],
                loading: false
            }} >
                <ContactForm.WrappedComponent personId={"id1"} match={{ params: { id: "contact1" } }} history={{ replace: jest.fn() }} />
            </StateProvider>
        </Router>
    );
    const emailInput = await wrapper.getByPlaceholderText("E-mail");
    expect(emailInput).not.toBe(null)
    await fireEvent.change(emailInput, { target: { value: "charles1@gmail.com" } })
    await fireEvent.click(await wrapper.getByTitle("Save Contact"));
    expect(mock).toHaveBeenCalledWith(expect.any(Function), "id1", "contact1", { type: 1, value: "charles1@gmail.com" });
})



it('should ask confirmation to delete', async () => {
    const reducer = jest.fn()
    const history = createMemoryHistory()
    const mock = jest.fn()
    updateContact.mockImplementationOnce(mock);
    const wrapper = render(
        <Router history={history}>

            <StateProvider reducer={reducer} initialState={{
                data: [
                    {
                        id: "id1", name: "Charles", contacts: [
                            { id: "contact1", value: "charles.mst@gmail.com", type: 1 }
                        ]
                    }
                ],
                loading: false
            }} >
                <ContactForm.WrappedComponent personId={"id1"} match={{ params: { id: "contact1" } }} history={{ replace: jest.fn() }} />
            </StateProvider>
        </Router>
    );

    const deleteButton = await wrapper.getByText("Delete")
    await fireEvent.click(deleteButton)
    expect(await wrapper.getByText("Confirm Delete")).not.toBe(null)
})