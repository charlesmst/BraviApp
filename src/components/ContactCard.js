import _ from 'lodash'
import React from 'react'
import { ContactTypeDescription } from '../enums'

export default function ContactCard({ contact: { type, value }, onClick }) {
    const typeDescription = ContactTypeDescription[type]
    const format = typeDescription.format || (v => v)
    return (
        <div className="card card-list card-list-clickable" onClick={onClick}>
            <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted"> <i className={_.get(typeDescription, "icon", "fa fa-question")}></i> {_.get(typeDescription, "description", "Unknown")}</h6>
                <h6 className="card-subtitle mb-2 text-muted">{format(value)}</h6>

            </div>
        </div>

    )
}