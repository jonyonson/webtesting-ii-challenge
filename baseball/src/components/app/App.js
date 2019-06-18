import React, { Component } from 'react';
import Display from '../display';
import Dashboard from '../dashboard';
import Diamond from '../diamond';

class App extends Component {
  state = {
    strikes: 0,
    balls: 0,
    outs: 0,
    lastAB: null,
    inningOver: false,
    runnerOnFirst: false,
    runnerOnSecond: false,
    runnerOnThird: false,
    runs: 0,
    score: false,
  };

  render() {
    const {
      strikes,
      balls,
      outs,
      lastAB,
      inningOver,
      runnerOnFirst,
      runnerOnSecond,
      runnerOnThird,
    } = this.state;

    return (
      <div className="App">
        <div>
          <Display
            strikes={strikes}
            balls={balls}
            outs={outs}
            lastAB={lastAB}
            inningOver={inningOver}
            goToNextInning={this.goToNextInning}
          />
          <Dashboard inningOver={inningOver} handlePitch={this.handlePitch} />

          <div className="runs">
            <h1 className={this.state.runs ? 'run-title' : 'runs-title hidden'}>
              Runs: {this.state.runs}
            </h1>
          </div>
        </div>
        <Diamond
          score={this.state.score}
          runnerOnFirst={runnerOnFirst}
          runnerOnSecond={runnerOnSecond}
          runnerOnThird={runnerOnThird}
        />
      </div>
    );
  }

  goToNextInning = () => {
    this.setState({
      strikes: 0,
      balls: 0,
      outs: 0,
      lastAB: null,
      inningOver: false,
      runnerOnFirst: false,
      runnerOnSecond: false,
      runnerOnThird: false,
    });
  };

  handlePitch = e => {
    const result = e.target.id;
    const { strikes, balls, outs } = this.state;
    if (result === 'strike') {
      if (strikes < 2) {
        this.setState({ strikes: strikes + 1 });
      } else {
        this.setState(
          {
            strikes: 0,
            balls: 0,
            outs: outs + 1,
            lastAB: 'STRIKE OUT',
          },
          () => {
            if (this.state.outs === 3) {
              this.setState({ inningOver: true });
            }
          }
        );
      }
    }

    if (result === 'foul') {
      if (strikes < 2) {
        this.setState({ strikes: strikes + 1 });
      }
    }

    if (result === 'ball') {
      if (balls < 3) {
        this.setState({ balls: balls + 1 });
      } else {
        this.setState(
          {
            strikes: 0,
            balls: 0,
            outs: 0,
            lastAB: 'WALK',
          },
          () => this.moveBaseRunners()
        );
      }
    }

    if (result === 'hit') {
      this.setState(
        {
          strikes: 0,
          balls: 0,
          lastAB: 'HIT',
        },
        () => this.moveBaseRunners()
      );
    }
  };

  moveBaseRunners = e => {
    const { runnerOnFirst, runnerOnSecond, runnerOnThird, runs } = this.state;

    if (!runnerOnFirst && !runnerOnSecond && !runnerOnThird) {
      this.setState({ runnerOnFirst: true });
    }

    if (runnerOnFirst && !runnerOnSecond && !runnerOnThird) {
      this.setState({ runnerOnFirst: true, runnerOnSecond: true });
    }

    if (runnerOnFirst && runnerOnSecond && !runnerOnThird) {
      this.setState({
        runnerOnFirst: true,
        runnerOnSecond: true,
        runnerOnThird: true,
      });
    }

    if (runnerOnFirst && runnerOnSecond && runnerOnThird) {
      this.setState(
        {
          runnerOnFirst: true,
          runnerOnSecond: true,
          runnerOnThird: true,
          runs: runs + 1,
        },
        () => this.flashHomeBase
      );
    }
  };
}

export default App;
