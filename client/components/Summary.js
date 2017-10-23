import React, { Component } from 'react';
import Analytic from './Analytic';

export default class Summary extends Component {
    constructor(){
        super();
    }

    render() {
        const data = [
                {name: 'Yearly', 2017: 45000, 2016: 20000, 2015: 10000},

        ];
        return (
            <div className='container-fluid'>
                <h1>Current Net: $65000</h1>

                <Analytic data={data}/>
            </div>
        )
    }
}
