import React from "react";
import ReactDOM from "react-dom";
// import ReactFCCtest from 'react-fcctest';
import { FaPlay, FaPause, FaSyncAlt } from "react-icons/fa";
import Timer from "./components/Timer";
import Button from "./components/Button";
import Settings from "./components/Settings";

import "./styles.css";

class App extends React.Component {
  state = {
    break_length: 5,
    session_length: 25,
    mode: "Session",
    timer: 1500,
    timerRunning: false
  };

  increment = mode => {
    if (this.state.timerRunning) {
      return;
    }

    if (mode === "session" && this.state.session_length <= 59) {
      this.setState({
        session_length: this.state.session_length + 1,
        timer: this.state.timer + 60
      });
    } else if (mode === "break" && this.state.break_length <= 59) {
      this.setState({
        break_length: this.state.break_length + 1
      });
    }
  };

  decrement = mode => {
    if (this.state.timerRunning) {
      return;
    }

    if (mode === "session" && this.state.session_length >= 2) {
      this.setState({
        session_length: this.state.session_length - 1,
        timer: this.state.timer - 60
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
      timer: 1500,
      mode: "Session"
    });

    clearInterval(this.countdown);
  };

  pauseTimer = () => {
    clearInterval(this.countdown);
    this.setState({ timerRunning: false });
  };

  countDownTimer = seconds => {
    clearInterval(this.countdown);

    this.countdown = setInterval(() => {
      if (this.state.timer === 0 && this.state.mode === "Session") {
        this.beep.play();
        this.setState({
          mode: "Break",
          timer: this.state.break_length * 60 + 1
        });
      }

      if (this.state.timer === 0 && this.state.mode === "Break") {
        this.beep.play();
        this.setState({
          mode: "Session",
          timer: this.state.session_length * 60 + 1
        });
      }

      this.setState({
        timer: this.state.timer - 1
      });
    }, 1000);

    this.setState({
      timerRunning: true
    });
  };

  displayTimeLeft = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedTime = this.formatTime(minutes, remainingSeconds);

    document.title = `(${formattedTime}) - Pomodoro Timer`;

    return formattedTime;
  };

  formatTime = (minutes, remainingSeconds) => {
    return `${minutes < 10 ? 0 : ""}${minutes}:${
      remainingSeconds < 10 ? 0 : ""
    }${remainingSeconds}`;
  };

  render() {
    return (
      <div id="app-container">
        {/* <ReactFCCtest /> */}
        <header className="flex-center">
          <Timer
            mode={this.state.mode}
            timeLeft={this.displayTimeLeft(this.state.timer)}
          />
          <div className="wrapper">
            {this.state.timerRunning === false ? (
              <Button
                id="start_stop"
                onClick={() => {
                  this.countDownTimer(this.state.timer);
                }}
                // iconClass="fas fa-play"
                icon={<FaPlay className="fa fa-play" />}
              >
                Start
              </Button>
            ) : (
              <Button
                id="start_stop"
                onClick={this.pauseTimer}
                icon={<FaPause className="fa fa-pause" />}
                // iconClass="fas fa-pause"
              >
                Pause
              </Button>
            )}

            <Button
              id="reset"
              onClick={this.reset}
              icon={<FaSyncAlt className="fa fa-sync-alt" />}
            >
              Reset
            </Button>
          </div>
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
          ref={audio => {
            this.beep = audio;
          }}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
