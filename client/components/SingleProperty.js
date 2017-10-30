import React, { Component } from 'react';
import Analytic from './Analytic';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { fetchProperties, fetchTransactions, fetchInvestments } from '../store';
import axios from 'axios';

class Properties extends Component {
    constructor(){
        super();
        this.state = {
            property: {}
        }
    }

    componentDidMount(){
        const {user, propertyId, getTransactions, getInvestments} = this.props;

        if(user.id) {
                    getTransactions(user.id)
                        .then(() => {
                            return getInvestments(user.id);
                        })
                        .then(() => {
                            return axios.get(`/api/properties/${propertyId}`)
                                .then(res => res.data)
                                .then(result => this.setState({property: result}))
                        })
                        .catch(err => { throw err; });
        }
    }

    formatChartData (name, list, type) {
        let net = 0,
            data = {name},
            invesment_total = this.props.investments.reduce((total, investment) => {
                return total + investment.invested;
            }, 0),
            roi = {name};

        switch(type) {
            case 'ROI' :
                list.forEach(item => {
                    // Might be better to use hasKey?
                    if(data[item.year]) data[item.year] += item.amount;
                    else data[item.year] = item.amount;
                    roi[item.year] = parseFloat((data[item.year]/invesment_total * 100).toFixed(2));
                });

                return roi;

            default:
                list.forEach(item => {
                    // Might be better to use hasKey?
                    if(data[item.year]) data[item.year] += item.amount;
                    else data[item.year] = item.amount;
                    net += item.amount; // Net is the combined net profit of all years
                });
                return {data, net};
        }
    }

    render() {
        const {user, transactions, propertyId, investments} = this.props;
        if(!user.id) {
            return (
                <Redirect to='/login' />
            )
        }

        // const { transactions, property } = this.state;
        const {property} = this.state;
        if(!property.id) return <div></div>;
        // console.log("single property transactions ", transactions);
        // console.log("singe property investments ", investments);
        // console.log('single property user ', user)

        let {data, net} = this.formatChartData('Yearly Profit', transactions);

        let roi = this.formatChartData('Yearly ROI Percentage', transactions, 'ROI');


        return (
            <div className='container-fluid'>
                <h2>{`${property.address} ${property.city}, ${property.state} ${property.zip}`}</h2>
                <div className='row'>
                    <div className='col-sm-6'>
                        <br/>
                        <Analytic data={[data]}/>
                    </div>

                    <div className='col-sm-6'>
                        <br/>
                        <Analytic data={[roi]}/>
                    </div>
                </div>
                <br/>
                <table className='table table-striped'>
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
        transactions: state.transactions.filter(item => item.propertyId === ownProps.match.params.propertyId * 1),
        investments: state.investments.filter(item => item.propertyId === ownProps.match.params.propertyId * 1)
        // transactions: state.transactions,
        // investments: state.investments
    }
}
const mapDispatch = (dispatch) => {
  return {
        getTransactions: (userId) => dispatch(fetchTransactions(userId)),
        getInvestments: (userId) => dispatch(fetchInvestments(userId)),
    }
};

export default connect(mapState, mapDispatch)(Properties);
