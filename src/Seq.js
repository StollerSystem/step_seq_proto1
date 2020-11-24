import React from 'react';
import * as Tone from 'tone';

function Seq() {

  const synth = new Tone.Synth().toDestination();
  synth.oscillator.type = "square";  
  const filter = new Tone.Filter(150, 'lowpass').toDestination();
  const feedbackDelay = new Tone.FeedbackDelay(.5, 0.5).toDestination();
  synth.connect(filter);
  synth.connect(feedbackDelay);

  Tone.Transport.scheduleRepeat(repeat, '8n');
  Tone.Transport.bpm.value = 90

  
  const notes = ["D3","F3","A3","C4","D4"];  
  
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
    let input = row1.querySelector(`div:nth-child(${stepCount+1}) input`);    
    console.log(input)
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

  function testBoop() {    
    const now = Tone.now();    
    synth.triggerAttack("D4", now);
    synth.triggerRelease(now + .5);   
  }

  return (
    <React.Fragment>
      <p>S T 3 P // S 3 Q</p>
      {/* <button onClick={testBoop}>test boop</button> */}
      {/* <div id="row1">
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
      </div> */}

      <div id="row1">
        <div>
          <input type="checkbox" />
        </div>
        <div>
          <input type="checkbox" />
        </div>
        <div>
          <input type="checkbox" />
        </div>
        <div>
          <input type="checkbox" />
        </div>
        <div>
          <input type="checkbox" />
        </div>
        <div>
          <input type="checkbox" />
        </div>
        <div>
          <input type="checkbox" />
        </div>
        <div>
          <input type="checkbox" />
        </div>
        <div>
          <input type="checkbox" />
        </div>
        
      </div>


      <button onClick={startSeq}>start</button>
      <button onClick={stopSeq}>stop</button>
      <div className="slidecontainer">
        <input type="range" min="1" max="5" defaultValue="1" className="slider" id="step1"/>
        <input type="range" min="1" max="5" defaultValue="1" className="slider" id="step2"/>
        <input type="range" min="1" max="5" defaultValue="1" className="slider" id="step3"/>
        <input type="range" min="1" max="5" defaultValue="1" className="slider" id="step4"/>
        <input type="range" min="1" max="5" defaultValue="1" className="slider" id="step5"/>
        <input type="range" min="1" max="5" defaultValue="1" className="slider" id="step6"/>
        <input type="range" min="1" max="5" defaultValue="1" className="slider" id="step7"/>
        <input type="range" min="1" max="5" defaultValue="1" className="slider" id="step8"/>
      </div>
    </React.Fragment>
  )
}

export default Seq;