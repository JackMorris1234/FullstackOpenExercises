import { useEffect, useState } from "react"
import apiCalls from './APICalls'


const Results=({search, setSearch})=>{
    const [singleCountry, setSingleCountry]=useState(false)
    const [list, setList]=useState([])
    const countriesToShow=list.filter((country)=>country.name.common.includes(search))
    const [weather, setWeather]=useState([])
    // if(countriesToShow.length===1){
    //     setSingleCountry(true)
    // }else if(setSingleCountry!=false){
    //     setSingleCountry(false)
    // }

    // if(countriesToShow>10){
        
    // }

    const handleShow=(nameOfCountry)=>{
        setSearch(nameOfCountry)
    }

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
        {console.log('weather', weather)}
    },[search])

    useEffect(()=>{
        if(singleCountry){
            const lat=countriesToShow[0].latlng[0]
            const lon=countriesToShow[0].latlng[1]
            console.log('lat lon', lat, lon)
            apiCalls
            .getWeather(lat, lon)
            .then(response=>setWeather(response))
        }
    },[singleCountry])



    if(!singleCountry && countriesToShow.length<10){
        return(
        <div>
            <ul>
            {countriesToShow.map((entry)=>
                <li key={entry.name.common}>
                    {entry.name.common}
                    <button onClick={()=>handleShow(entry.name.common)}>Show</button>
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
                <p>Capital {countriesToShow[0].capital[0]}</p>

                <p>Area {countriesToShow[0].area}</p>
                <h1>Languages</h1>
                <ul>
                    {Object.values(countriesToShow[0].languages).map(value=><li key={value}>{value}</li>)}
                </ul>
                <h1>{countriesToShow[0].flag}</h1>
                <h1>Weather in {countriesToShow[0].capital[0]}</h1>
                {console.log('weather', weather)}
                
                
              
                <p>Tempurature: {weather.main.temp} Kelvin</p>
                <p>{weather.weather.icon}</p>
                <p>Wind Speed: {weather.wind.speed} metre/sec</p> 
                
            </div>
            
        )
    }
    
}

export default Results