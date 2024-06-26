import { Button, Card, ProgressBar, Stack } from "react-bootstrap";
import { currencyFormatter } from '../utils'

//Read Bootstrap utilities documentation for refreshers on working with + defining these components.

export default function BudgetCard({ name, amount, max, gray, hideButtons, onAddExpenseClick, onViewExpensesClick, }) {
  const classNames = []
  if (amount > max) {
    classNames.push("bg-danger", "bg-opacity-10")
  } else if (gray) {
    classNames.push("bg-light")
  }

  return (
   <Card className={classNames.join(" ")}>
    <Card.Body>
    {/*Using baseline to align items because the size for the text and numbering will be different. Aligning it for the baseline of the font.*/}
     <Card.Title className="d-flex justify-content-between 
     align-items-baseline fw-normal mb-3"> 
        <div className="me-2">{name}</div>
        <div className="d-flex align-items-baseline">
         {currencyFormatter.format(amount)} 
        {max && ( //only display max value if there is one defined
           <span className="text-muted fs-6 ms-1">
            / {currencyFormatter.format(max)}
            </span>
        )}
        </div>
     </Card.Title>
     {max && ( //only display progress bar if a max value is defined
     <ProgressBar
        className="rounded-pill" 
        variant={getProgressBarVariant(amount, max)}
        min={0}
        max={max}
        now={amount}
     />
     )}
     {!hideButtons && (
      <Stack direction="horizontal" gap="2" className="mt-4">
        <Button variant="outline-primary" className="ms-auto" onClick={onAddExpenseClick}>
            Add Expense
        </Button>
        <Button onClick={onViewExpensesClick} variant="outline-secondary">
            View Expenses
        </Button>
     </Stack>
     )}
    </Card.Body>
   </Card>
    )
}

function getProgressBarVariant(amount, max) {
    const ratio = amount / max
    if (ratio < .5 ) return "primary"
    if (ratio < .75 ) return "warning"
    return "danger"
}