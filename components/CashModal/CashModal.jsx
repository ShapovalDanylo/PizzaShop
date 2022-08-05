import React, { useState } from 'react';
import classes from './CashModal.module.scss';

const CashModal = ({ total, createOrder, setModalCash }) => {

    const [customer, setCustomer] = useState("")
    const [address, setAddress] = useState("")

    const handleConfirm = () => {
        createOrder({ 
            customer,
            address,
            total,
            paymethod: 0
        })
        setModalCash(false)
    }

    return (
        <div className={classes.cashModal}> 
            <div className={classes.cashModal__wrapper}>
                <h1 className={classes.cashModal__title}>You will pay ${total} after delivery</h1>
                <div className={classes.cashModal__item}>
                    <label className={classes.cashModal__label}>Name Surname</label>
                    <input type="text" placeholder='John Doe' className={classes.cashModal__input} onChange={e => setCustomer(e.target.value)}/>
                </div>
                <div className={classes.cashModal__item}>
                    <label className={classes.cashModal__label}>Phone Number</label>
                    <input type="text" placeholder="+1 234 567 89" className={classes.cashModal__input}/>
                </div>
                <div className={classes.cashModal__item}>
                    <label className={classes.cashModal__label}>Address</label>
                    <input rows={5} type="text" placeholder='1 Main St, San Jose, CA 95131' className={classes.cashModal__input} onChange={e => setAddress(e.target.value)}/>
                </div>
                <button className={classes.cashModal__button} onClick={handleConfirm}>Confirm</button>
            </div>
        </div>
    );
};

export default CashModal;