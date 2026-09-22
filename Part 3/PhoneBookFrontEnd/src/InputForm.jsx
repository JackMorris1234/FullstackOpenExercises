import { useState } from "react"
import frontEndToBack from './BackendCommunication'
const InputForm=({setPersons, persons, setSuccessMessage, setErrorMessage})=>{

    //states
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone]= useState('')
    //handlers
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
            .then((returnedPerson)=>{
                setPersons(persons.concat(returnedPerson))
                setSuccessMessage(`Added ${newName} with phone ${newPhone}`)
                    setTimeout(()=>{
                     setSuccessMessage(null)
                    }, 5000)
            })

            //.then((returned)=>console.log('creation',returned))
            setNewName('')
            setNewPhone('')
        }else{

            if(window.confirm(`${newName} is already part of the phonebook, do you wish to change their number?`)){
                frontEndToBack
                .update(persons[indexOfNew].id, newPerson)
                .then((returnedPerson)=>{
                    setPersons(persons.map((person)=>person.id!==returnedPerson.id ? person :returnedPerson))
                    setSuccessMessage(`Changed number of ${newName} to ${newPhone}`)
                    setTimeout(()=>{
                        setSuccessMessage(null)
                    }, 5000)
                })
                .catch(error=>{
                    setErrorMessage(`Information of ${newName} has already been removed from the server.`)
                    console.log(error)
                    setTimeout(()=>{
                        setErrorMessage(null)
                    }, 5000)
                })
                //.then((returned)=>console.log('numberchange',returned))
                setNewName('')
                setNewPhone('')

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