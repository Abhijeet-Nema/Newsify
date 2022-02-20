import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

export default function App(props) {

  const [progress, setProgress] = useState(10)

  const apiKey = process.env.REACT_APP_NEWS_API; 

  // const changeProgress = (progress)=>{
  //   setProgress(progress);
  // }

  const pageSize = 12;
    return (
      <Router>
        <div>
          <Navbar />
          <LoadingBar
            color='#f11946'
            progress={progress}
            height={3}
          />
          <Switch>
            <Route exact path="/"> <News badgeColor="primary" key="general" pageSize={pageSize} changeProgress={setProgress} country="in" apiKey={apiKey} category="general" /> </Route>
            <Route exact path="/business"> <News badgeColor="info" key="business" pageSize={pageSize} changeProgress={setProgress} country="in" apiKey={apiKey} category="business" /> </Route>
            <Route exact path="/entertainment"> <News badgeColor="danger" key="entertainment" pageSize={pageSize} changeProgress={setProgress} country="in" apiKey={apiKey} category="entertainment" /> </Route>
            <Route exact path="/health"> <News badgeColor="warning" key="health" pageSize={pageSize} changeProgress={setProgress} country="in" apiKey={apiKey } category="health" /> </Route>
            <Route exact path="/sports"> <News badgeColor="success" key="sports" pageSize={pageSize} changeProgress={setProgress} country="in" apiKey={apiKey } category="sports" /> </Route>
            <Route exact path="/technology"> <News badgeColor="dark" key="technology" pageSize={pageSize} changeProgress={setProgress} country="in" apiKey={apiKey} category="technology" /> </Route>
          </Switch>
        </div>
      </Router>
    )
}

