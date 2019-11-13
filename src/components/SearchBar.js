
import React from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap';
import './SearchBar.css'
export default function SearchBar({ searching, setSearching, search, setSearch }) {

    const startSearching = () => setSearching(true)
    const stopSearching = () => {
        setSearching(false)
        setSearch("")
    }
    return (<header className="SearchBar-header">
        <h1 className="SearchBar-title">

            <div className={"app-container SearchBar-header-container"}>
                <div className={"SearchBar-header-search-bar " + (searching ? "SearchBar-header-active" : "")}>
                    <Form.Group controlId="search">

                        <InputGroup>

                            <Form.Control
                                type="text"
                                placeholder="Type to search" value={search} onChange={e => setSearch(e.target.value)}
                            />
                            <InputGroup.Append className={"SearchBar-brn-cancel-filter"} onClick={stopSearching} >
                                <InputGroup.Text  ><i className={"fa fa-remove"}></i></InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                </div>
            </div>
            <div className={"app-container SearchBar-header-search"}>
                Contact List
                        <Button title={"Click to search"} variant="link" onClick={startSearching}><i className={"fa fa-search"}></i></Button>
            </div>

        </h1>
    </header>)
}