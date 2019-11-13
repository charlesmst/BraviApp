import React from 'react'
import * as PeopleState from '../components/PeopleState'
export default function PersonList() {
    const [state, dispatch] = React.useReducer(PeopleState.reducer, {  });
    React.useEffect(()=>{
        PeopleState.loadPeople(dispatch)
    },[])
    return (<React.Fragment>
        <center><h1>Contact List</h1></center>
        <form>
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Type to search" />
            </div>
        </form>
        <pre>
            {JSON.stringify(state,null,4)}
        </pre>

    </React.Fragment>)
}