import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NewExpense from "../NewExpense/NewExpense";
import Expenses from "./Expenses";
import { getProducts } from '../../actions/productsAction';

const Expense = () => {
    const [expenses, setExpenses] = useState([]);
    const { productsData } = useSelector((state) => state.ProductsReducer)

    const dispatch = useDispatch();

    console.log(expenses)

    // const coba = dispatch(getProducts());
    // console.log(coba)

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch])

    const addExpenseHandler = (expense) => {
        setExpenses((prevExpenses) => {
            return [expense, ...prevExpenses];
        });
    };

    // return React.createElement(
    //   'div',
    //   {},
    //   React.createElement('h2', {}, "Let's get started!"),
    //   React.createElement(Expenses, { items: expenses })
    // );

    return (
        <>
            <NewExpense onAddExpense={addExpenseHandler} />
            {productsData?.products?.length > 0 && (
                <Expenses items={productsData} />
            )}
        </>
    )
}

export default Expense;