import { useContext} from 'react'
import { IncomesContext } from '../context/IncomeContext'


export function useIncomesContext() {
    const context = useContext(IncomesContext);
    if (!context){
        throw  Error('useIncomesContext must be used inside a IncomeContextProvider')
    }
  return context;
}


