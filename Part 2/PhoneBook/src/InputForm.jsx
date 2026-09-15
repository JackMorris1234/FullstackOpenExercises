import { useState } from "react"
import frontEndToBack from './BackendCommunication'
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
            number: newPhone
        }
        const names=persons.map((person)=>person.name)
        const indexOfNew=names.indexOf(newPerson.name)
        if (indexOfNew==-1){
            frontEndToBack.create(newPerson)
            .then((returnedPerson)=>setPersons(persons.concat(returnedPerson)))
            setNewName('')
            setNewPhone('')
        }else{

            if(window.confirm(`${newName} is already part of the phonebook, do you wish to change their number?`)){
                frontEndToBack.update(persons[indexOfNew].id, newPerson)
            }
            

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