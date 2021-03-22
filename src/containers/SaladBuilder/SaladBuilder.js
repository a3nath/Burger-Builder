import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Salad from '../../components/Salad/Salad';
import SaladControls from '../../components/SaladControls/SaladControls'

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
        cost:{
            lettuce: 1,
            tomato: 2,
            cheese: 1,
            meat: 3
        },
        total: 0
    }

    addIng = (type) => {
        console.log(type)
        let newIng = {...this.state.ingredients}
        newIng[type] =+ 1
        let newTotal = [...this.state.total]
        newTotal =+ this.state.cost[type]

        this.setState({ingredients: newIng, total: newTotal})
    }

    removeIng = (type) => {
        let newIng = {...this.state.ingredients}
        newIng[type] =- 1
        let newTotal = [...this.state.total]
        newTotal =- this.state.cost[type]

        this.setState({ingredients: newIng, total:newTotal})
    }

    render () {
        const controlArr = Object.keys(this.state.ingredients).map((ing, key) => {
            return ( 
                <div key={key}>
                    <p>{ing}</p>
                    <SaladControls addControl={(ing) => this.addIng(ing)} removeControl={(ing) => this.removeIng(ing)}/>
                </div>)
        })

        // console.log(controlArr)

        return (
            <Aux>
                <Salad ingredients={this.state.ingredients} />
                {controlArr}
            </Aux>
        );
    }
}

export default SaladBuilder;