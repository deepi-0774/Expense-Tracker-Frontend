import BalanceContainer from "./BalanceContainer";
import ExpenseForm from "./ExpenseForm";
import History from "./History";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify"
const INITIAL_EXPENSE = [
    {
        id: 1,
        title: "salary",
        amount: 1000
    },
    {
        id: 2,
        title: "Rent",
        amount: -200
    }

]
const Container = () => {

    const [transactions, setTransactions] = useState(INITIAL_EXPENSE)
    const [editItem, seteditItem] = useState(null)
    console.log(editItem)
    const addExpense = async (title, amount) => {
        await fetch("http://localhost:3000/addExpense", {
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
        const response = await fetch("http://localhost:3000/getExpenses");
        const data = await response.json();
        setTransactions(data);
    };
    const deleteExpense = async (id) => {
        await fetch("http://localhost:3000/deleteExpense", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        })
        getAllExpense();
        toast.success("transaction deleted successfully")
    }
    const updateExpense = (async (id, title, amount) => {
        let result = await fetch("http://localhost:3000/updateExpense", {
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