import React, {Component} from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../store/actionCreators';

class Orders extends Component {

    state={
        loading:true
    }

    componentDidMount() {
        this.props.getOrders()
        // axios.get('/orders.json')
        //     .then(res => {
        //         const fetchedOrders = []
        //         console.log(res)
        //         console.log(res.data)
        //         for (let key in res.data){
        //             fetchedOrders.push({...res.data[key], id:key})
        //         }
        //         console.log(fetchedOrders)
        //         this.setState({loading:false, orders:fetchedOrders})
        //     })
        //     .catch(err => {
        //         this.setState({loading:false})
        //     })
    }
    render(){
            const orderArr = this.props.ordersData.map(order => (<Order price={+order.price} ingredients={order.ingredients} key={order.id}/>
        ))
        return(
            <div>
                    {orderArr}
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        ordersData: state.orderBuilder.orders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getOrders: () => dispatch(actionCreators.getOrdersthunk())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));