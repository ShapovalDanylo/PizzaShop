import React from 'react';
import classes from './AddButton.module.scss';

const AddButton = ({ setModal, text }) => {

    const handleModal = () => setModal(true)

    return (
        <div 
            className={classes.button}
            onClick={handleModal}
        >
            {text}
        </div>
    );
};

export default AddButton;