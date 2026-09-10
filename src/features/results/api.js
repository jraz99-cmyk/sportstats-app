import { getFromSportsDB } from '@/lib/sportsdbClient'

// OJO: usamos año/mes/día locales a propósito (NO toISOString()),
// porque toISOString() devuelve la fecha en UTC. Si alguien revisa
// la app de noche en una zona horaria detrás de UTC (como Colombia),
// UTC ya puede marcar el día siguiente, y terminaríamos consultando
// los partidos de "mañana" en vez de los de "hoy".
function getLocalDateString(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export async function getTodayEvents(leagueIds = []) {
  const today = getLocalDateString()

  const requests = leagueIds.map((id) =>
    getFromSportsDB(`/eventsday.php?d=${today}&l=${id}`)
  )

  const responses = await Promise.all(requests)
  return responses.flatMap((data) => data.events || [])
}