import React from 'react'

export default function Contact({person:{name, birthDate, contacts}}){
    return (
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">{name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{birthDate}</h6>
                
            </div>
        </div>
        
      )
}