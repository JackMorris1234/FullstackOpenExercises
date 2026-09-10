const Phonebook=({namesToShow})=>{



    return(
    <ul>{namesToShow.map((person)=><li key={person.name}>{person.name} {person.phone}</li>)}</ul>
    )
}
export default Phonebook