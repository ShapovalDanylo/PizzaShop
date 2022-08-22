import React, { useState, useEffect } from 'react';
import classes from '../../styles/Product.module.scss';
import Image from 'next/image';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../store/slices/cartSlice';
import AddButton from '../../components/AddButton/AddButton';
import AddComponent from '../../components/AddComponent/AddComponent';

const Product = ({ item, isAdmin }) => {

    const [size, setSize] = useState(0)
    const [extras, setExtras] = useState([])
    const [quant, setQuant] = useState(1)
    const [modal, setModal] = useState(false)
    const [product, setProduct] = useState(item)
    const [price, setPrice] = useState(product.prices[0])
    const [update, setUpdate] = useState(false)
 
    const toggleProduct = async () => {
        const resp = await axios.get(`http://localhost:3000/api/products/${item._id}`)
        setProduct(resp.data)
        setPrice(product.prices[0])
    }

    useEffect(() => {
        modal ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'visible'
    }, [modal])

    useEffect(() => {
        toggleProduct()
    }, [update])

    const dispatch = useDispatch()

    const handleOptionChange = (e, option) => {
        if(e.target.checked) {
            changePrice(option.price)
            setExtras( extras => [...extras, option])
        } else {
            changePrice(-option.price)
            setExtras(extras.filter( extra => extra._id !== option._id))
        }
    }

    const handleSize = id => {
        const diff = product.prices[id] - product.prices[size]
        setSize(id)
        changePrice(diff)
    }

    const changePrice = number => {
        setPrice( currPrice => currPrice + number)
    }

    const handleAddProduct = () => {
        dispatch(addProduct({...product, extras, price, quant}))
    }

    return (
        <div className={classes.product}>
            <div className={classes.product__left}>
                <div className={classes.product__imgContainer}>
                    <Image 
                        src={product.img}
                        alt={product.title}
                        layout='fill'
                        objectFit='contain'
                    />
                </div>
            </div>
            <div className={classes.product__right}>
                <h1 className={classes.product__title}>{product.title}</h1>
                <span className={classes.product__price}>${price}</span>
                <p className={classes.product__desc}>{product.desc}</p>
                <h3 className={classes.product__choose}>Choose the size</h3>
                <div className={classes.product__sizes}>
                    <div className={size === 0 ? `${classes.product__size} ${classes.product__selected}` : `${classes.product__size}`} onClick={() => handleSize(0)}>
                        <Image 
                            alt="small"
                            src="/images/size.png"
                            layout='fill'
                        />
                        <span className={classes.product__sizeText}>Small</span>
                    </div>
                    <div className={size === 1 ? `${classes.product__size} ${classes.product__selected}` : `${classes.product__size}`} onClick={() => handleSize(1)}>
                        <Image 
                            alt="medium"
                            src="/images/size.png"
                            layout='fill'
                        />
                        <span className={classes.product__sizeText}>Medium</span>
                    </div>
                    <div className={size === 2 ? `${classes.product__size} ${classes.product__selected}` : `${classes.product__size}`} onClick={() => handleSize(2)}>
                        <Image 
                            alt="large"
                            src="/images/size.png"
                            layout='fill'
                        />
                        <span className={classes.product__sizeText}>Large</span>
                    </div>
                </div>
                <h3 className={classes.product__choose}>Choose additional ingredients</h3>
                <div className={classes.product__ingredients}>
                    {product.extras.map( extra => (
                        <div className={classes.product__option} key={extra._id}>
                            <input
                                type="checkbox"
                                id={extra.name}
                                name={extra.name}
                                className={classes.product__checkbox}
                                onChange={e => handleOptionChange(e, extra)}
                            />
                            <label htmlFor={extra.name}>{extra.name}</label>
                        </div>
                    ))}
                </div>
                <div className={classes.product__quant}>
                    <input 
                        type="number" 
                        defaultValue={1}
                        min={1}
                        onChange={e => setQuant(e.target.value)}
                        className={classes.product__quantInput}
                    />
                    <button
                        className={classes.product__buyButton}
                        onClick={handleAddProduct}
                    >Add to Cart</button>
                </div>
                {isAdmin && <AddButton setModal={setModal} text="Edit product" />}
            </div>
            {modal && <AddComponent setModal={setModal} currentProduct={{
                    status: true,
                    content: {...product}
            }} setUpdate={setUpdate}/>}
        </div>
    );
};

export default Product;

export const getServerSideProps = async ({ params, req }) => {
    const myCookie = req?.cookies || ""
    let isAdmin = false
    if (myCookie.token === process.env.AUTH_TOKEN) {
        isAdmin = true
    }
    const resp = await axios.get(`http://localhost:3000/api/products/${params.id}`);
    return {
      props: {
        item: resp.data,
        isAdmin
      }
    }
}