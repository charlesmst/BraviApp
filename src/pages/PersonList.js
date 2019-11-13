import _ from 'lodash';
import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { Route, withRouter } from "react-router-dom";
import { loadPeople } from '../actions';
import EmptyCard from '../components/EmptyCard';
import ErrorCard from '../components/ErrorCard';
import LoadingCard from '../components/LoadingCard';
import NewItemCard from '../components/NewItemCard';
import PersonCard from '../components/PersonCard';
import { useStateValue } from '../components/StateProvider';
import PersonForm from './PersonForm';
import SearchBar from '../components/SearchBar';

function PersonList({ history }) {

    const [state, dispatch] = useStateValue();
    const [search, setSearch] = useState("")
    const [searching, setSearching] = useState(false)
    React.useEffect(() => {
        loadPeople(dispatch)
    }, [dispatch])

    React.useEffect(() => {
        setSearch("")
        setSearching(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.data ? state.data.length : 0])

    const redirectToAdd = () => history.push("/add")
    const filterPerson = x => !search || (x.name.toUpperCase() + _.get(x, "contacts", []).map(x => x.value.toUpperCase()).join(" ")).indexOf(search.toUpperCase()) !== -1
    const filteredData = _.get(state, "data", []).filter(filterPerson)
    const filterMessage = filteredData.length === 0 && search ? `No person found for '${search}'` : 'No person was registered here'

    return (<React.Fragment>
        <SearchBar search={search} setSearch={setSearch} searching={searching} setSearching={setSearching} />
        <div className={"app-container margin-header"}>

            <LoadingCard loading={state.loading} />
            {state.error && <ErrorCard message={state.error} tryAgain={() => loadPeople(dispatch)}></ErrorCard>}
            {!state.error && !state.loading && filteredData.length === 0 && <EmptyCard message={filterMessage} add={redirectToAdd} />}
            {filteredData.map(x => <PersonCard key={x.id} person={x} onClick={() => history.push(`/edit/${x.id}`)} />)}

            <NewItemCard onClick={redirectToAdd} title={"Add Person"} />

            <Route path={"/add"} >
                <PersonForm />
            </Route>
            <Route path={"/edit/:id"}>
                <PersonForm />
            </Route>
        </div>

    </React.Fragment >)
}
export default withRouter(PersonList)