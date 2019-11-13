import _ from 'lodash';
import React from 'react';
import { Link, withRouter, Route } from "react-router-dom";
import EmptyCard from '../components/EmptyCard';
import ErrorCard from '../components/ErrorCard';
import LoadingCard from '../components/LoadingCard';
import { loadPeople } from '../components/PeopleState';
import PersonCard from '../components/PersonCard';
import { useStateValue } from '../components/StateProvider';
import PersonForm from './PersonForm';

function PersonList({ history }) {

    const [state, dispatch] = useStateValue();
    React.useEffect(() => {
        loadPeople(dispatch)
    }, [dispatch])
    const redirectToAdd = () => history.push("/add")

    return (<React.Fragment>
        <center><h1>Contact List</h1></center>
        <form>
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Type to search" />
            </div>
        </form>
        <LoadingCard loading={state.loading} />
        {state.error && <ErrorCard message={state.error} tryAgain={() => loadPeople(dispatch)}></ErrorCard>}
        {!state.error && !state.loading && _.get(state, "data", []).length === 0 && <EmptyCard message={"No person was registered here"} add={redirectToAdd} />}
        {_.get(state, "data", []).map(x => <PersonCard key={x.id} person={x} onClick={()=>history.push(`/edit/${x.id}`)} />)}

        <Link to={"/add"}>Add Person</Link>
        <Route path={"/add"} component={PersonForm} />
        <Route path={"/edit/:id"} component={PersonForm} />
        <pre>
            {JSON.stringify(state, null, 4)}
        </pre>
    </React.Fragment>)
}
export default withRouter(PersonList)