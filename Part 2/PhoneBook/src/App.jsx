import { use, useState, useEffect } from 'react'
import Filter from './Filter'
import Phonebook from './PhoneBook'
import InputForm from './InputForm'
import axios from 'axios'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '781-917-5337' }
  ])


  useEffect(()=>{

    const eventHandler = response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    }

    axios
      .get('http://localhost:3001/persons')
      .then(eventHandler)
  },[])
 
  const [showAll, setShowAll]=useState(true)
  const [filter, setFilter]=useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setShowAll={setShowAll} setFilter={setFilter} filter={filter}/>
      <h2>Add New</h2>
      <InputForm setPersons={setPersons} persons={persons}/>
      <h2>Numbers</h2>
      <Phonebook showAll={showAll} persons={persons} filter={filter}/>
      
    </div>
  )
}

export default App