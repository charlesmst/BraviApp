import { cleanup, render, fireEvent, waitForElement, findByTitle, waitForElementToBeRemoved, getByText, getAllByText } from "@testing-library/react";
import React from 'react';
import { MemoryRouter } from 'react-router';
import { StateProvider } from "../components/StateProvider";
import PersonList from "./PersonList";
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { loadPeople } from "../actions";
jest.mock('../actions')

afterEach(cleanup)
function renderPersonWithState(state) {
    const reducer = jest.fn()

    const history = createMemoryHistory()
    return render(<Router history={history}>
        <StateProvider reducer={reducer} initialState={state} >
            <PersonList />
        </StateProvider>
    </Router>);
}


it('should load', async () => {
    renderPersonWithState({})
})

it('should show empty message when loaded and has no data', () => {

    const { getByText } = renderPersonWithState({ data: [], loading: false })
    getByText("No person was registered here")

})


it('should show filter not found message when filter is empty', async () => {
    const wrapper = renderPersonWithState({ data: [{ name: "Charles" }], loading: false })
    const buttonSearch = await wrapper.findByTitle("Click to search")
    expect(buttonSearch).not.toBe(null);

    await fireEvent.click(buttonSearch)
    const inputElement = await wrapper.getByPlaceholderText("Type to search")

    expect(inputElement).not.toBe(null);

    fireEvent.change(inputElement, { target: { value: "No exist" } })

    const errorWarning = await wrapper.getByText("No person found for 'No exist'")
    expect(errorWarning).not.toBe(null);

})


it('should to filter data based on text searching', async () => {
    const wrapper = renderPersonWithState({
        data: [
            { name: "Charles" },
            { name: "João" },
            { name: "Ivete" }
        ], loading: false
    })
    const buttonSearch = await wrapper.findByTitle("Click to search")
    expect(buttonSearch).not.toBe(null);

    await fireEvent.click(buttonSearch)
    const inputElement = await wrapper.getByPlaceholderText("Type to search")

    expect(inputElement).not.toBe(null);

    fireEvent.change(inputElement, { target: { value: "Char" } })
    expect(wrapper.getAllByText("Charles")).toHaveLength(1)
    expect(wrapper.queryAllByText("João")).toHaveLength(0)
    expect(wrapper.queryAllByText("Ivete")).toHaveLength(0)
})



it('should open add form on click add', async () => {
    const wrapper = renderPersonWithState({
        data: [
        ], loading: false
    })
    const buttonSearch = await wrapper.findByText("Add Person")
    expect(buttonSearch).not.toBe(null);

    await fireEvent.click(buttonSearch)


    expect(await wrapper.getByText("New Person")).not.toBe(null);

})


it('should open edit form on click item', async () => {
    const wrapper = renderPersonWithState({
        data: [
            { name: "Charles", "id": "id1" },
            { name: "Charles2", "id": "id2" },
        ], loading: false
    })
    const buttonSearch = await wrapper.findByText("Charles2")
    expect(buttonSearch).not.toBe(null);

    await fireEvent.click(buttonSearch)

    expect(await wrapper.getByText("Edit Person")).not.toBe(null);

})



it('should load data when open', async () => {
    const mock = jest.fn()
    loadPeople.mockImplementationOnce(mock);
    renderPersonWithState({})
    expect(mock).toHaveBeenCalledTimes(1);
})




it('should show loading', async () => {
    const wrapper = renderPersonWithState({loading:true})
    expect(await wrapper.getByText("Loading...")).not.toBe(null);
})
