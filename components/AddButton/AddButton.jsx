import React from 'react';
import classes from './AddButton.module.scss';

const AddButton = ({ setModal }) => {

    const handleModal = () => setModal(true)

    return (
        <div 
            className={classes.button}
            onClick={handleModal}
        >
            Add new Pizza
        </div>
    );
};

export default AddButton;