import React, {Component} from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    state={
        orders:[],
        loading:true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = []
                for (let key in res.data){
                    fetchedOrders.push({...res.data[key], id:key})
                }
                this.setState({loading:false, orders:fetchedOrders})
            })
            .catch(err => {
                this.setState({loading:false})
            })
    }
    render(){
        console.log(this.state.orders)
        const orderArr = this.state.orders.map(order => (<Order price={+order.price} ingredients={order.ingredients} id={order.id}/>
        ))
        console.log(orderArr)
        return(
            {orderArr})
    }
}

export default withErrorHandler(Orders, axios);