import React from 'react'
import ContactCard from './ContactCard'
import NewItemCard from './NewItemCard'

export default function ContactList({ contacts, onAdd, onEdit }) {
    return (
        <React.Fragment>
            {/* <pre>{JSON.stringify(contacts, null, 4)}</pre> */}
            {(contacts || []).map(x => <ContactCard contact={x} key={x.id} onClick={() => onEdit(x.id)} />)}
            <NewItemCard onClick={() => onAdd()} title={"Add Contact"} />
        </React.Fragment>
    )
}
