import { useAuthContext } from "./useAuthContext";
import { useIncomesContext } from "./useIncomeContext";

export function useLogout() {

    const{dispatch}= useAuthContext();
    const {dispatch: dispatchIncomes} = useIncomesContext()

    const logout = () =>{
        // remove user from storage
        localStorage.removeItem('user');

        //dispatch logout action
        dispatch({type : 'LOGOUT'})

        dispatchIncomes({type: 'SET_INCOMES', payload: null})
    }

  return {logout}
}


