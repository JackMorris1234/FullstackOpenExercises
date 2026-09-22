import { use, useState, useEffect } from 'react'
import Filter from './Filter'
import Phonebook from './PhoneBook'
import InputForm from './InputForm'
import axios from 'axios'
import frontendToBack from './BackendCommunication'
import Notification from './Notification'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '781-917-5337' }
  ])
  const [showAll, setShowAll]=useState(true)
  const [filter, setFilter]=useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(()=>{
    const eventHandler = response => {
      console.log('promise fulfilled')
      setPersons(response)
    }

    frontendToBack
      .getAll()
      .then(eventHandler)
  },[])
 
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} looks='error'/>
      <Notification message={successMessage} looks='success'/>
      <Filter setShowAll={setShowAll} setFilter={setFilter} filter={filter}/>
      <h2>Add New</h2>
      <InputForm setPersons={setPersons} persons={persons} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage}/>
      <h2>Numbers</h2>
      <Phonebook showAll={showAll} persons={persons} filter={filter} setPersons={setPersons}/>
      
    </div>
  )
}

export default App