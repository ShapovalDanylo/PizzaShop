import axios from 'axios';
import React, { useState } from 'react';
import classes from './AddComponent.module.scss';

const AddComponent = ({ setModal }) => {

    const [file, setFile] = useState(null)
    const [extraOptioins, setExtraOptioins] = useState([])
    const [extra, setExtra] = useState({
        title: '',
        price: 0
    })
    const [product, setProduct] = useState({
        title: '',
        desc: '',
        img: file,
        prices: [],
        extras: [],
    })

    const handlePrice = (e, index) => {
        const prices = product.prices
        prices[index] = e.target.value
        setProduct({...product, prices}) 
    }

    const handleExtra = () => (extra.title && extra.price) && setExtraOptioins(prev => [...prev, extra])

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
        } catch (e) {
            console.log(e)
        }
    }
    
    return (
        <div className={classes.modal}>
            <div className={classes.modal__wrapper}>
                <span className={classes.modal__close} onClick={() => setModal(false)}>X</span>
                <h1>Add a new Pizza</h1>
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
                        <input className={classes.modal__input} type="number" placeholder='Small' onChange={e => handlePrice(e, 0)}/>
                        <input className={classes.modal__input} type="number" placeholder='Medium' onChange={e => handlePrice(e, 1)}/>
                        <input className={classes.modal__input} type="number" placeholder='Large' onChange={e => handlePrice(e, 2)}/>
                    </div>
                </div>
                <div className={classes.modal__item}>
                    <label className={classes.modal__label}>Extra</label>
                    <div className={classes.modal__extras}>
                        <input className={classes.modal__input} value={extra.title} type="text" placeholder='Name of extra' onChange={e => setExtra({ ...extra, title: e.target.value})}/>
                        <input className={classes.modal__input} value={extra.price} type="number" placeholder='Price of extra' onChange={e => setExtra({ ...extra, price: e.target.value})}/>
                        <button onClick={handleExtra}>Add extra</button>
                    </div>
                </div>
                <div className={classes.modal__item}>
                    {extraOptioins.map((option, index) => (
                        <div key={index}>{index + 1}. {option.title} - ${option.price}</div>
                    ))}
                </div>
                <button className={classes.modal__addButton} onClick={handleCreate}>Create</button>
            </div>
        </div>
    );
};

export default AddComponent;