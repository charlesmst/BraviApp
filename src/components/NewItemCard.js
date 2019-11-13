import React from 'react'

export default function NewItemCard({ title, onClick }) {
    return (
        <div className="card card-list card-list-clickable" onClick={onClick}>
            <div className="card-body card-add">
                <center>
                    <i className={"fa fa-plus"} /> {title}
                </center>

            </div>
        </div>

    )
}