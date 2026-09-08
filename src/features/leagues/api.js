import { getFromSportsDB } from '@/lib/sportsdbClient';
export async function getAllLeagues() {
    const data = await getFromSportsDB('/all_leagues.php');
    return data.leagues ||[];
}