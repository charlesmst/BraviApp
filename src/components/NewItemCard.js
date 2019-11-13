import React from 'react'

export default function NewItemCard({ title, onClick }) {
    return (
        <div class="card" onClick={onClick}>
            <div class="card-body">
                <center>
                    <i className={"fa fa-plus"} /> {title}
                </center>

            </div>
        </div>

    )
}