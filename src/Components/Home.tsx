import React, { useState } from 'react';
import '../App.css';
import './Home.css';

export default function Home() {
  const [birdToggle, setBirdToggle] = useState(true);
  return (
    <div className="Home">
      <div className="Main">
        <div className="Logo"></div>
        <div className="Selection">
          {birdToggle === true ? (
            <div>
              <p>INSERT BIRD LIST</p>
              <button type="button" onClick={() => setBirdToggle(!birdToggle)}>
                Switch to Weather
              </button>
            </div>
          ) : (
            <div>
              <p>INSERT WEATHER SELECTOR</p>
              <button type="button" onClick={() => setBirdToggle(!birdToggle)}>
                Switch to Birds
              </button>
            </div>
          )}
          <p>More Info</p>
        </div>
      </div>
      <div className="MapSection">
        <div className="Map">
          <p>INSERT MAP</p>
        </div>
      </div>
    </div>
  );
}
