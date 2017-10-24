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

    render() {
        const {transactions, user} = this.props;

        if(!user.id) {
            return (
                <Redirect to='/login' />
            )
        }

        if(transactions.length === 0) return <div></div>;

        let data = {name: 'Yearly'}, net = 0;
        transactions.forEach(transaction => {
            // Might be better to use hasKey?
            if(data[transaction.year]) data[transaction.year] += transaction.amount;
            else data[transaction.year] = transaction.amount;
            net += transaction.amount; // Net is the combined net profit of all years
        });

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
