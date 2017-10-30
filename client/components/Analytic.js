import React, {Component} from 'react';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, ResponsiveContainer, Label} from 'recharts';
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
            <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Label value='This is a label' position='top' />
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
            </ResponsiveContainer>
        )
    }
}
