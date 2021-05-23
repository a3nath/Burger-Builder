import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../store/actionCreators/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = props => {

    useEffect(() => {
        props.getOrders(props.token, props.userId)
    }, [])
   
            let orderArr = props.ordersData.map(order => (<Order price={+order.price} ingredients={order.ingredients} key={order.id}/>
        ))
            if (props.loading) {
                orderArr = <Spinner/>
        }

        return(
            <div>
                {orderArr}
            </div>
        )
}

const mapStateToProps = state => {
    return {
        ordersData: state.orderBuilder.orders,
        loading: state.orderBuilder.loading,
        token: state.authReducer.token,
        userId: state.authReducer.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getOrders: (token, userId) => dispatch(actionCreators.getOrdersthunk(token, userId))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));