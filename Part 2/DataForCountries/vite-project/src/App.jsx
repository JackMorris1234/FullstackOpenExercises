import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Search from './components/Search'
import Results from './components/Results'

function App() {
  const [search, setSearch]=useState('')
  console.log(`her ebe search`,search)
  

  return (
    <>
      <div>
        <Search search={search} setSearch={setSearch}/>
        <Results search={search}/>
      </div>
    </>
  )
}

export default App
