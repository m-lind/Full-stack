import React from 'react'

const Person = ({ person, handleClick }) => {
    return (
        <div>
            {person.name} {person.phonenumber} <button onClick={() => handleClick(person)}>delete</button>
        </div>
    )
}

export default Person;