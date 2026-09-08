import LeagueList from '@/features/leagues/components/LeagueList'
import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    
    <>
      <LeagueList/>
      
    </>
  )
}

export default App
