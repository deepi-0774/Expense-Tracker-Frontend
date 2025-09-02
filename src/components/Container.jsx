import BalanceContainer from "./BalanceContainer";
import ExpenseForm from "./ExpenseForm";
import History from "./History";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify"
const INITIAL_EXPENSE = []
const Container = () => {

    const [transactions, setTransactions] = useState(INITIAL_EXPENSE)
    const [editItem, seteditItem] = useState(null)
    console.log(editItem)
    const addExpense = async (title, amount) => {
        await fetch("https://expense-tracker-backend-8fpk.onrender.com/addExpense", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, amount })
        })
        getAllExpense()
        toast.success("transaction added successfully")
    }
    useEffect(() => {
        getAllExpense();
    }, []);

    const getAllExpense = async () => {
        const response = await fetch("https://expense-tracker-backend-8fpk.onrender.com/getExpenses");
        const data = await response.json();
        setTransactions(data);
    };
    const deleteExpense = async (id) => {
        await fetch("https://expense-tracker-backend-8fpk.onrender.com/deleteExpense", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        })
        getAllExpense();
        toast.success("transaction deleted successfully")
    }
    const updateExpense = (async (id, title, amount) => {
        let result = await fetch("https://expense-tracker-backend-8fpk.onrender.com/updateExpense", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, title, amount })
        })
        getAllExpense();
    })
    const editExpense = (item) => {
        seteditItem(item)
    }
    return (
        <div className="container">
            <h2>Expense Tracker</h2>
            <BalanceContainer transactions={transactions} />
            <History transactions={transactions} deleteExpense={deleteExpense} editExpense={editExpense} />
            <ExpenseForm addExpense={addExpense} editItem={editItem} seteditItem={seteditItem} updateExpense={updateExpense} />

        </div>
    )

}
export default Container;