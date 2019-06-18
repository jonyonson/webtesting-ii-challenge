import React from 'react';

export default function(props) {
  return (
    <div className="dashboard">
      <button id="ball" onClick={props.handlePitch} disabled={props.inningOver}>
        BALL
      </button>
      <button
        id="strike"
        onClick={props.handlePitch}
        disabled={props.inningOver}
      >
        STRIKE
      </button>
      <button id="foul" onClick={props.handlePitch} disabled={props.inningOver}>
        FOUL
      </button>
      <button id="hit" onClick={props.handlePitch} disabled={props.inningOver}>
        HIT
      </button>
    </div>
  );
}
