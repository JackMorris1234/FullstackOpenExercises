import frontendToBackend from './BackendCommunication'

const Phonebook=({showAll, persons, filter, setPersons})=>{
    const namesToShow=showAll
    ? persons
    :persons.filter(person=>person.name.includes(filter))

    const handleDelete=(id, name)=>{
        if(window.confirm(`Do you wish to delete ${name}'s entry?`)){
            frontendToBackend.removeEntry(id)
            .then(setPersons(persons.filter(person=>person.id!==id)))
        }
    }


    return(
    <ul>
        {namesToShow.map((person)=>
        <li key={person.name}>
        {person.name} {person.number}
        <button onClick={()=>handleDelete(person.id, person.name)}>
        Delete
        </button>
        </li>)}
        

    </ul>
    
    )
}
export default Phonebook