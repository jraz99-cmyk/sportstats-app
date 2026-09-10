import Spinner from '@/shared/components/Spinner';


export default function LeagueList({leagues,status}){
    
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