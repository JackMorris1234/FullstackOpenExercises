import { useState } from "react"



const Filter=({setShowAll, setFilter, filter})=>{


    const handleFilterChange=(event)=>{
        const filter=event.target.value
        if(filter!==''){
            setShowAll(false)
        }else{
            setShowAll(true)
        }
        setFilter(event.target.value)
    }

    return(
        <div>
            <p>Filter Shown With: <input value={filter} onChange={handleFilterChange}/></p>
        </div>
    )
}
export default Filter