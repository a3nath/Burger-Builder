import axios from '../axios-orders';
import * as actionTypes from './actionTypes';

export const initialIng = ingArr => {
    return {type: actionTypes.INITIAL_ING, ing: ingArr}
};

export const initialErr = error => {
    return {type: actionTypes.INITIAL_ERROR, error: error}
};

export const addIng = ingName => {
    return {type: actionTypes.ADD_ING, ing:ingName}
};

export const removeIng = ingName => {
    return {type: actionTypes.REMOVE_ING, ing:ingName}
};

export const startOrder = () => {
    return {type: actionTypes.START_ORDER}
};

export const postOrder = orderData => {
    return {type: actionTypes.POST_ORDER, order:orderData }
};

export const postError = error => {
    return {type: actionTypes.POST_ERROR, error:error}
};

export const getOrders = orders => {
    console.log(orders)
    return {type: actionTypes.GET_ORDERS, orders: orders}
};

export const ordersError = error => {
    return {type: actionTypes.ORDERS_ERROR, error: error}
};

export const iniIngthunk = () => {
    return (dispatch) => {
        return (
            axios.get('https://academindburger-default-rtdb.firebaseio.com/ingredients.json')
                .then(response => {
                    dispatch(initialIng(response.data))
                })
                .catch(err => { 
                    dispatch(initialErr(err))
                })
        )
    }
};

export const postOrderthunk = (order) => {
    return (dispatch) => {
        return (
            dispatch(startOrder()),
            axios.post('/orders.json', order)
            .then(response => {
                const orderId = response.data.name
                const orderIdData = {...order, id: orderId}
                dispatch(postOrder(orderIdData))
                // this.props.history.push('/')
            })
            .catch(error => {
                dispatch(postError(error))
                // this.setState({loading: false}) 
            })
        )
    }
};

export const getOrdersthunk = () => {
    return dispatch => {
        return (
            dispatch(startOrder()),
            axios.get('https://academindburger-default-rtdb.firebaseio.com/orders.json')
            .then(res => {
                const fetchedOrders = []
                for (let key in res.data){
                    fetchedOrders.push({...res.data[key], id:key})
                }
                dispatch(getOrders(fetchedOrders))
            })
            .catch( err=> dispatch(ordersError(err)))
        )
    }
};