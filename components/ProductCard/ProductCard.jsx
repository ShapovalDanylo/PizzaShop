import Image from 'next/image';
import React from 'react';
import classes from './ProductCard.module.scss';
import Link from 'next/link'

const ProductCard = ({ product }) => {
    return (
        <div className={classes.card}>
            <Link href={`/product/${product._id}`} passHref>
                <Image 
                    src={product.img}
                    alt={product.title}
                    width={500}
                    height={500}
                />
            </Link>
            <h1 className={classes.card__title}>{product.title}</h1>
            <span className={classes.card__price}>${product.prices[0]}</span>
            <p className={classes.card__desc}>
                {product.desc}
            </p>
        </div>
    );
};

export default ProductCard;