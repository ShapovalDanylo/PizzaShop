import React from 'react';
import classes from '../../styles/Order.module.scss';
import Image from 'next/image';
import axios from 'axios';

const Order = ({ order }) => {

    const status = order.status

    const setStatusClass = id => {
        if(id - status < 1) {
            return classes.order__done
        } else if (id - status === 1) {
            return classes.order__inProgress
        } else {
            return classes.order__notReady
        }
    }

    return (
        <div className={classes.order}>
            <div className={classes.order__left}>
                <div className={classes.order__row}>
                    <table className={classes.order__table}>
                        <thead>
                            <tr className={classes.order__title}>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Address</th>
                                <th>Total</th>
                            </tr> 
                        </thead>
                        <tbody>
                            <tr className={classes.order__tr}>
                                <td>
                                    <p className={classes.order__id}>{order._id}</p>
                                </td>
                                <td>
                                    <p className={classes.order__name}>
                                        {order.customer}
                                    </p>
                                </td>
                                <td>
                                    <p className={classes.order__address}>{order.address}</p>
                                </td>
                                <td>
                                    <p className={classes.order__total}>${order.total}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={classes.order__row}>
                    <div className={setStatusClass(0)}>
                        <Image 
                            src="/images/paid.png"
                            alt="paidImage"
                            width={50}
                            height={50}
                        />
                        <p>Payment</p>
                        <div className={classes.order__checkedIcon}>
                            <Image 
                                src="/images/checked.png"
                                alt="checkedImage"
                                width={20}  
                                height={20}
                            />
                        </div>
                    </div>
                    <div className={setStatusClass(1)}>
                        <Image 
                            src="/images/bake.png"
                            alt="paidImage"
                            width={50}
                            height={50}
                        />
                        <p>Preparing</p>
                        <div className={classes.order__checkedIcon}>
                            <Image 
                                src="/images/checked.png"
                                alt="checkedImage"
                                width={20}  
                                height={20}
                            />
                        </div>
                    </div>
                    <div className={setStatusClass(2)}>
                        <Image 
                            src="/images/bike.png"
                            alt="paidImage"
                            width={50}
                            height={50}
                        />
                        <p>On the way</p>
                        <div className={classes.order__checkedIcon}>
                            <Image 
                                src="/images/checked.png"
                                alt="checkedImage"
                                width={20}  
                                height={20}
                            />
                        </div>
                    </div>
                    <div className={setStatusClass(3)}>
                        <Image 
                            src="/images/delivered.png"
                            alt="paidImage"
                            width={50}
                            height={50}
                        />
                        <p>Delivered</p>
                        <div className={classes.order__checkedIcon}>
                            <Image 
                                src="/images/checked.png"
                                alt="checkedImage"
                                width={20}  
                                height={20}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.order__right}>
                <div className={classes.order__wrapper}>
                    <h2 className={classes.order__title}>CART TOTAL</h2>
                    <div className={classes.order__totalText}>
                        <b className={classes.order__totalTextTitle}>Subtotal:</b>${order.total}
                    </div>
                    <div className={classes.order__totalText}>
                        <b className={classes.order__totalTextTitle}>Discount:</b>$0.00
                    </div>
                    <div className={classes.order__totalText}>
                        <b className={classes.order__totalTextTitle}>Total:</b>${order.total}
                    </div>
                    <button disabled className={order.paymethod === 0 ? `${classes.order__buyButton} ${classes.order__buyButton_unpaid}` : `${classes.order__buyButton}`}>
                        {order.paymethod === 0 ? "NOT PAID" : "PAID"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps = async ({ params }) => {
    const resp = await axios.get(`http://localhost:3000/api/orders/${params.id}`)
    return {
        props: { order: resp.data }
    }
}

export default Order; 