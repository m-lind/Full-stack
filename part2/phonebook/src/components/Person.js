import React from 'react'

const Person = ({ person, handleClick }) => {
    return (
        <div>
            {person.name} {person.number} <button onClick={() => handleClick(person)}>delete</button>
        </div>
    )
}

export default Person;