import React from 'react'

export default function PersonCard({ person: { name, contacts } ,onClick}) {
    return (
        <div class="card" onClick={onClick}>
            <div class="card-body">
                <h5 class="card-title">{name}</h5>
                {(contacts || []).map(contact => (
                    <h6 class="card-subtitle mb-2 text-muted">{contact.value}</h6>
                ))}

                {!contacts && <h6 class="card-subtitle mb-2 text-muted">No contacts</h6>}
            </div>
        </div>

    )
}