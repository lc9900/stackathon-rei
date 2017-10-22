import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {fetchProducts} from '../store.js'
import {BrowserRouter, Route, NavLink, withRouter, Switch, Redirect} from 'react-router-dom';
import Navbar from './Navbar';
import Summary from './Summary';
import Properties from './Properties';
import Login from './Login';

// import { } from '../reducers';

class Main extends Component {
	constructor(){
		super();
	}

	componentDidMount() {
	}

	render(){
		return (
			<div>
				<Navbar/>
                <Switch>
                    <Route exact path='/' component={Summary} />
                    <Route path='/properties' component={Properties} />
                    <Redirect to='/' />
                </Switch>
			</div>
		)
	}
}

// export default Main  // This is only commented out to set default user


// The following container is needed only to set default user
/* -----------------    CONTAINER     ------------------ */

const mapState = (state) => {
  return {
  }
}
const mapDispatch = (dispatch) => {
  return {
  };
};

export default withRouter(connect(mapState, mapDispatch)(Main));
