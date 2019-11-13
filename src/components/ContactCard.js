import React from 'react'
import { ContactType } from '../enums'

export default function ContactCard({ contact: { type, value }, onClick }) {
    return (
        <div class="card" onClick={onClick}>
            <div class="card-body">
                <h6 class="card-subtitle mb-2 text-muted">{ContactType[type] || "Unknown"}</h6>
                <h6 class="card-subtitle mb-2 text-muted">{value}</h6>

            </div>
        </div>

    )
}