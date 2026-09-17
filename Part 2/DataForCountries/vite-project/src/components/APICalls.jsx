import axios from 'axios'
const baseUrl='https://studies.cs.helsinki.fi/restcountries/api/'
const weatherUrl='https://api.openweathermap.org/data/4.0/onecall/current?lat={lat}&lon={lon}&appid={API key}'
const api_key = import.meta.env.VITE_SOME_KEY
{console.log('api key is ',api_key)}

const getAll = () => {
  const request = axios.get(`${baseUrl}all`)
  console.log(`request is all`,request)
  return request.then(response => response.data)
}

const getSpecific = (name) => {
  const request = axios.get(`${baseUrl}name/${name}`)
  console.log(`request is specific`,request)
  return request.then(response => response.data)
}

const getWeather=(lat, lon)=>{
  const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
  return request.then(response => response.data)
}

// const create = newObject => {
//   const request = axios.post(baseUrl, newObject)
//   return request.then(response => response.data)
// }

// const update = (id, newObject) => {
//   const request = axios.put(`${baseUrl}/${id}`, newObject)
//   return request.then(response => response.data)
// }

// const removeEntry = (id) => {
//   const request = axios.delete(`${baseUrl}/${id}`)
//   return request.then(response => response.data)
// }

export default {getAll, getSpecific, getWeather}