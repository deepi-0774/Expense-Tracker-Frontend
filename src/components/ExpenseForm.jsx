import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
const ExpenseForm = (props) => {
    const { addExpense, editItem, updateExpense ,setEditItem} = props
    const [title, setTitle] = useState("")
    const [amount, setAmount] = useState("")
    useEffect(() => {
        setTitle(editItem?.title || "")
        setAmount(editItem?.amount || "")
    }, [editItem])
    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }
    const handleAmountChange = (e) => {
        setAmount(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (editItem) {
            updateExpense(editItem.id,title,amount)
            toast.success("Item edited succesfully")
            setEditItem(null)
        }
        else {
            if (!title && !amount) {
                toast.error("Amount and title should not be empty")
            }
            else if (!amount) {
                toast.error("Amount should not be empty")
            }
            else if (!title) {
                toast.error("Title should not be empty")
            }
            else {
                addExpense(title, amount)
                setTitle("")
                setAmount("")
            }
        }

    }
    return (
        <div className="expense-form">
            <h4>{editItem ? "Edit" : "Add"} Transaction</h4>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" value={title} onChange={handleTitleChange} />
                </div>
                <div>
                    <label htmlFor="amount">Amount</label>
                    <input type="number" id="amount" name="amount" value={amount} onChange={handleAmountChange} />
                </div>
                <button type="submit">{editItem ? "Edit" : "Add"} Transaction</button>
            </form>
        </div>
    )
}
export default ExpenseForm
