import React, { useState, useEffect } from 'react';
import classes from '../styles/Cart.module.scss';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useRouter } from 'next/router'; 
import { resetCart } from '../store/slices/cartSlice';
import axios from 'axios';
import CashModal from '../components/CashModal/CashModal';

const Cart = () => {

    const dispatch = useDispatch()
    const cart = useSelector( state => state.cart)
    const [open, setOpen] = useState(false)
    const [modalCash, setModalCash] = useState(false)
    const router = useRouter()

    const amount = cart.total
    const currency = "USD"
    const style = { "layout": "vertical" }

    useEffect(() => {
      modalCash ? document.body.style.overflow = "hidden" : document.body.style.overflow = "visible"
    }, [modalCash])

    const createOrder = async (data) => {
        try {
          const resp = await axios.post("http://localhost:3000/api/orders", data);
          if (resp.status === 201) {
            router.push(`/order/${resp.data._id}`);
            dispatch(resetCart());
          }
        } catch (e) {
          console.log(e);
        }
    };

    const ButtonWrapper = ({ currency, showSpinner }) => {
        const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    
        useEffect(() => {
          dispatch({
            type: "resetOptions",
            value: {
              ...options,
              currency: currency,
            },
          });
        }, [currency, showSpinner]);
    
        return (
          <>
            {showSpinner && isPending && <div className="spinner" />}
            <PayPalButtons
              style={style}
              disabled={false}
              forceReRender={[amount, currency, style]}
              fundingSource={undefined}
              createOrder={(data, actions) => {
                return actions.order
                  .create({
                    purchase_units: [
                      {
                        amount: {
                          currency_code: currency,
                          value: amount,
                        },
                      },
                    ],
                  })
                  .then((orderId) => {
                    return orderId;
                  });
              }}
              onApprove={function (data, actions) {
                return actions.order.capture().then(function (details) {
                  const shipping = details.purchase_units[0].shipping;
                  createOrder({
                    customer: shipping.name.full_name,
                    address: shipping.address.address_line_1,
                    total: cart.total,
                    paymethod: 1,
                  });
                });
              }}
            />
          </>
        );
      };

    return (
        <div className={classes.cart}>
            <div className={classes.cart__left}>
                <table className={classes.cart__table}>
                    <thead>
                        <tr className={classes.cart__title}>
                            <th>Product</th>
                            <th>Name</th>
                            <th>Extras</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    {cart.products.map( (product, index) => (
                        <tbody key={index}>
                            <tr className={classes.cart__tr}>
                                <td className={classes.cart__img}>
                                    <div className={classes.cart__imageContainer}>
                                        <Image 
                                            src={product.img}
                                            alt="pizza"
                                            layout='fill'
                                            objectFit='cover'
                                        />
                                    </div>
                                </td>
                                <td>
                                    <p className={classes.cart__name}>{product.title}</p>
                                </td>
                                <td>
                                    <p className={classes.cart__extras}>
                                        {product.extras.map( (extra, index, array) => (
                                            <span>{extra.name}{index !== array.length - 1 && ', '}</span>
                                        ))}
                                    </p>
                                </td>
                                <td>
                                    <p className={classes.cart__price}>${product.price}</p>
                                </td>
                                <td>
                                    <p className={classes.cart__quant}>{product.quant}</p>
                                </td>
                                <td>
                                    <p className={classes.cart__total}>${product.price * product.quant}</p>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
            <div className={classes.cart__right}>
                <div className={classes.cart__wrapper}>
                    <h2 className={classes.cart__title}>CART TOTAL</h2>
                    <div className={classes.cart__totalText}>
                        <b className={classes.cart__totalTextTitle}>Subtotal:</b>${cart.total}
                    </div>
                    <div className={classes.cart__totalText}>
                        <b className={classes.cart__totalTextTitle}>Discount:</b>$0.00
                    </div>
                    <div className={classes.cart__totalText}>
                        <b className={classes.cart__totalTextTitle}>Total:</b>${cart.total}
                    </div>
                    {open ? (
                        <div className={classes.cart__payment}>
                            <button className={classes.cart__paybutton} onClick={() => setModalCash(true)}>CASH ON DELIVERY</button>
                            <PayPalScriptProvider
                                options={{
                                "client-id": "AZ1T1p_S_7lhZ6xIgeiQFcAFmIaJDe4DITqJ0cHX6LXVHq4W-URd17LIv1TSiHYB1HWrvy_6Lyk-qwHR",
                                components: "buttons",
                                currency: "USD",
                                "disable-funding": "venmo,credit,card,p24",
                                }}
                            >
                                <ButtonWrapper currency={currency} showSpinner={false} />
                            </PayPalScriptProvider>
                        </div>
                    ) : (
                        <button disabled={!cart.total} onClick={() => setOpen(true)} className={classes.cart__buyButton}>CHECKOUT NOW!</button>
                    )}
                </div>
            </div>
            {modalCash && <CashModal setModalCash={setModalCash} total={cart.total} createOrder={createOrder}/>}
        </div>
    );
};


export default Cart;