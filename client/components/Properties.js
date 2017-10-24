import React, { Component } from 'react';
import Analytic from './Analytic';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { fetchProperties } from '../store';

class Properties extends Component {
    constructor(){
        super();
    }

    componentDidMount(){
        const {user, getProperties} = this.props;
        if(user.id) getProperties(user.id);
    }

    render() {
        const {user, properties} = this.props;
        if(!user.id) {
            return (
                <Redirect to='/login' />
            )
        }

        return (
            <div className='container-fluid'>
                <div className='row'>
                <br/>
                    <ul>
                    {
                        properties.map(property => {
                            return (
                                <li key={property.id}>
                                    <Link to={`/property/${property.id}`}>{`${property.address}
                                    ${property.city}, ${property.state} ${property.zip}`}</Link>
                                </li>
                            );
                        })
                    }
                    </ul>
                </div>
            </div>
        );
        // const data = [
        //         {name: 'Yearly', 2017: 4500, 2016: 2000, 2015: 1000}
        // ];
        // return (
        //     <div className='container-fluid'>
        //         <h1> This is Properties</h1>
        //         <Analytic data={data}/>
        //     </div>
        // )
    }
}

/* CONTAINER */
const mapState = (state) => {
    return {
        user: state.user,
        properties: state.properties
    }
}
const mapDispatch = (dispatch) => {
  return {
        getProperties: (userId) => dispatch(fetchProperties(userId)),
  };
};

export default connect(mapState, mapDispatch)(Properties);
