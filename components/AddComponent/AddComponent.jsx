import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import classes from './AddComponent.module.scss';

const AddComponent = ({ setModal, currentProduct = {
    status: false,
    content: {
        title: '',
        desc: '',
        img: '',
        prices: [],
        extras: []
    }}, setUpdate}) => {

    const [file, setFile] = useState(null)
    const [extraOptioins, setExtraOptioins] = useState([...currentProduct.content.extras])
    const [extra, setExtra] = useState({
        name: '',
        price: 0
    })

    const [product, setProduct] = useState(currentProduct.content)

    useEffect(() => {
        setProduct({...product, extras: [...extraOptioins]})
    }, [extraOptioins])

    const handlePrice = (e, index) => {
        const prices = product.prices
        prices[index] = e.target.value
        setProduct({...product, prices}) 
    }

    const handleExtra = () => {
        if(extra.name && extra.price) {
            setExtraOptioins(prev => [...prev, extra])
            setExtra({
                name: '',
                price: 0
            })
        }
    }

    const handleDeleteExtra = (index) => {
        setExtraOptioins(prev => prev.filter(prevItem => prevItem.name != prev[index].name))
    }

    const handleCreate = async () => {
        const data = new FormData()
        data.append("file", file)
        data.append("upload_preset", "uploads")
        try {
            const uplRest = await axios.post("https://api.cloudinary.com/v1_1/alphawar/upload", data)
            const { url } = uplRest.data
            const newProduct = {...product, img: url}
            await axios.post("http://localhost:3000/api/products", newProduct)
            setModal(false)
            setProduct({
                title: '',
                desc: '',
                img: file,
                prices: [],
                extras: []
            })
            setUpdate(prev => !prev)
        } catch (e) {
            console.log(e)
        }
    }

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:3000/api/products/${product._id}`, product)
            setModal(false)
            setUpdate(prev => !prev)
        } catch (e) {
            console.log(e)
        }
    }
    
    return (
        <div className={classes.modal}>
            <div className={classes.modal__wrapper}>
                <span className={classes.modal__close} onClick={() => setModal(false)}>X</span>
                <h1>{currentProduct.status ? "Edit the Product" : "Add a new Pizza"}</h1>
                <div className={classes.modal__item}>
                    <label className={classes.modal__label}>Choose an Image</label>
                    <input type="file" onChange={e => setFile(e.target.files[0])}/>
                </div>
                <div className={classes.modal__item}>
                    <label className={classes.modal__label}>Title</label>
                    <input className={classes.modal__input} type="text" value={product.title} onChange={e => setProduct({...product, title: e.target.value})}/>
                </div>
                <div className={classes.modal__item}>
                    <label className={classes.modal__label}>Description</label>
                    <textarea type="text" row={4} value={product.desc} onChange={e => setProduct({...product, desc: e.target.value})}/>
                </div>
                <div className={classes.modal__item}>
                    <label className={classes.modal__label}>Prices</label>
                    <div className={classes.modal__prices}>
                        <input className={classes.modal__input} value={currentProduct.content.prices[0]} type="number" placeholder='Small' onChange={e => handlePrice(e, 0)}/>
                        <input className={classes.modal__input} value={currentProduct.content.prices[1]} type="number" placeholder='Medium' onChange={e => handlePrice(e, 1)}/>
                        <input className={classes.modal__input} value={currentProduct.content.prices[2]} type="number" placeholder='Large' onChange={e => handlePrice(e, 2)}/>
                    </div>
                </div>
                <div className={classes.modal__item}>
                    <label className={classes.modal__label}>Extra</label>
                    <div className={classes.modal__extras}>
                        <input className={classes.modal__input} value={extra.name} type="text" placeholder='Name of extra' onChange={e => setExtra({ ...extra, name: e.target.value})}/>
                        <input className={classes.modal__input} value={extra.price} type="number" placeholder='Price of extra' onChange={e => setExtra({ ...extra, price: e.target.value})}/>
                        <button onClick={handleExtra}>Add extra</button>
                    </div>
                </div>
                <div className={classes.modal__item}>
                    {extraOptioins.map((option, index) => (
                        <div onClick={() => handleDeleteExtra(index)} key={index}>{index + 1}. {option.name} - ${option.price}</div>
                    ))}
                </div>
                <button className={classes.modal__addButton} onClick={currentProduct.status ? handleUpdate : handleCreate}>{currentProduct.status ? "Edit" : "Create"}</button>
            </div>
        </div>
    );
};

export default AddComponent;