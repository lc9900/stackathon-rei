import React, { Component } from 'react';
import Analytic from './Analytic';
import {connect} from 'react-redux';
import { fetchTransactions, fetchInvestments } from '../store';
import { Redirect } from 'react-router-dom';

class Summary extends Component {
    constructor(){
        super();
    }

    componentDidMount(){
        const {user, getTransactions, getInvestments} = this.props;
        // console.log('user is ', user)
        if(user.id) {
            getTransactions(user.id)
                .then(() => {
                    return getInvestments(user.id);
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

        // list.forEach(item => {
        //     // Might be better to use hasKey?
        //     if(data[item.year]) data[item.year] += item.amount;
        //     else data[item.year] = item.amount;
        //     net += item.amount; // Net is the combined net profit of all years
        // });

        // return {data, net};
    }

    render() {
        const {transactions, user, investments} = this.props;

        if(!user.id) {
            return (
                <Redirect to='/login' />
            )
        }

        if(transactions.length === 0) return <div></div>;

        let {data, net} = this.formatChartData('Yearly Profit', transactions);

        let roi = this.formatChartData('Yearly ROI Percentage', transactions, 'ROI');
        // console.log('roi is ', roi)

        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-sm-6'>
                        <h2>Current Net: ${net}</h2>
                        <Analytic data={[data]}/>
                    </div>

                    <div className='col-sm-6'>
                        <h2>ROI</h2>
                        <Analytic data={[roi]}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapState = (state)=>{
    return {
        user: state.user,
        transactions: state.transactions,
        investments: state.investments
    }
}

const mapDispatch = (dispatch) => {
    return {
        getTransactions: (userId) => dispatch(fetchTransactions(userId)),
        getInvestments: (userId) => dispatch(fetchInvestments(userId)),
    }
}

export default connect(mapState, mapDispatch)(Summary);
