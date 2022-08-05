import Image from 'next/image';
import React, { useState } from 'react';
import classes from './Slider.module.scss';

const Slider = () => {

    const [current, setCurrent] = useState(0)

    const images = [
        "/images/featured.png",
        "/images/featured2.png",
        "/images/featured3.png"
    ]

    const handleSlider = direction => {
        direction === "left" ? setCurrent(current !== 0 ? current - 1 : 2) : setCurrent(current !== 2 ? current + 1 : 0)
    }

    return (
        <div className={classes.slider}>
            <div className={classes.slider__arrow} style={{left: 0}} onClick={() => handleSlider("left")}>
                <Image 
                    src="/images/arrowl.png"
                    alt="arrowLeft"
                    layout="fill"
                    objectFit="contain"
                />
            </div>
            <div className={classes.slider__wrapper} style={{transform: `translateX(${-100 * current}vw)`}}>
                {images.map( (image, index) => (
                    <div className={classes.slider__image} key={index}>
                        <Image 
                            priority
                            src={image}
                            alt={`${image}`}
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                ))}
            </div>
            <div className={classes.slider__arrow} style={{right: 0}} onClick={() => handleSlider("right")}> 
                <Image 
                    src="/images/arrowr.png"
                    alt="arrowRight"
                    layout="fill"
                    objectFit="contain"
                />    
            </div>
        </div>
    )
};

export default Slider;