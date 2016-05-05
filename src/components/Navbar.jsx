import React, { Component, PropTypes } from 'react';
import Login from './Login';
import Logout from './Logout';
import { login, logoutUser } from '../actions/Auth_Actions';
import { Link } from 'react-router';

export default class Navbar extends Component {
  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props;

    // Will display the Login component if the user is not authenticated, Logout otherwise
    return (
      <div className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse" aria-expanded="false">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a href="/" className="navbar-brand">Comparable</a>
          </div>
          <div className="collapse navbar-collapse" id="navBar">
            <ul className="nav navbar-nav navbar-right">
              <li className="active">
                <Link to="/offers" id="offer-btn">Offers
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li>
                {!isAuthenticated &&
                  <Login
                    errorMessage={errorMessage}
                    onLoginClick={() => dispatch(login())}
                  />
                }

                {isAuthenticated &&
                  <Logout onLogoutClick={() => dispatch(logoutUser())} />
                }
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
};

Navbar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
};

// <div class="navbar navbar-default">
//   <div class="container-fluid">
//     <div class="navbar-header">
//       <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-responsive-collapse">
//         <span class="icon-bar"></span>
//         <span class="icon-bar"></span>
//         <span class="icon-bar"></span>
//       </button>
//       <a class="navbar-brand" href="javascript:void(0)">Brand</a>
//     </div>
//     <div class="navbar-collapse collapse navbar-responsive-collapse">
//       <ul class="nav navbar-nav">
//         <li class="active"><a href="javascript:void(0)">Active</a></li>
//         <li><a href="javascript:void(0)">Link</a></li>
//         <li class="dropdown">
//           <a href="bootstrap-elements.html" data-target="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown
//             <b class="caret"></b></a>
//           <ul class="dropdown-menu">
//             <li><a href="javascript:void(0)">Action</a></li>
//             <li><a href="javascript:void(0)">Another action</a></li>
//             <li><a href="javascript:void(0)">Something else here</a></li>
//             <li class="divider"></li>
//             <li class="dropdown-header">Dropdown header</li>
//             <li><a href="javascript:void(0)">Separated link</a></li>
//             <li><a href="javascript:void(0)">One more separated link</a></li>
//           </ul>
//         </li>
//       </ul>
//       <form class="navbar-form navbar-left">
//         <div class="form-group">
//           <input type="text" class="form-control col-md-8" placeholder="Search">
//         </div>
//       </form>
//       <ul class="nav navbar-nav navbar-right">
//         <li><a href="javascript:void(0)">Link</a></li>
//         <li class="dropdown">
//           <a href="bootstrap-elements.html" data-target="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown
//             <b class="caret"></b></a>
//           <ul class="dropdown-menu">
//             <li><a href="javascript:void(0)">Action</a></li>
//             <li><a href="javascript:void(0)">Another action</a></li>
//             <li><a href="javascript:void(0)">Something else here</a></li>
//             <li class="divider"></li>
//             <li><a href="javascript:void(0)">Separated link</a></li>
//           </ul>
//         </li>
//       </ul>
//     </div>
//   </div>
// </div>

// <nav className="navbar navbar-default">
//   <div className="container">
//     <div className="navbar-header">
//       <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse" aria-expanded="false">
//         <span className="icon-bar"></span>
//         <span className="icon-bar"></span>
//         <span className="icon-bar"></span>
//       </button>
//       <a href="/" className="navbar-brand">Comparable</a>
//     </div>
//     <div className="collapse navbar-collapse" id="navBar">
//       <ul className="nav navbar-nav navbar-right">
//         <li className="active">
//           <Link to="/offers">Offers
//             <span className="sr-only">(current)</span>
//           </Link>
//         </li>
//         <li>
//           {!isAuthenticated &&
//             <Login
//               errorMessage={errorMessage}
//               onLoginClick={() => dispatch(login())}
//             />
//           }
//
//           {isAuthenticated &&
//             <Logout onLogoutClick={() => dispatch(logoutUser())} />
//           }
//         </li>
//       </ul>
//     </div>
//   </div>
// </nav>
