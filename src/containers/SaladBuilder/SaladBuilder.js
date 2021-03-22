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
        }
    }

    addIng = (type) => {
        let newIng = {...this.state.ingredients}
        newIng[type] += 1
        this.setState({ingredients: newIng})
    }

    removeIng = (type) => {
        let newIng = {...this.state.ingredients}
        newIng[type] += 1
        this.setState({ingredients: newIng})
    }

    render () {

        const controlArr = Object.keys(this.state.ingredients).map((ing) => {
            return ( 
                <div key={ing}>
                    <p>{ing}</p>
                    <SaladControls addControl={(ing) => this.addIng(ing)} removeControl={() => this.removeIng(ing)}/>
                </div>)
        })

        console.log(controlArr)

        return (
            <Aux>
                <Salad ingredients={this.state.ingredients} />
                {controlArr}
            </Aux>
        );
    }
}

export default SaladBuilder;