import React from 'react';

import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';



const Modal = props => {

        console.log(props)
        return(
            <Aux>
                <Backdrop Backdropshow={props.modalShow} BackdropClicked={props.modalClose}/>
                <div className={classes.Modal} 
                    style={{ 
                    transform: props.modalShow ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.modalShow ? '1' : '0'
                }}>
                    {props.children}
                </div>
            </Aux>
        ) 
}



export default React.memo(Modal, 
    (prevProps, nextProps) => 
        nextProps.modalShow === prevProps.modalShow && 
        nextProps.children === prevProps.children
);