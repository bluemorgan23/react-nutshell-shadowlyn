import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import TaskList from './Tasks/TaskList'
import TaskManager from '../modules/TaskManager'
import Login from './login/Login'
import ResourceManager from '../modules/ResourceManager'
import TaskForm from "./Tasks/TaskForm";

export default class ApplicationViews extends Component {

  state = {
    users: [],
    messages: [],
    articles: [],
    friends: [],
    tasks: [],
    events: [],
    userId: ""
  }

  componentDidMount() {
    let currentUserId = sessionStorage.getItem("userID")
  
    this.loadAllData(currentUserId)
  }

  loadAllData = (currentUserId) => {
    const newState = {

    }

    ResourceManager.getAll("messages", currentUserId)
      .then(messages => newState.messages = messages)
    ResourceManager.getAll("articles", currentUserId)
      .then(articles => newState.articles = articles)
    ResourceManager.getAll("friends", currentUserId)
      .then(friends => newState.friends = friends)
    ResourceManager.getAll("tasks", currentUserId)
      .then(tasks => newState.tasks = tasks)
    ResourceManager.getAll("events", currentUserId)
      .then(events => newState.events = events)
      .then(() => this.setState(newState))
  }
addTask = task => 
  TaskManager.post(task)
  .then(()=>TaskManager.getAll())
  .then(tasks =>
    this.setState({
      tasks: tasks
    }))

onLogin = () => {
  this.setState({
    userId: sessionStorage.getItem("userID")
  })
  this.loadAllData(this.state.userId)
}

  isAuthenticated = () => sessionStorage.getItem("userID") !== null


  render() {
    console.log(this.state)
    return (
      <React.Fragment>

        <Route
          exact path="/login" render={props => {
            return <Login users={this.state.users}
              onLogin={this.onLogin} {...props} />
            // Remove null and return the component which will handle authentication
          }}
        />

        <Route
          exact path="/" render={props => {
            return null
            // Remove null and return the component which will show news articles
          }}
        />

        <Route
          path="/friends" render={props => {
            if (this.isAuthenticated()) {
              return <div>Hello</div>
            } else {
              return <Redirect to="/login" />
            }
          }}
        />

        <Route
          path="/messages" render={props => {
            return null
            // Remove null and return the component which will show the messages
          }}
        />

        <Route
          path="/events" render={props => {
            return null
            // Remove null and return the component which will show the user's events
          }}
        />

        <Route
          exact path="/tasks" render={props => {
            return <TaskList tasks={this.state.tasks}
            />
            // Remove null and return the component which will show the user's tasks
          }}
        />

        <Route path="/tasks/new" render={(props)=> {
          return <TaskForm {...props}
            addTask={this.addTask}
            />
        }} />
      </React.Fragment>
    );
  }
}
