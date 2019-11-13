import React from 'react'
import { useStateValue } from '../components/StateProvider';
import { loadPeople, addPerson } from '../components/PeopleState';
export default function PersonList() {
    const [state, dispatch] = useStateValue();
    React.useEffect(() => {
        loadPeople(dispatch)
    }, [])
    return (<React.Fragment>
        <center><h1>Contact List</h1></center>
        <form>
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Type to search" />
            </div>
        </form>
        <pre>
            {JSON.stringify(state, null, 4)}
        </pre>
        <button onClick={()=>addPerson(dispatch,{name:"Charles 2"})}> Add Person</button>

    </React.Fragment>)
}