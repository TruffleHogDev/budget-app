import React, { useContext, useState } from 'react'
import { v4 as uuidV4 } from 'uuid'

// Context lets the parent component make some information available to any component in the tree below it—no matter how deep—without passing it explicitly through props.
const BudgetsContext = React.createContext()

export function useBudgets() {
    return useContext(BudgetsContext)
}

// All of the children inside this context have access to the values of this component- the entire app, since we wrapped <App /> in it.
export const BudgetsProvider = ({ children }) => {

    //Budgets and expenses are contained in arrays, since we'll be adding them on our budget cards.
    const [budgets, setBudgets] = useState([])
    const [expenses, setExpenses] = useState([])

    function getBudgetExpenses(budgetId) {
        return expenses.filter(expense => expense.budgetId === budgetId )
    }

    function addExpense({ description, amount, budgetId }) {
        setExpenses(prevExpenses => {
            return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }]
        })
    }

    //Taking our current budgets (defined by prevBudgets), keeping them in an array, and then adding a brand new budget which has a new ID, name, and max value we pass to it.
    function addBudget({ name, max }) {
        setBudgets(prevBudgets => {
            if (prevBudgets.find(budget => budget.name === name)) {
                return prevBudgets
            }
            return [...prevBudgets, { id: uuidV4(), name, max }]
        })
    }

    function deleteBudget({ id }) {
        //TODO: Deal with uncategorized expenses on deletion
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id)
        })
    }

    function deleteExpense({ id }) {
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== id)
        })
    }

    return <BudgetsContext.Provider value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense
    }}>{children}</BudgetsContext.Provider>
}