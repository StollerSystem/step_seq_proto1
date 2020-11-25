import React from 'react';
import * as Tone from 'tone';

function Seq() {  

  const synth = new Tone.Synth();
  synth.oscillator.type = "square";
  const gain = new Tone.Gain(.5);  
  synth.gain = gain;
  const filter = new Tone.Filter(7500, 'lowpass', -24).toDestination();
  const delay = new Tone.FeedbackDelay(.5, 0.5);

  // const env = new Tone.Envelope({
	// 	attack: 0.1,
	// 	decay: 0.2,
	// 	sustain: 0.5,
	// 	release: 0.8,
	// }).toDestination();

  synth.connect(filter);
  
  // filter.connect(delay);

  synth.gain.chain(filter, delay, Tone.Destination);

  Tone.Transport.scheduleRepeat(repeat, '8n');
  Tone.Transport.bpm.value = 90
  
  const notes = ["D3","F3","A3","C4","D4","E4","G4","A4"];  
  
  let index = 0;

  function repeat(time) {
    
    // console.log(synth)
    
    var steps = [
      document.getElementById("step1"),
      document.getElementById("step2"),
      document.getElementById("step3"),
      document.getElementById("step4"),
      document.getElementById("step5"),
      document.getElementById("step6"),
      document.getElementById("step7"),
      document.getElementById("step8")
    ];
    
    const row1 = document.getElementById('row1');
    let stepCount = index % 8;    
    let input = row1.querySelector(`div:nth-child(${stepCount+1}) input[id=c${stepCount+1}]`);        
    // change color
    let divLast;    
    if (stepCount === 0) {
      divLast = row1.querySelector(`div:nth-child(${8})`);
      
    } else {
        divLast = row1.querySelector(`div:nth-child(${stepCount})`);
    }    
    divLast.className = 'stepBox';
    let divActive = row1.querySelector(`div:nth-child(${stepCount+1})`);    
    divActive.className = 'stepBox active';
    // // trigger sound     
    if (input.checked) {
      synth.triggerAttackRelease(notes[parseInt(steps[stepCount].value)-1], '32n');      
    } 
    index++;
  }

  function startSeq() {    

    // console.log(synth)

    Tone.start();
    Tone.Transport.start();
  }

  function stopSeq() {    
    Tone.Transport.stop();
  }  

  window.onload = function() {

    var filterSlide = document.getElementById('filter');
    filterSlide.addEventListener("change", function() {     
      filter.frequency.value = this.value*100;     
    });

    var releaseSlide = document.getElementById('release');
    releaseSlide.addEventListener("change", function() {     
      synth.envelope.release = this.value/2;     
    });
  }     

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-6">
          <div className="container mainBox">
            <h4>S T 3 P // S 3 Q 1</h4>      
            <div id="row1">
              <div className="stepBox">
                <input type="checkbox" id="c1" />
                <input type="range" min="1" max="8" defaultValue="1" className="slider" id="step1"/>
              </div>
              <div className="stepBox">
                <input type="checkbox" id="c2"/>
                <input type="range" min="1" max="8" defaultValue="1" className="slider" id="step2"/>
              </div>
              <div className="stepBox">
                <input type="checkbox" id="c3"/>
                <input type="range" min="1" max="8" defaultValue="1" className="slider" id="step3"/>
              </div>
              <div className="stepBox">
                <input type="checkbox" id="c4"/>
                <input type="range" min="1" max="8" defaultValue="1" className="slider" id="step4"/>
              </div>
              <div className="stepBox">
                <input type="checkbox" id="c5"/>
                <input type="range" min="1" max="8" defaultValue="1" className="slider" id="step5"/>
              </div>
              <div className="stepBox">
                <input type="checkbox" id="c6"/>
                <input type="range" min="1" max="8" defaultValue="1" className="slider" id="step6"/>
              </div>
              <div className="stepBox">
                <input type="checkbox" id="c7"/>
                <input type="range" min="1" max="8" defaultValue="1" className="slider" id="step7"/>
              </div>        
              <div className="stepBox">
                <input type="checkbox" id="c8"/>
                <input type="range" min="1" max="8" defaultValue="1" className="slider" id="step8"/>
              </div>        
            </div>
            <button className="btn btn-success" onClick={startSeq}>start</button>
            <button className="btn btn-danger" onClick={stopSeq}>stop</button>
          </div>
        </div>
        <div className="col-md-6">
          <div className="container controlBox">
            <p>FILTER<input type="range" min="0" max="100" defaultValue="75" className="slider" id="filter"/></p>   
            <p>RELEASE<input type="range" min="0" max="30" defaultValue="5" className="slider" id="release"/></p>        
          </div>          
        </div>
      </div>
    </React.Fragment>
  )
}

export default Seq;