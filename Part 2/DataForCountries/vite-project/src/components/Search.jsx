import { useState } from "react"

const Search=({search, setSearch})=>{

    const handleSearch=(event)=>{

        setSearch(event.target.value)
    }

    return(
        <div>
            Find Countries: <input value={search} onChange={handleSearch}/>
        </div>
    )
}
export default Search