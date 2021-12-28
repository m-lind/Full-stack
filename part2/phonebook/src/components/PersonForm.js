const PersonForm = ({ addPerson, newName, handlePhonebookChange, newNumber, handlePhoneNumberChange }) => {
    
    return (
        <form onSubmit={addPerson}>
            <div>
                name: 
                <input 
                    value={newName} 
                    onChange={handlePhonebookChange}
                />
            </div>
            <div>
                number:
                <input
                    value={newNumber}
                    onChange={handlePhoneNumberChange}
                />          
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm;