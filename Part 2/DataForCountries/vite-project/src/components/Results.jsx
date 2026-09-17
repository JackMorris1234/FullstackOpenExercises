import { useEffect, useState } from "react"
import apiCalls from './APICalls'


const Results=({search})=>{
    const [singleCountry, setSingleCountry]=useState(false)
    const [list, setList]=useState([])
    const countriesToShow=list.filter((country)=>country.name.common.includes(search))
    // if(countriesToShow.length===1){
    //     setSingleCountry(true)
    // }else if(setSingleCountry!=false){
    //     setSingleCountry(false)
    // }

    // if(countriesToShow>10){
        
    // }

    useEffect(()=>{
        apiCalls
        .getAll()
        .then((response)=>{
            const namelist=response//.map((country)=>country.name.common)
            console.log('this is the namelist', namelist)
            setList(namelist)
        })
   
    },[])


    useEffect(()=>{
        if(search!==''){
            if(countriesToShow.length===1 &&singleCountry==false){
                setSingleCountry(true)
            }else if(countriesToShow.length!==1 &&singleCountry==true){
                setSingleCountry(false)
            }
        }
    },[search])



    if(!singleCountry && countriesToShow.length<10){
        return(
        <div>
            <ul>
            {countriesToShow.map((entry)=>
                <li key={entry.name.common}>
                    {entry.name.common}
                </li>
            )}
            </ul>
        </div>
    )
    }
    if(!singleCountry &&countriesToShow.length>10){
        return(
        <div>
            <p>Too many matches, specify another filter</p>
        </div>)
    }
    if(singleCountry){
        console.log('single country')
        return(
            <div>
                <h1>{countriesToShow[0].name.common}</h1>
                <p1>Capital {countriesToShow[0].capital[0]}</p1>
                <p1>Area {countriesToShow[0].area}</p1>
                <h1>Languages</h1>
                <ul>
                    {Object.values(countriesToShow[0].languages).map(value=><li key={value}>{value}</li>)}
                </ul>
                <h1>{countriesToShow[0].flag}</h1>
                
            </div>
            
        )
    }
    
}

export default Results