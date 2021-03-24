import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';


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
                    order={this.modalHandler}
                />
                <Modal ingredients={this.state.ingredients}  price={this.state.total} modalShow={this.state.modal}/>
            </Aux>
        );
    }
};

export default BurgerBuilder;