import React, { Component } from 'react';

import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';



class Modal extends Component{

    
    render(){

        return(
            <Aux>
                <Backdrop show={this.props.modalShow} clicked={this.props.modalClose}/>
                <div className={classes.Modal} 
                    style={{ 
                    transform: this.props.modalShow ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.modalShow ? '1' : '0'
                }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }

} 



export default Modal;