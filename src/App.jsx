import LeagueList from '@/features/leagues/components/LeagueList'
import { useState } from 'react'
import { useLeagues } from '@/features/leagues/hooks'
import './App.css'


function App() {
  const [count, setCount] = useState(0);
  const {leagues,status} = useLeagues();
  const {isLeaguePanelOpen,setIsLeaguePanelOpen}=useState(false);
  return (
    
    <>

      <header className="app-header"> 
        <h1> SportStats</h1>
        <p>Estadísticas deportivas en un solo lugar</p>
      </header>
      
      
      <main className="app-main">
        <section className="dashboard-grid" aria-label="Panel deportivo">
          <article className="dashboard-card">
            <h2>Deportes</h2>
            <p>Seleccion el deporte</p>
          </article>

          <article className="dashboard-card">
            <h2>Ligas de futbol</h2>
            <p>Explora las principales ligas y sus equipos</p>
            <button
              type="button"
              onClick={()=>setIsLeaguePanelOpen(!isLeaguePanelOpen)}>
                {isLeaguePanelOpen ? 'Ocultar ligas' : 'Explorar ligas'}
            </button>
            <LeagueList leagues={leagues} status={status}/>
          </article>

          <article className="dashboard-card">
            <h2>Equipos de futbol</h2>
            <p>Explora los principales equipos y sus jugadores</p>
          </article>

          <article className="dashboard-card">
            <h2>Jugadores</h2>
            <p>Explora deportistas</p>
          </article>
        </section>
        <section className="results-section">
          <h2>Resultados de hoy</h2>
          <p>Conoce los resultados más actuales</p>
        </section>

      </main>

    </>
  )
}

export default App
