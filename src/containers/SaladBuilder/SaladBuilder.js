import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Salad from '../../components/Salad/Salad';
import SaladControls from '../../components/SaladControls/SaladControls';

const INGREDIENT_COST = {
    lettuce: 1,
    tomato: 2,
    cheese: 1,
    meat: 3
}

class SaladBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients: {
            lettuce: 1,
            tomato: 0,
            cheese: 2,
            meat: 0
        },
        total: 5
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

    render () {
        // const controlArr = Object.keys(this.state.ingredients).map((ing, key) => {
        //     return ( 
        //         <div key={key}>
        //             <p>{ing}</p>
        //             <SaladControls addControl={(ing) => this.addIng(ing)} removeControl={(ing) => this.removeIng(ing)}/>
        //         </div>)
        // })

        // console.log(controlArr)
        console.log(this.state.total)

        return (
            <Aux>
                <Salad ingredients={this.state.ingredients} />
                <SaladControls ingredients={this.state.ingredients} addControl={this.addIng} removeControl = {this.removeIng} />
            </Aux>
        );
    }
};

export default SaladBuilder;