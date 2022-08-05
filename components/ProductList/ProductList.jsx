import React from 'react';
import classes from './ProductList.module.scss';
import ProductCard from '../ProductCard/ProductCard';

const ProductList = ({ productList }) => {
    return (
        <div className={classes.list} id="Products">
            <h1 className={classes.list__title}>THE BEST PIZZA IN TOWN</h1>
            <p className={classes.list__desc}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit arcu
                in pretium molestie. Interdum et malesuada fames acme. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit.
            </p>
            <div className={classes.list__wrapper}>
                {productList.map( product => (
                    <ProductCard 
                        product={product}
                        key={product._id}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductList;