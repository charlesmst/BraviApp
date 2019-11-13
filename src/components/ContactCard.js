import React from 'react'
import { ContactType } from '../enums'

export default function ContactCard({ contact: { type, value }, onClick }) {
    return (
        <div className="card card-list card-list-clickable" onClick={onClick}>
            <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted">{ContactType[type] || "Unknown"}</h6>
                <h6 className="card-subtitle mb-2 text-muted">{value}</h6>

            </div>
        </div>

    )
}