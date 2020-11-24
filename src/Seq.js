import React from 'react';
import * as Tone from 'tone';

function Seq() {

  const synth = new Tone.Synth().toDestination();
  synth.oscillator.type = "square";  
  const filter = new Tone.Filter(300, 'lowpass', -24).toDestination();
  const feedbackDelay = new Tone.FeedbackDelay(.5, 0.5).toDestination();
  synth.connect(filter);
  
  synth.connect(feedbackDelay);

  Tone.Transport.scheduleRepeat(repeat, '8n');
  Tone.Transport.bpm.value = 90

  
  const notes = ["D3","F3","A3","C4","D4","E4","G4","A4"];  
  
  let index = 0;

  function repeat(time) {    

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
    // change color
    let input = row1.querySelector(`div:nth-child(${stepCount+1}) input`);        
    let divLast;
    if (stepCount === 0) {
      divLast = row1.querySelector(`div:nth-child(${8})`);
      
    } else {
        divLast = row1.querySelector(`div:nth-child(${stepCount})`);
    }    
    divLast.className = 'stepBox';
    let divActive = row1.querySelector(`div:nth-child(${stepCount+1})`);
    divActive.className = 'stepBox active';
    // trigger sound 
    if (input.checked) {
      synth.triggerAttackRelease(notes[parseInt(steps[stepCount].value)-1], '8n', time);      
    }
    index++;
  }


  function startSeq() {    
    Tone.start();
    Tone.Transport.start();
  }

  function stopSeq() {    
    Tone.Transport.stop();
  }
  

  return (
    <React.Fragment>
      <h4>S T 3 P // S 3 Q 1</h4>      
      <div id="row1">
        <div className="stepBox">
          <input type="checkbox" />
          <input type="range" min="1" max="8" defaultValue="1" className="slider" id="step1"/>
        </div>
        <div className="stepBox">
          <input type="checkbox" />
          <input type="range" min="1" max="8" defaultValue="1" className="slider" id="step2"/>
        </div>
        <div className="stepBox">
          <input type="checkbox" />
          <input type="range" min="1" max="8" defaultValue="1" className="slider" id="step3"/>
        </div>
        <div className="stepBox">
          <input type="checkbox" />
          <input type="range" min="1" max="8" defaultValue="1" className="slider" id="step4"/>
        </div>
        <div className="stepBox">
          <input type="checkbox" />
          <input type="range" min="1" max="8" defaultValue="1" className="slider" id="step5"/>
        </div>
        <div className="stepBox">
          <input type="checkbox" />
          <input type="range" min="1" max="8" defaultValue="1" className="slider" id="step6"/>
        </div>
        <div className="stepBox">
          <input type="checkbox" />
          <input type="range" min="1" max="8" defaultValue="1" className="slider" id="step7"/>
        </div>        
        <div className="stepBox">
          <input type="checkbox" />
          <input type="range" min="1" max="8" defaultValue="1" className="slider" id="step8"/>
        </div>        
      </div>
      <button className="btn btn-success" onClick={startSeq}>start</button>
      <button className="btn btn-danger" onClick={stopSeq}>stop</button>
      <div className="slidecontainer">
      </div>
    </React.Fragment>
  )
}

export default Seq;