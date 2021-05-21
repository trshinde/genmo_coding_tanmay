import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { setDispatchParams, patientDetails } from './actions';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import 'semantic-ui-css/semantic.min.css'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      patientDetails: []
    }
  }

  static getDerivedStateFromProps(props, state) {
    let update = {};
    if (props) {
      if (props.patientDetails && props.patientDetails !== state.patientDetails) {
        update.patientDetails = props.patientDetails;
      }
    }
    return Object.keys(update).length ? update : null;
  }

  componentDidMount() {
    this.props.actions.patientDetails();
  }

  render() {
    const { patientDetails } = this.state;
    return (
      <Router>
              <Switch>
                  <Route exact path="/home"
                         render={(props) =>
                          <Home patientDetails={patientDetails} {...props}/>
                        } 
                  /> 
                  <Route exact path="/*"
                         render={(props) =>
                          <Home patientDetails={patientDetails} {...props} />
                        } 
                  /> 
              </Switch>
      </Router>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
      {
        setDispatchParams, patientDetails
      },
      dispatch
    )
});

const mapStateToProps = state => {
  return state
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));