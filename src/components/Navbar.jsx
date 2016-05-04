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
      <nav className="navbar navbar-default">
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
                <Link to="/offers">Offers
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
      </nav>
    );
  }
};

Navbar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
};

// <nav className="navbar navbar-default">
//   <div className="container-fluid">
//     <div className="navbar-header">
//       <a href="/" className="navbar-brand">Comparable</a>
//     </div>
//
//     <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
//       <ul className="nav navbar-nav">
//         <li className="active"><a href="#">Link <span className="sr-only">(current)</span></a></li>
//         <li><a href="#">Link</a></li>
//         <li className="dropdown">
//           <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
//           <ul className="dropdown-menu">
//             <li><a href="#">Action</a></li>
//             <li><a href="#">Another action</a></li>
//             <li><a href="#">Something else here</a></li>
//             <li role="separator" className="divider"></li>
//             <li><a href="#">Separated link</a></li>
//             <li role="separator" className="divider"></li>
//             <li><a href="#">One more separated link</a></li>
//           </ul>
//         </li>
//       </ul>
//       <form className="navbar-form navbar-left" role="search">
//         <div className="form-group">
//           <input type="text" className="form-control" placeholder="Search" />
//         </div>
//         <button type="submit" className="btn btn-default">Submit</button>
//       </form>
//       <ul className="nav navbar-nav navbar-right">
//         <li>
//           <li>
//               {!isAuthenticated &&
//                 <Login
//                   errorMessage={errorMessage}
//                   onLoginClick={() => dispatch(login())}
//                 />
//               }
//
//               {isAuthenticated &&
//                 <Logout onLogoutClick={() => dispatch(logoutUser())} />
//               }
//           </li>
//         </li>
//         <li className="dropdown">
//           <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
//           <ul className="dropdown-menu">
//             <li><a href="#">Action</a></li>
//             <li><a href="#">Another action</a></li>
//             <li><a href="#">Something else here</a></li>
//             <li role="separator" className="divider"></li>
//             <li><a href="#">Separated link</a></li>
//           </ul>
//         </li>
//       </ul>
//     </div>
//   </div>
// </nav>
