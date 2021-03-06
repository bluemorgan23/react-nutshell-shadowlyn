import React, { Component } from 'react'
import ResourceManager from '../../modules/ResourceManager'

export default class EventEditForm extends Component {

    state = {
        location: "",
        event: "",
        date: "",
        userId: ""
    }

    handleFieldChange = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }
    updateExistingEvent = (event) => {
        event.preventDefault()

        const editedEvent = {
            id: Number(this.props.match.params.eventId),
            location: this.state.location,
            event: this.state.event,
            date: this.state.date,
            userId: Number(sessionStorage.getItem("userID"))
        };

        this.props.updateEvent(editedEvent)
            .then(() => this.props.history.push("/events"))

    }
    //used to store current state into placeholder fields.
    componentDidMount() {
        ResourceManager.getOneEntry(this.props.match.params.eventId, "events")
            .then(event => {
                this.setState({
                    location: event.location,
                    event: event.event,
                    date: event.date,
                    userId: event.userId
                });
            });
    }
    render() {
        return (
            <React.Fragment>
                <form>
                    <div className="form-group">
                        <label htmlFor="nameInput">Event Name</label>
                        <input className="form-control" type="text"
                            id="event"
                            required
                            value={this.state.event}
                            onChange={this.handleFieldChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateInput">Event Date</label>
                        <input className="form-control" type="date"
                            id="date"
                            required
                            value={this.state.date}
                            onChange={this.handleFieldChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="locationInput">Event Location</label>
                        <input className="form-control" type="text"
                            id="location"
                            required
                            value={this.state.location}
                            onChange={this.handleFieldChange} />
                    </div>
                    <button className="btn btn-primary" onClick={this.updateExistingEvent}>Update Event</button>
                </form>
            </React.Fragment>
        )
    }
}