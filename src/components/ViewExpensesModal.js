import { Modal, Button, Stack } from "react-bootstrap"
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext"
import { currencyFormatter } from '../utils'

export default function ViewExpensesModal({ budgetId, handleClose }) {
    const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } =
    useBudgets()

    const expenses = getBudgetExpenses(budgetId)
    //If we have an uncategorized budget, creating a new budget so we can use it, else we get it in this function.
    const budget = UNCATEGORIZED_BUDGET_ID === budgetId
     ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID } 
     : budgets.find(b => b.id === budgetId)

    return (
     <Modal show={budgetId != null} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>
                <Stack direction="horizontal" gap="2"> 
                    <div>Expenses - {budget?.name}</div> {/*If name is defined, we get the name, if not then we ignore it*/}
                    {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                        <Button onClick={() => {
                            deleteBudget(budget)
                            handleClose()
                        }}
                        variant="outline-danger"
                        >
                        Delete
                        </Button>
                    )}
                </Stack>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Stack direction="vertical" gap="3">
            {expenses.map(expense => (
             <Stack direction="horizontal" gap="2" key={expense.id}>
                <div className="me-auto fs-4">{expense.description}</div>
                <div className="me-auto fs-5">{currencyFormatter.format(expense.amount)}</div>
                <Button onClick={() => deleteExpense(expense)}
                    size="sm"
                     variant="outline-danger"
                >
                &times;
                </Button>
             </Stack>
            )
            )}
        </Stack>
        </Modal.Body>
     </Modal>
    )
}