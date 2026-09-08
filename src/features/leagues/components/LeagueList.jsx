import Spinner from '@/shared/components/Spinner';
import { useLeagues } from '../hooks';

export default function LeagueList(){
    const{leagues,status} = useLeagues();
    if(status==='loading')
        return <Spinner/>
    if(status==='error')
        return <p>No se pudieron cargar las ligas</p>
    if(leagues.length===0)
        return <p>No hay ligas disponibles</p>
    return(
        <ul>
            {leagues.slice(0,15).map((league)=>(
                <li key={league.idLeague}>
                    {league.strLeague}
                    </li>
                    ))}
                     </ul>
    );
}