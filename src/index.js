import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { FaPlay, FaPause, FaSyncAlt } from "react-icons/fa";
import Timer from "./components/Timer";
import Button from "./components/Button";
import Settings from "./components/Settings";

import "./styles.css";

const App = () => {
  const [breakLength, setBreakLength] = useState(5 * 60);
  const [longBreakLength, setLongBreakLength] = useState(15 * 60);
  const [sessionLength, setSessionLength] = useState(25 * 60);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [mode, setMode] = useState("Session");
  const [seconds, setSeconds] = useState(25 * 60);
  const [isTimerRunning, setTimerRunning] = useState(false);

  const audio = document.getElementById("audio");

  useEffect(() => {
    const interval = setInterval(() => {
      if (isTimerRunning) {
        if (seconds === 0 && mode === "Session") {
          audio.play();
          setCompletedPomodoros(completedPomodoros + 1);
          setMode("Short Break");
          setSeconds(breakLength);
        }

        if (
          (seconds === 0 && mode === "Short Break") ||
          mode === "Long Break"
        ) {
          audio.play();
          setMode("Session");
          setSeconds(sessionLength);
        }
        setSeconds(seconds => seconds - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [
    audio,
    breakLength,
    completedPomodoros,
    isTimerRunning,
    longBreakLength,
    mode,
    seconds,
    sessionLength
  ]);

  function handleReset() {
    setBreakLength(5 * 60);
    setLongBreakLength(15 * 60);
    setSessionLength(25 * 60);
    setMode("Session");
    setSeconds(25 * 60);
    setTimerRunning(false);
  }

  function handleStartTimer() {
    setTimerRunning(true);
  }

  function handlePauseTimer() {
    setTimerRunning(false);
  }

  function displayTimeLeft(seconds) {
    const remainingMinutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return getFormattedTime(remainingMinutes, remainingSeconds);
  }

  function getFormattedTime(remainingMinutes, remainingSeconds) {
    return `${remainingMinutes < 10 ? 0 : ""}${remainingMinutes}:${
      remainingSeconds < 10 ? 0 : ""
    }${remainingSeconds}`;
  }

  const handleIncrement = mode => {
    if (isTimerRunning) {
      return;
    }

    if (mode === "Session" && sessionLength <= 3540) {
      setSessionLength(sessionLength + 60);
      setSeconds(sessionLength + 60);
    } else if (mode === "Short Break" && breakLength <= 3540) {
      setBreakLength(breakLength + 60);
    } else if (mode === "Long Break" && longBreakLength <= 3540) {
      setLongBreakLength(longBreakLength + 60);
    }
  };

  const handleDecrement = mode => {
    if (isTimerRunning) {
      return;
    }

    if (mode === "Session" && sessionLength >= 120) {
      setSessionLength(sessionLength - 60);
      setSeconds(sessionLength - 60);
    } else if (mode === "Short Break" && breakLength >= 120) {
      setBreakLength(breakLength - 60);
    } else if (mode === "Long Break" && longBreakLength >= 120) {
      setLongBreakLength(longBreakLength - 60);
    }
  };

  return (
    <div id="app-container">
      <header className="flex-center">
        <Timer mode={mode} timeLeft={displayTimeLeft(seconds)} />
        <div className="wrapper">
          {isTimerRunning ? (
            <Button
              id="start_stop"
              onClick={handlePauseTimer}
              icon={<FaPause className="fa fa-pause" />}
            >
              Pause
            </Button>
          ) : (
            <Button
              id="start_stop"
              onClick={handleStartTimer}
              icon={<FaPlay className="fa fa-play" />}
            >
              Start
            </Button>
          )}

          <Button
            id="reset"
            onClick={handleReset}
            icon={<FaSyncAlt className="fa fa-sync-alt" />}
          >
            Reset
          </Button>
        </div>
      </header>
      <footer>
        <Settings
          mode="Session"
          length={sessionLength}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
        />
        <Settings
          mode="Short Break"
          length={breakLength}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
        />
        <Settings
          mode="Long Break"
          length={longBreakLength}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
        />
      </footer>
      <audio id="audio" preload="auto" src="harp-chord-glissando.mp3" />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
