import React from 'react'
import './NewItemCard.css'
export default function NewItemCard({ title, onClick }) {
    return (
        <div className="card card-list card-list-clickable NewItemCard-card" onClick={onClick}>
            <div className="card-body card-add">
                <center>
                    <i className={"fa fa-plus"} /> {title}
                </center>

            </div>
        </div>

    )
}