import { useEffect, useState } from "react"
import apiCalls from './APICalls'


const Results=({search})=>{
    const [singleCountry, setSingleCountry]=useState(false)
    const [list, setList]=useState([])
    const countriesToShow=list.filter(name=>name.includes(search))
    if(countriesToShow.length===1){

    }

    useEffect(()=>{
        apiCalls
        .getAll()
        .then((response)=>{
            const namelist=response.map((country)=>country.name.common)
            setList(namelist)
        })
   
    },[])


    // useEffect(()=>{
    //     if(search!==''){
    //         apiCalls
    //         .getSpecific(search)
    //         .then(response=>{
    //             setResults(Countries.map((response)=>response.name))
    //         })
    //     }
    // },[search])

    return(
        <div>
            <ul>
            {countriesToShow.map((entry)=>
                <li key={entry}>
                    {entry}
                </li>
            )}
            </ul>
        </div>
    )
}

export default Results