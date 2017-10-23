import React, { Component } from 'react';
import Analytic from './Analytic';

export default class Summary extends Component {
    constructor(){
        super();
    }

    render() {
        const data = [
                {name: 'Yearly', 2017: 4500, 2016: 2000, 2015: 1000}
        ];
        return (
            <div className='container-fluid'>
                <h1> This is Properties</h1>
                <Analytic data={data}/>
            </div>
        )
    }
}
