import Image from 'next/image';
import React from 'react';
import classes from './Header.module.scss';
import { useSelector } from 'react-redux';
import Link from 'next/link';

const Header = () => {

    const { prodQuant } = useSelector( state => state.cart)

    return (
        <div className={classes.header}>
            <div className={classes.header__item}>
                <div className={classes.header__callButton}>
                    <a href={`tel:012 345 678`}>
                        <Image 
                            src="/images/telephone.png"
                            alt="telephone"
                            width={32}
                            height={32}
                        />
                    </a>
                </div>
                <div className={classes.header__texts}>
                    <div className={classes.header__text}>ORDER NOW!</div>
                    <div className={classes.header__text}>
                        <a href={`tel:012 345 678`}>012 345 678</a>
                    </div>
                </div>
            </div>
            <div className={classes.header__item}>
                <ul className={classes.header__list}>
                    <Link href="/" passHref><li className={classes.header__listItem}>Homepage</li></Link>
                    <Link href="#Products" passHref><li className={classes.header__listItem}>Products</li></Link>
                    <Link href="#Products" passHref><li className={classes.header__listItem}>Menu</li></Link>
                    <Link href="/" passHref>
                        <Image  
                            className={classes.header__logo}
                            src="/images/logo.png"
                            alt="logo"
                            width={160}
                            height={69}
                        />
                    </Link>
                    <Link href="#Contacts" passHref><li className={classes.header__listItem}>Events</li></Link>
                    <Link href="#Contacts" passHref><li className={classes.header__listItem}>Blog</li></Link>
                    <Link href="#Contacts" passHref ><li className={classes.header__listItem}>Contact</li></Link>
                </ul>
            </div>
            <div className={classes.header__item}>
                <Link href="/cart" passHref>
                    <div className={classes.header__cart}>
                        <Image 
                            src="/images/cart.png"
                            alt="cart"
                            width={30}
                            height={30}
                        />
                        <div className={classes.header__quant}>{prodQuant}</div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Header;