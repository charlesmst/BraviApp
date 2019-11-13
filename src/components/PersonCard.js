import React from 'react'
import { ContactTypeDescription } from '../enums'
import _ from 'lodash'
function ContactItem({ type, value }) {
    const typeDescription = ContactTypeDescription[type]
    const href = typeDescription.href(value)
    return (<h6 className="card-subtitle mb-2 text-muted">
        <a href={href} className={"link-contact"} onClick={e => e.stopPropagation()} title={_.get(typeDescription, "hrefMessage", "")}>
            <i className={_.get(typeDescription, "icon", "fa fa-question")}></i> {value}
        </a>
    </h6>)
}
export default function PersonCard({ person: { name, contacts }, onClick }) {

    return (
        <div className="card card-list card-list-clickable" onClick={onClick}>
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                {(contacts || []).map(contact => (
                    <ContactItem {...contact} />
                ))}

                {_.isEmpty(contacts) && <h6 className="card-subtitle mb-2 text-muted">No contacts</h6>}
            </div>
        </div>

    )
}