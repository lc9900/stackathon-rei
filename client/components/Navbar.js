import React from 'react';
import {NavLink} from 'react-router-dom';

export default function Navbar (props) {
    const {user, logoutUser} = props;
    return (
        <nav id='top-bar' className='navbar navbar-fixed-top navbar-inverse' role='navigation'>
          <div className='container-fluid'>
            <div className='navbar-header'>
              <a className='navbar-brand' href="/">Stack-REI</a>
            </div>
            <div className='collapse navbar-collapse'>
              <ul className='nav navbar-nav'>
                <li>
                    <NavLink to="/" activeClassName="active">Summary</NavLink>
                </li>
                <li>
                    <NavLink to="/properties" activeClassName="active">Properties</NavLink>
                </li>
                {
                  user.id ? ( <li>
                                <a onClick={logoutUser}>Logout</a>
                              </li>) : <span></span>
                }
              </ul>
            </div>
          </div>
        </nav>
    );
}

