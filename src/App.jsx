import { useMemo } from 'react'
import { useLeagues } from '@/features/leagues/hooks'
import { useTodayEvents } from '@/features/results/hooks'
import TodayResults from '@/features/results/components/TodayResults'
import './App.css'

const staticCards = [
  {
    title: 'Deportes',
    description: 'Selecciona el deporte',
    searchPlaceholder: 'Buscar deporte…',
    highlights: ['Fútbol', 'Baloncesto', 'Tenis'],
  },
  {
    title: 'Equipos de fútbol',
    description: 'Explora los principales equipos y sus jugadores',
    searchPlaceholder: 'Buscar equipo…',
    highlights: ['Real Madrid', 'Manchester City', 'Boca Juniors'],
  },
  {
    title: 'Jugadores',
    description: 'Explora deportistas',
    searchPlaceholder: 'Buscar jugador…',
    highlights: ['Messi', 'Mbappé', 'Haaland'],
  },
]

// La Champions y Europa League no aparecen en el listado general de ligas
// del plan gratuito (all_leagues.php las omite), así que fijamos sus IDs
// directamente en vez de intentar "encontrarlas" en esa lista.
const FIXED_CUP_LEAGUE_IDS = ['4480', '4481'] // UEFA Champions League, UEFA Europa League

// Coincidencia por nombre EXACTO, no "contiene" — así evitamos falsos
// positivos como que "Scottish Premier League" haga match con "Premier League".
const EXACT_DOMESTIC_LEAGUE_NAMES = [
  'English Premier League',
  'German Bundesliga',
  'Italian Serie A',
]

function CardHighlights({ status = 'success', highlights }) {
  if (status === 'loading') return <p className="card-loading">Cargando…</p>
  if (status === 'error') return <p className="card-error">No se pudo cargar</p>

  return (
    <ul className="card-highlights">
      {highlights.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function DashboardCard({ title, description, searchPlaceholder, highlights, status }) {
  return (
    <article className="dashboard-card">
      <h2 className="display">{title}</h2>
      <p>{description}</p>

      <div className="card-hover">
        <input
          type="text"
          className="card-search"
          placeholder={searchPlaceholder}
          readOnly
        />
        <CardHighlights status={status} highlights={highlights} />
      </div>
    </article>
  )
}

function App() {
  const { leagues, status: leaguesStatus } = useLeagues()
  const leagueHighlights = leagues.slice(0, 3).map((league) => league.strLeague)

  const soccerLeagueIds = useMemo(() => {
    const domesticIds = leagues
      .filter((league) => EXACT_DOMESTIC_LEAGUE_NAMES.includes(league.strLeague))
      .map((league) => league.idLeague)

    // Set elimina duplicados por si acaso alguna liga fija ya viniera en la lista
    return [...new Set([...domesticIds, ...FIXED_CUP_LEAGUE_IDS])]
  }, [leagues])

  const { events, status: eventsStatus } = useTodayEvents(soccerLeagueIds)

  return (
    <>
      <header className="app-header">
        <h1 className="display">SportStats</h1>
        <p>Estadísticas deportivas en un solo lugar</p>
      </header>

      <main className="app-main">
        <section className="dashboard-grid" aria-label="Panel deportivo">
          <DashboardCard {...staticCards[0]} />

          <DashboardCard
            title="Ligas de fútbol"
            description="Explora las principales ligas y sus equipos"
            searchPlaceholder="Buscar liga…"
            highlights={leagueHighlights}
            status={leaguesStatus}
          />

          <DashboardCard {...staticCards[1]} />
          <DashboardCard {...staticCards[2]} />
        </section>

        <section className="results-section">
          <h2 className="display">Resultados de hoy</h2>
          <p>Partidos y marcadores de las principales ligas y copas</p>
          <TodayResults events={events} status={eventsStatus} />
        </section>
      </main>
    </>
  )
}

export default App