import React, { Component } from 'react';
import Analytic from './Analytic';
import {connect} from 'react-redux';
import { fetchTransactions } from '../store';
import { Redirect } from 'react-router-dom';

class Summary extends Component {
    constructor(){
        super();
    }

    componentDidMount(){
        const {user, getTransactions} = this.props;
        console.log('user is ', user)
        if(user.id) getTransactions(user.id);
    }

    formatChartData (name, list) {
        let net = 0
        let data = {name};
        list.forEach(item => {
            // Might be better to use hasKey?
            if(data[item.year]) data[item.year] += item.amount;
            else data[item.year] = item.amount;
            net += item.amount; // Net is the combined net profit of all years
        });

        return {data, net};
    }

    render() {
        const {transactions, user} = this.props;

        if(!user.id) {
            return (
                <Redirect to='/login' />
            )
        }

        if(transactions.length === 0) return <div></div>;

        let {data, net} = this.formatChartData('Yearly', transactions);

        return (
            <div className='container-fluid'>
                <h1>Current Net: ${net}</h1>

                <Analytic data={[data]}/>
            </div>
        )
    }
}

const mapState = (state)=>{
    return {
        user: state.user,
        transactions: state.transactions
    }
}

const mapDispatch = (dispatch) => {
    return {
        getTransactions: (userId) => dispatch(fetchTransactions(userId)),
    }
}

export default connect(mapState, mapDispatch)(Summary);
