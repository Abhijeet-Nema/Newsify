import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

export default class App extends Component {

  state = {
    progress: 10
  }

  apiKey = process.env.REACT_APP_NEWS_API; 

  changeProgress = (progress)=>{
    this.setState({progress: progress});
  }

  pageSize = 12;
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
            height={3}
          />
          <Switch>
            <Route exact path="/"> <News badgeColor="primary" key="general" pageSize={this.pageSize} changeProgress={this.changeProgress} country="in" apiKey={this.apiKey} category="general" /> </Route>
            <Route exact path="/business"> <News badgeColor="info" key="business" pageSize={this.pageSize} changeProgress={this.changeProgress} country="in" apiKey={this.apiKey} category="business" /> </Route>
            <Route exact path="/entertainment"> <News badgeColor="danger" key="entertainment" pageSize={this.pageSize} changeProgress={this.changeProgress} country="in" apiKey={this.apiKey} category="entertainment" /> </Route>
            <Route exact path="/health"> <News badgeColor="warning" key="health" pageSize={this.pageSize} changeProgress={this.changeProgress} country="in" apiKey={this.apiKey } category="health" /> </Route>
            <Route exact path="/sports"> <News badgeColor="success" key="sports" pageSize={this.pageSize} changeProgress={this.changeProgress} country="in" apiKey={this.apiKey } category="sports" /> </Route>
            <Route exact path="/technology"> <News badgeColor="dark" key="technology" pageSize={this.pageSize} changeProgress={this.changeProgress} country="in" apiKey={this.apiKey} category="technology" /> </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

