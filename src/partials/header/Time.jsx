import React, { Component } from "react";
class Time extends Component {
  constructor(props) {
    super(props);
    //This declared the state of time at the very beginning
    this.state = {
      time: new Date().toLocaleTimeString(),
      date: new Date().toDateString('id-ID')
    };
  }

  //This happens when the component mount and the setInterval function get called with a call back function updateTime()
  componentDidMount() {
    this.intervalID = setInterval(() => this.updateTime(), 1000);
  }

  //This section clears setInterval by calling intervalID so as to optimise memory
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  //This function set the state of the time to a new time
  updateTime() {
    this.setState({
      time: new Date().toLocaleTimeString(),
      date: new Date().toDateString('id-ID')
    });
  }
  render() {
    return (
      <div className="text-white hidden md:block">
        <p className=""> {this.state.date} | {this.state.time}</p>
      </div>
    );
  }
}
export default Time;
