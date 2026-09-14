
const Phonebook=({showAll, persons, filter})=>{
    const namesToShow=showAll
    ? persons
    :persons.filter(person=>person.name.includes(filter))


    return(
    <ul>{namesToShow.map((person)=><li key={person.name}>{person.name} {person.number}</li>)}</ul>
    )
}
export default Phonebook