import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

function App() {
  return (
    <div id="App">
      <h1>Pomodoro Timer</h1>
      <div id="timer-container">
        <header className="flex-center">
          <h2 id="timer-label">Session</h2>
          <div id="time-left">25:00</div>
          <div className="wrapper">
            <button id="start_stop">
              <i className="fas fa-play" /> Start
            </button>
            <button id="reset">
              <i className="fas fa-sync-alt" /> Reset
            </button>
          </div>
        </header>
        <footer>
          <div className="time-adjust-wrapper">
            <h3 id="break-label">Session Length</h3>
            <div class="adjust-time">
              <span id="session-increment">
                <i className="fas fa-arrow-circle-up" />
              </span>
              <p>
                <span id="session-length"> 25</span> min
              </p>
              <span id="session-decrement">
                <i className="fas fa-arrow-circle-down" />
              </span>
            </div>
          </div>

          <div className="time-adjust-wrapper">
            <h3 id="session-label">Break Length</h3>
            <div className="adjust-time">
              <span id="break-increment">
                <i className="fas fa-arrow-circle-up" />
              </span>
              <p>
                <span id="break-length"> 5</span> min
              </p>
              <span id="break-decrement">
                <i className="fas fa-arrow-circle-down" />
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));