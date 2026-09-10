const Filter=({filter, change})=>{
    return(
        <div>
            <p>Filter Shown With: <input value={filter} onChange={change}/></p>
        </div>
    )
}
export default Filter