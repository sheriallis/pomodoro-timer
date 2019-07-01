import React from "react";
import ReactDOM from "react-dom";
import ReactFCCtest from 'react-fcctest';

import Timer from "./components/Timer";
import Settings from "./components/Settings";

import "./styles.css";

class App extends React.Component {
  state = {
    break_length: 5,
    session_length: 25,
    mode: "Session",
    timerRunning: false
  };

  increment = mode => {
    if(this.state.timerRunning === true){
      return;
    }

    if (mode === "session" && this.state.session_length <= 59) {
      this.setState({
        session_length: this.state.session_length + 1,
      });
    } else if (mode === "break" && this.state.break_length <= 59) {
      this.setState({
        break_length: this.state.break_length + 1,

      });
    }
  };

  decrement = mode => {
    if(this.state.timerRunning === true){
      return;
    }

    if (mode === "session" && this.state.session_length >= 2) {
      this.setState({
        session_length: this.state.session_length - 1,
      });
    } else if (mode === "break" && this.state.break_length >= 2) {
      this.setState({
        break_length: this.state.break_length - 1
      });
    }
  };

  reset = () => {
    this.beep.pause();
    this.beep.currentTime = 0;

    this.setState({
      break_length: 5,
      session_length: 25,
      timerRunning: false,
      mode: "Session"
    });

    document.getElementById("time-left").innerText = "25:00"

    clearInterval(this.countdown);
  };

  countDownTimer = (minutes) => {
    const seconds = minutes * 60;
    const beginTime = Date.now();
    const endTime = beginTime + seconds * 1000;
    clearInterval(this.countdown);
    // this.displayTimeLeft(seconds);

    this.countdown = setInterval(() => {
      const secondsLeft = Math.round((endTime - Date.now()) / 1000);
  
      if (secondsLeft < 0) {
        this.beep.play();
        clearInterval(this.countdown);
        // Switch between Break and Session mode
        if(this.state.mode === "Session"){
          this.setState({
            mode: "Break"
          });

          this.countDownTimer(this.state.break_length);
        } else if (this.state.mode === "Break"){
          this.setState({
            mode: "Session"
          });

          this.countDownTimer(this.state.session_length);
        }

        return;
      }
      this.displayTimeLeft(secondsLeft);
    }, 1000);

    this.setState({
      timerRunning: true
    })

  }

  displayTimeLeft = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    document.getElementById("time-left").innerText = this.formatTime(minutes, remainingSeconds);
  }

  formatTime = (minutes, remainingSeconds) => {
    return `${minutes < 10 ? 0 : ""}${minutes}:${
      remainingSeconds < 10 ? 0 : ""
    }${remainingSeconds}`;
  }

  render() {
    return (
      <div id="app-container">
         <ReactFCCtest />
        <header className="flex-center">
          <Timer
            mode={this.state.mode}
            reset={this.reset}
            session_length={this.state.session_length}
            break_length={this.state.break_length}
            countDownTimer={this.countDownTimer}
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
        <audio 
          id="beep" 
          preload="auto"
          src="pomodoro-beep.mp3"
          ref={(audio) => {this.beep = audio}}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
