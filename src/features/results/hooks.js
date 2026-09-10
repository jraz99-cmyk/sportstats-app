import { useState, useEffect } from 'react'
import { getTodayEvents } from './api'

export function useTodayEvents(leagueIds) {
  const [events, setEvents] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    // Esperamos a que lleguen IDs de liga reales antes de consultar
    if (!leagueIds || leagueIds.length === 0) return

    setStatus('loading')
    getTodayEvents(leagueIds)
      .then((data) => {
        setEvents(data)
        setStatus('success')
      })
      .catch(() => setStatus('error'))
  }, [leagueIds])

  return { events, status }
}