import React from 'react';

export default function Display(props) {
  return (
    <div className="display">
      <div className="pitch-count">
        <h3>Pitch Count</h3>
        <div>Balls: {props.balls}</div>
        <div>Strikes: {props.strikes}</div>
        <div>Outs: {props.outs}</div>
      </div>
      {props.lastAB && !props.inningOver && (
        <div className="last-at-bat">
          <h3>Last At Bat</h3>
          <h2>{props.lastAB}</h2>
        </div>
      )}
      {props.inningOver && (
        <div className="inning-over">
          <h3>Inning Over</h3>
          <button onClick={props.goToNextInning}>Next Inning</button>
        </div>
      )}
    </div>
  );
}
