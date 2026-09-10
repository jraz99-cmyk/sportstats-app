export default function TodayResults({ events, status }) {
  if (status === 'loading') return <p className="card-loading">Cargando resultados…</p>
  if (status === 'error') return <p className="card-error">No se pudieron cargar los resultados de hoy.</p>
  if (events.length === 0) return <p className="card-loading">No hay eventos programados para hoy.</p>

  return (
    <ul className="results-list">
      {events.slice(0, 8).map((event) => (
        <li key={event.idEvent} className="result-row">
          <span className="result-league">{event.strLeague}</span>
          <span className="result-teams">
            {event.strHomeTeam}
            <strong className="result-score">
              {event.intHomeScore ?? '–'} : {event.intAwayScore ?? '–'}
            </strong>
            {event.strAwayTeam}
          </span>
        </li>
      ))}
    </ul>
  )
}