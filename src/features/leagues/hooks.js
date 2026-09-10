import { useState,useEffect } from "react";
import { getAllLeagues } from './api';

export function useLeagues(){
    const [leagues,setLeagues]=useState([]);
    const [status,setStatus]=useState('loading');//loading |success | error 
    useEffect(()=>{
        const timer=setTimeout(()=>{
            getAllLeagues()
            .then((data)=>{
                setLeagues(data);
                setStatus('success');
                })
                .catch(()=>setStatus('error'))
        },2000)
        return()=>clearTimeout(timer)
    },[])

        
        
    
    return {leagues,status};
    

}
