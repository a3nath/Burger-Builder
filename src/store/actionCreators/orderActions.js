import axios from '../../axios-orders';
import * as actionTypes from '../actionTypes';

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

export const purchased = () => {
    return {type: actionTypes.PURCHASED}
}


export const postOrderthunk = (order,token) => {
    return (dispatch) => {
        return (
            dispatch(startOrder()),
            //if you have authenticated you have token and can do post request
            axios.post(`/orders.json?auth=${token}`, order)
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

export const getOrdersthunk = (token, userId) => {
    return dispatch => {
            dispatch(startOrder());
            const queryparams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`
            axios.get(`https://academindburger-default-rtdb.firebaseio.com/orders.json${queryparams}`)
            .then(res => {
                const fetchedOrders = []
                for (let key in res.data){
                    fetchedOrders.push({...res.data[key], id:key})
                }
                dispatch(getOrders(fetchedOrders))
            })
            .catch( err=> dispatch(ordersError(err)))
    }
};