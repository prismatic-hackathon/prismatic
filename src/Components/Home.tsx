import React, {useState} from 'react';
import logo from '../logo.svg';
import '../App.css';
import Map from 'react-map-gl';

export default function Home() {
    const [birdToggle, setBirdToggle] = useState(true);
    return (
        <div className="Home">
            <div className="Main">
                <div className="Logo">
                </div>
                <div className="Selection">
                    {birdToggle == true? (
                        <div>
                        <p>INSERT BIRD LIST</p>
                        <button type="button" onClick={() => setBirdToggle(!birdToggle)}>Switch to Weather</button>
                    </div>
                    ) :
                    (
                        <div>
                        <p>INSERT WEATHER SELECTOR</p>
                        <button type="button" onClick={() => setBirdToggle(!birdToggle)}>Switch to Birds</button>
                    </div>
                    )
                    
                    }
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
