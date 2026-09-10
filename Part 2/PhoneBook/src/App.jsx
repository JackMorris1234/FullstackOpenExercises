import { use, useState } from 'react'
import Filter from './Filter'
import Phonebook from './PhoneBook'
import InputForm from './InputForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '781-917-5337' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone]=useState('')
  const [showAll, setShowAll]=useState(true)
  const [filter, setFilter]=useState('')

  const namesToShow=showAll
    ? persons
    :persons.filter(person=>person.name.includes(filter))

  const handleInput=(event)=>{
    setNewName(event.target.value)
  }
  const handlePhoneInput=(event)=>{
    setNewPhone(event.target.value)
  }

  const handleFilterChange=(event)=>{
    const filter=event.target.value
    if(filter!==''){
      setShowAll(false)
    }else{
      setShowAll(true)
    }
    setFilter(event.target.value)
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter input={filter} change={handleFilterChange}/>
      <h2>Add New</h2>
      <InputForm submit={addName} newName={newName} handleInput={handleInput} newPhone={newPhone} handlePhoneInput={handlePhoneInput}/>
      <h2>Numbers</h2>
      <Phonebook namesToShow={namesToShow}/>
      
    </div>
  )
}

export default App