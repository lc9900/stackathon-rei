import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {fetchProducts} from '../store.js'
import {BrowserRouter, Route, NavLink, withRouter, Switch, Redirect} from 'react-router-dom';
import Navbar from './Navbar';
import Summary from './Summary';
import Properties from './Properties';
import Login from './Login';
import { displayMain, fetchUser, logout } from '../reducers';

// import { } from '../reducers';

class Main extends Component {
	constructor(){
		super();
	}

	componentDidMount() {
        const { loadSessionUser, setDisplayMain } = this.props;
        loadSessionUser()
            .then(() => {
                // Display flag is only useful on first page load, or refresh.
                // It prevents any data from showing until loadSessionUser is completed.
                // loadSessionUser makes an axios call, thus timing can cause
                // unwanted data from display.
                setDisplayMain(true);
            })
            .catch(err => { throw err; });
	}

    // componentWillUnmout(){
    //     setDisplayMain(false)
    // }

	render(){
        const {user, display, logoutUser} = this.props;
        if(!display) return <div></div>;

        if(!user.id) {
            return (
                <div className='container-fluid'>
                    <Login />
                </div>
            )
        }

		return (
			<div>
				<Navbar user={user} logoutUser={logoutUser}/>
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
    user: state.user,
    display: state.display
  }
}
const mapDispatch = (dispatch) => {
  return {
    loadSessionUser: () => dispatch(fetchUser()),
    setDisplayMain: (flag) => dispatch(displayMain(flag)),
    logoutUser: () => dispatch(logout()),
  };
};

export default withRouter(connect(mapState, mapDispatch)(Main));
