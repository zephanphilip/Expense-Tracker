import {  useState} from 'react'
import { useAuthContext } from './useAuthContext'



export function useSignup() {

    const [error, setError] = useState(null)
    const [isLoading,setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const signup = async (username, password,name, email) => {
        setIsLoading(true)
        setError(null)
        const requestBody = { username, password, name, email };
        console.log('Request Body:', requestBody);

        const response = await fetch('https://expense-tracker-server-b8lj.onrender.com/api/auth/register',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, name, email})
            }
        )
        const json = await response.json()

        if (!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok){
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update context
            dispatch({type:'LOGIN', payload: json})

            setIsLoading(false)
        }
 
    }


  return { signup, isLoading, error}
}


