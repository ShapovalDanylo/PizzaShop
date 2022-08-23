import React, { useState } from 'react';
import classes from '../../styles/Admin.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import AddComponent from '../../components/AddComponent/AddComponent';
import AddButton from '../../components/AddButton/AddButton';
import { useEffect } from 'react';

const Admin = ({ orders, products }) => {

    const [productList, setProductList] = useState(products)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [orderList, setOrderList] = useState(orders)
    const [editModal, setEditModal] = useState(false)
    const [addModal, setAddModal] = useState(false)
    const [update, setUpdate] = useState(false)

    const statuses = ["preparing", "on the way", "delivered"]

    const getProducts = async () => {
        const resp = await axios.get("http://localhost:3000/api/products")
        setProductList(resp.data)
    } 

    useEffect(() => {
        getProducts()
    }, [update])

    const handleProductDelete = async id => {
        try {
            await axios.delete(`http://localhost:3000/api/products/${id}`)
            setProductList(productList.filter( product => product._id !== id))
        } catch (e) {
            console.log(e)
        }
    }

    const handleStatus = async (id, flag) => {
        try {
            const order = orderList.filter( order => order._id === id)[0]
            const resp = await axios.put(`http://localhost:3000/api/orders/${id}`, { status: flag === "Forward" ? order.status + 1 : order.status - 1})
            const newOrderList = [...orderList]
            newOrderList[newOrderList.findIndex( order => order._id === id)] = resp.data
            setOrderList(newOrderList)
        } catch (e) {
            console.log(e)
        }
    }

    const handleOrderDelete = async id => {
        try {
            await axios.delete(`http://localhost:3000/api/orders/${id}`)
            setOrderList(orderList.filter( order => order._id !== id))
        } catch (e) {
            console.log(e)
        }
    }

    const handleEdit = product => {
        setSelectedProduct(product)
        setEditModal(true)
    }

    return (
        <>
            <div className={classes.admin}>
                <div className={classes.admin__item}>
                    <h1 className={classes.admin__title}>Products</h1>
                    <table className={classes.admin__table}>
                        <thead>
                            <tr className={classes.admin__tr}>
                                <th>Image</th>
                                <th>Id</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productList.map( product => (
                                <tr className={classes.admin__tr} key={product._id}>
                                    <td>
                                        <Image 
                                            src={product.img}
                                            width={50}
                                            height={50}
                                            objectFit="cover"
                                            alt={product.title}
                                        />
                                    </td>
                                    <td>
                                        <Link href={`/product/${product._id}`} passHref>
                                            <a className={classes.admin__id}>{product._id.slice(0, 5)}...</a>
                                        </Link>
                                    </td>
                                    <td>{product.title}</td>
                                    <td>${product.prices[0]}</td>
                                    <td>
                                        <button className={classes.admin__button} onClick={() => handleEdit(product)}>Edit</button>
                                        <button className={classes.admin__button} onClick={() => handleProductDelete(product._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <AddButton setModal={setAddModal} text={"Add Product"}/>
                </div>
                <div className={classes.admin__item}>
                    <h1 className={classes.admin__title}>Orders</h1>
                    <table className={classes.admin__table}>
                            <thead>
                                <tr className={classes.admin__tr}>
                                    <th>Id</th>
                                    <th>Customer</th>
                                    <th>Total</th>
                                    <th>Payment</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {orderList.map( order => (   
                                    <tr className={classes.admin__tr} key={order._id}>
                                        <td>
                                            <Link href={`/order/${order._id}`} passHref>
                                                <a className={classes.admin__id}>{order._id.slice(0, 5)}...</a>
                                            </Link>
                                        </td>
                                        <td>{order.customer}</td>
                                        <td>{order.total}</td>
                                        <td>{order.paymethod ? 
                                            <span className={classes.admin__paid}>PAID</span> : 
                                            <span className={classes.admin__notPaid}>NOT PAID</span>
                                        }</td>
                                        <td>{statuses[order.status].toUpperCase()}</td>
                                        <td>
                                            <button disabled={order.status === 0} onClick={() => handleStatus(order._id, "Back")}>Previous Stage</button>
                                            <button disabled={order.status === 2} onClick={() => handleStatus(order._id, "Forward")}>Next Stage</button>
                                            <button onClick={() => handleOrderDelete(order._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                    </table>
                </div>
            </div>
            {editModal && <AddComponent setModal={setEditModal} currentProduct={{status: true, content: selectedProduct}} setUpdate={setUpdate}/>}
            {addModal && <AddComponent setModal={setAddModal} setUpdate={setUpdate}/>}
        </>
    );
};

export const getServerSideProps = async context => {
    const myCookie = context.req?.cookies || ""
    if(myCookie.token !== process.env.AUTH_TOKEN) {
        return {
            redirect: {
                destination: "/admin/login",
                permanent: false
            }
        }
    }
    const products = await axios.get("http://localhost:3000/api/products")
    const orders = await axios.get("http://localhost:3000/api/orders")
    return {
        props: {
            orders: orders.data,
            products: products.data
        }
    }
}

export default Admin;