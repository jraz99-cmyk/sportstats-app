const BASE_URL = import.meta.env.VITE_SPORTSDB_URL
export async function getFromSportsDB(endpoint) { 
    const res = await fetch(`${BASE_URL}${endpoint}`) 
    if (!res.ok) { throw new Error(`Error al consultar la API: ${res.status}`) } return res.json() 
}