import React, { Component } from 'react'
import './App.css'
// import ValueComp from './ValueStuff'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
// import Route from 'react-router-dom/Route'
const fetch = require('node-fetch')

/* eslint-disable */

class Child extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      thing: [],
    }
  }

  componentDidMount() {
    fetch(`${this.props.match.url}`)
      .then(res => res.json())
      .then(thing => this.setState({
        thing,
      }))
  }
  render () {
    return(
       <div>
        <ul>
          {this.state.thing.map(category =>
            <li>
              <hi>Question: {category.q} </hi>
                <li></li><li></li><li></li>Scroll down for answer!<li></li><li></li><li></li><li></li><li></li><li></li><li></li>
                <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
                <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
                <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
                <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
                <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
                <hi>Answer: {category.a}</hi>
            </li>                  
          )}
        </ul>
      </div>
    )
  }
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      thing: [],
      hasFetched: false
    }
  }
  
  componentDidMount() {
    this.fetchData()
  }

  fetchData(url) {
    fetch(url)
      .then(res => res.json())
      .then(thing => this.setState({
        thing,
        hasFetched: true
      }))
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (this.state.hasFetched) {
      this.state.hasFetched = false
      return false
    }
    return true
  }

  render () {
    return (
      <Router>
        <div className='App'>

          <Route
            path='/' render={
              () => {
                return (
                  <div>
                    <h1>Welcome to Jeopardy</h1>
                    <h1>Choose an option to search by below</h1>
                    <ul>
                      <li>
                        <Link to='/api/categories'>By Categories</Link>
                      </li>
                      <li>
                        <Link to='/api/values'>By Value</Link>
                      </li>
                      <li>
                        <Link to='/api/days'>By Day, Year, or Month Aired</Link>
                      </li>
                    </ul>
                  </div>
                )
              }
            }
          />

          <Route
            path='/api/categories' render={
              () => {
                this.fetchData('/api/categories')
                return (
                  <div>
                    <h1 />
                    <h1 />
                    <hi>Click on a category to get a question!</hi>
                    <h1 />
                    <ul>
                      {this.state.thing.map(category =>
                        <li>
                          <Link to={`/api/categories/${category.cat}`}>{category.cat}</Link>
                        </li>
                      )}
                    </ul>
                  </div>
                )
              }
            }
          />

          <Route path='/api/categories/:id' component={Child}/>


          <Route
            path='/api/values' render={
              () => {
                return (
                  <div>
                    <h1 />
                    <h1 />
                    <hi>Click below to a question based on point value</hi>
                    <h1 />
                    <hi>Note: higher value = more difficult!</hi>
                    <ul>
                      <li>
                        <Link to='/api/values/100'>100 Points</Link>
                      </li>
                      <li>
                        <Link to='/api/values/200'>200 Points</Link>
                      </li>
                      <li>
                        <Link to='/api/values/300'>300 Points</Link>
                      </li>
                      <li>
                        <Link to='/api/values/400'>400 Points</Link>
                      </li>
                      <li>
                        <Link to='/api/values/500'>500 Points</Link>
                      </li>
                    </ul>
                  </div>
                )
              }
            }
          />

          <Route path='/api/values/:id' component={Child}/>

          <Route
            path='/api/days' render={
              () => {
                this.fetchData('/api/days')
                return (
                  <div>
                    <h1 />
                    <h1 />
                    <hi>Click on a date to get a question from the Jeopardy aired that day!</hi>
                    <h1 />
                    <ul>
                      {this.state.thing.map(day =>
                        <li>
                          <Link to={`/api/days/${day.cat}`}>{day.cat}</Link>
                        </li>
                      )}
                    </ul>
                  </div>
                )
              }
            }
          />

         <Route path='/api/days/:id' component={Child}/>

        </div>
      </Router>
    )
  }
}
export default App

