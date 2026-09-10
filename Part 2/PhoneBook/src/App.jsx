import { use, useState } from 'react'
import Filter from './Filter'
import Phonebook from './PhoneBook'
import InputForm from './InputForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '781-917-5337' }
  ]) 
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