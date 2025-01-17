import React, { useState,useEffect } from 'react';
import axios from 'axios';

import './ExpenseForm.css';

const ExpenseForm = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [enteredStock, setEnteredStock] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const titleChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  const stockChangeHandler = (event) => {
    setEnteredStock(event.target.value);
  };

  const fileChangeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('name', enteredName);
    formData.append('price', enteredAmount);
    formData.append('stock', enteredStock);
    formData.append('image', selectedFile);
    

    try {
      const response = await axios.post('http://localhost:8000/api/v1/products', formData);
      console.log(response.data); // Tindakan lanjutan setelah berhasil menyimpan data ke backend

      setEnteredName('');
      setEnteredAmount('');
      setEnteredStock('');
      setSelectedFile(null);
      
    } catch (error) {
      console.error(error); // Tindakan lanjutan jika terjadi error saat mengirim data ke backend
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className='new-expense__controls'>
        <div className='new-expense__control'>
          <label>Title</label>
          <input type='text' value={enteredName} onChange={titleChangeHandler} />
        </div>
        <div className='new-expense__control'>
          <label>Amount</label>
          <input
            type='number'
            min='0.01'
            step='0.01'
            value={enteredAmount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className='new-expense__control'>
          <label>Stock</label>
          <input
            type='number'
            min='0.01'
            step='0.01'
            value={enteredStock}
            onChange={stockChangeHandler}
          />
        </div>
        <div className='new-expense__control'>
          <label>Image</label>
          <input type='file' onChange={fileChangeHandler} />
        </div>
      </div>
      <div className='new-expense__actions'>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button type='submit'>Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;