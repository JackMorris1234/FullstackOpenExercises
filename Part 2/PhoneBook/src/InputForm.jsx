import { useState } from "react"

const InputForm=({setPersons, persons})=>{
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone]= useState('')
    const handleInput=(event)=>{
        setNewName(event.target.value)
    }
    const handlePhoneInput=(event)=>{
        setNewPhone(event.target.value)
    }

    const addName=(event)=>{
        event.preventDefault()
        const newPerson={
            name: newName,
            phone: newPhone
        }
        const names=persons.map((person)=>person.name)
        if (names.indexOf(newPerson.name)==-1){
            setPersons(persons.concat(newPerson))
            setNewName('')
            setNewPhone('')
        }else{
            alert('${newName} is already part of the phonebook.')
        }
    
    }


    return(
        <form onSubmit={addName}>
            <div>name: <input value={newName} onChange={handleInput}/></div>
            <div>phone: <input value={newPhone} onChange={handlePhoneInput}/></div>
            <div><button type="submit">add</button></div>
        </form>
    )
}
export default InputForm