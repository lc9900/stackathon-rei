import React, {Component} from 'react';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar} from 'recharts';
import randomColor from 'randomcolor';
import axios from 'axios';

export default class Analytic extends Component {
    constructor(){
        super();
    }

    componentDidMount(){

    }

    render(){
        const {data} = this.props;
        let seed = 0;
        return (
            <BarChart width={730} height={250} data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              {

                data.map(period => {
                    return Object.keys(period).map(key => {
                        if (key !== 'name') {
                            seed += 10;
                            // console.log(`<Bar dataKey=${key} fill={randomColor(${seed})} />`)
                            return (
                                <Bar dataKey={key} fill={randomColor({seed})} />
                            )
                        }
                    })
                })
              }
            </BarChart>
        )
    }
}
