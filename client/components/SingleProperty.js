import React, { Component } from 'react';
import Analytic from './Analytic';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { fetchProperties } from '../store';
import axios from 'axios';

class Properties extends Component {
    constructor(){
        super();
        this.state = {
            transactions: [],
            property: {}
        }
    }

    componentDidMount(){
        const {user, propertyId} = this.props;
        let transactions = [],
            property = {};
        axios.get(`/api/properties/${propertyId}/transactions`)
            .then(res => res.data)
            .then(result => transactions = result)
            .then(() => {
                return axios.get(`/api/properties/${propertyId}`)
            })
            .then(res => res.data)
            .then(result => property = result)
            .then(() => this.setState({transactions, property}))
            .catch(err => { throw err; });
    }

    render() {
        const {user} = this.props;
        if(!user.id) {
            return (
                <Redirect to='/login' />
            )
        }

        const { transactions, property } = this.state;
        if(!property.id) return <div></div>;
        // console.log("single property transactions ", transactions);
        // console.log('single property user ', user)
        let data = {name: 'Yearly'}, net = 0;
        transactions.forEach(transaction => {
            // Might be better to use hasKey?
            if(data[transaction.year]) data[transaction.year] += transaction.amount;
            else data[transaction.year] = transaction.amount;
            net += transaction.amount; // Net is the combined net profit of all years
        });


        return (
            <div className='container-fluid'>
                <h1>{`${property.address} ${property.city}, ${property.state} ${property.zip}`}</h1>
                <br/>
                <Analytic data={[data]}/>
                <br/>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Month</th>
                            <th>Description</th>
                            <th>Amount $</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        transactions.map(transaction => {
                            return (
                                <tr key={transaction.id}>
                                    <td>{transaction.year}</td>
                                    <td>{transaction.month}</td>
                                    <td>{transaction.description}</td>
                                    <td>{transaction.amount}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

/* CONTAINER */
const mapState = (state, ownProps) => {
    return {
        user: state.user,
        propertyId: ownProps.match.params.propertyId,
    }
}
const mapDispatch = (dispatch) => {
  return {

  };
};

export default connect(mapState, mapDispatch)(Properties);
