import { createContext, useReducer  } from "react";

export const IncomesContext = createContext()
export const ExpensesContext = createContext();

export const incomesReducer = (state,action)=>{
    switch(action.type){
        case 'SET_INCOMES':
            return {
                incomes: action.payload
            }
        case 'CREATE_INCOME':
            return {
                incomes: [action.payload, ...state.incomes]
            }
        case 'DELETE_INCOME':
            return{
                incomes: state.incomes.filter((i) => i._id !== action.payload._id)
            }
            default:
                return state
    }
}

const expensesReducer = (state, action) => {
    switch (action.type) {
      case 'SET_EXPENSES':
        return {
          expenses: action.payload
        };
      case 'CREATE_EXPENSE':
        return {
          expenses: [action.payload, ...state.expenses]
        };
      case 'DELETE_EXPENSE':
        return {
          expenses: state.expenses.filter((e) => e._id !== action.payload._id)
        };
      default:
        return state;
    }
  };



export const IncomesContextProvider = ({children})=>{
    const [state, dispatch] =useReducer(incomesReducer,{incomes: null});
    return(
        <IncomesContext.Provider value={{...state, dispatch}}>
            {children}
        </IncomesContext.Provider>
    )
}

export const ExpensesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(expensesReducer, { expenses: null });
    return (
      <ExpensesContext.Provider value={{ ...state, dispatch }}>
        {children}
      </ExpensesContext.Provider>
    );
  };