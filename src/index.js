import React from "react";
import ReactDOM from "react-dom";

import Timer from "./components/Timer";
import Settings from "./components/Settings";

import "./styles.css";

class App extends React.Component {
  state = {
    break_length: 5,
    session_length: 25,
    mode: "Session"
  };

  increment = mode => {
    if (mode === "session") {
      this.setState({
        session_length: this.state.session_length + 1
      });
    } else if (mode === "break") {
      this.setState({
        break_length: this.state.break_length + 1
      });
    }
  };

  decrement = mode => {
    if (mode === "session") {
      this.setState({
        session_length: this.state.session_length - 1
      });
    } else if (mode === "break") {
      this.setState({
        break_length: this.state.break_length - 1
      });
    }
  };

  reset = () => {
    this.setState({
      break_length: 5,
      session_length: 25
    });
  };

  render() {
    return (
      <div id="app-container">
        <header className="flex-center">
          <Timer
            mode={this.state.mode}
            reset={this.reset}
            session_length={this.state.session_length}
          />
        </header>
        <footer>
          <Settings
            label="Session"
            mode="session"
            length={this.state.session_length}
            increment={this.increment}
            decrement={this.decrement}
          />
          <Settings
            label="Break"
            mode="break"
            length={this.state.break_length}
            increment={this.increment}
            decrement={this.decrement}
          />
        </footer>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
