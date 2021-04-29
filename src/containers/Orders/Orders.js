import React, {Component} from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../store/actionCreators/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount() {
        this.props.getOrders(this.props.token)
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
            let orderArr = this.props.ordersData.map(order => (<Order price={+order.price} ingredients={order.ingredients} key={order.id}/>
        ))
            if (this.props.loading) {
                orderArr = <Spinner/>
        }

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
        ordersData: state.orderBuilder.orders,
        loading: state.orderBuilder.loading,
        token: state.authReducer.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getOrders: (token) => dispatch(actionCreators.getOrdersthunk(token))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));