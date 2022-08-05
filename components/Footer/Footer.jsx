import Image from 'next/image';
import React from 'react';
import classes from './Footer.module.scss';

const Footer = () => {
    return (
        <div className={classes.footer}>
            <div className={classes.footer__item}>
                <Image
                    priority 
                    src="/images/bg.png"
                    alt="bgImage"
                    layout='fill'
                    objectFit='cover'
                />
            </div>
            <div className={classes.footer__item}>
                <div className={classes.footer__section}>
                    <h2 className={classes.footer__desc}>
                        OH YES, WE DID.THE LAMA PIZZA, WELL BAKED SLICE OF PIZZA.
                    </h2>
                </div>
                <div className={classes.footer__section} id="Contacts">
                    <h1 className={classes.footer__title}>FIND OUR RESTAURANTS</h1>
                    <p className={classes.footer__text}>
                        1654 R. Don Road #304.
                        <br /> NewYork, 85022
                        <br /> (602) 867-1010
                    </p>
                    <p className={classes.footer__text}>
                        2356 K. Laquie Rd #235.
                        <br /> NewYork, 85022
                        <br /> (602) 867-1011
                    </p>
                    <p className={classes.footer__text}>
                        1614 E. Erwin St #104.
                        <br /> NewYork, 85022
                        <br /> (602) 867-1012
                    </p>
                    <p className={classes.footer__text}>
                        1614 W. Caroll St #125.
                        <br /> NewYork, 85022
                        <br /> (602) 867-1013
                    </p>
                </div>
                <div className={classes.footer__section}>
                <h1 className={classes.footer__title}>WORKING HOURS</h1>
                <p className={classes.footer__text}>
                    MONDAY UNTIL FRIDAY
                    <br /> 9:00 – 22:00
                </p>
                <p className={classes.footer__text}>
                    SATURDAY - SUNDAY
                    <br /> 12:00 – 24:00
                </p>
                </div>
            </div>
        </div>
    );
};

export default Footer;