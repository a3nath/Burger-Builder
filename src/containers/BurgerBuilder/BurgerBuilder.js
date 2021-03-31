import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios-orders';


const INGREDIENT_COST = {
    lettuce: 1,
    tomato: 2,
    cheese: 1,
    meat: 3
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            lettuce: 1,
            tomato: 1,
            cheese: 1,
            meat: 1
        },
        total: 7,
        modal:false
    }

    addIng = (type) => {
        let newIng = {...this.state.ingredients}
        const oldIngCount = newIng[type]
        const newIngCount = oldIngCount + 1
        newIng[type] = newIngCount
        const oldTotal = this.state.total
        const newTotal = oldTotal + INGREDIENT_COST[type]

        this.setState({ingredients: newIng, total: newTotal})
    }

    removeIng = (type) => {
        let newIng = {...this.state.ingredients}
        const oldIngCount = newIng[type]
        const newIngCount = oldIngCount - 1
        newIng[type] = newIngCount
        const oldTotal = this.state.total
        const newTotal = oldTotal - INGREDIENT_COST[type]

        this.setState({ingredients: newIng, total:newTotal})
    }

    modalHandler = () => {
        this.setState({modal:true})
    }

    modalCloseHandler = () => {
        this.setState({modal:false})
    }

    purchaseHandler =() => {
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.total,
            customer: {
                name: 'Aaa',
                contact: '519519519',
                country: 'Canada'
            }
        }
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response.data)
            })
            .catch(error => console.log(error))
    }

    render () {
        console.log(this.state.total)

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BurgerControls 
                    ingredients={this.state.ingredients} 
                    addControl={this.addIng} 
                    removeControl = {this.removeIng}
                    price={this.state.total} 
                    modal={this.modalHandler}
                />
                <Modal 
                    ingredients={this.state.ingredients}  
                    price={this.state.total} 
                    modalShow={this.state.modal}
                    modalClose={this.modalCloseHandler}
                    purchase={this.purchaseHandler}
                />
            </Aux>
        );
    }
};

export default BurgerBuilder;