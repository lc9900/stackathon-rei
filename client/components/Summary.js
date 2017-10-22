import React, { Component } from 'react';
import Analytic from './Analytic';

export default class Summary extends Component {
    constructor(){
        super();
    }

    render() {
        return (
            <div className='container-fluid'>
                <h1> This is Summary</h1>
                <Analytic />
            </div>
        )
    }
}
