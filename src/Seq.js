import React from 'react';
import * as Tone from 'tone';
import {ReactComponent as Star1} from './Pentagram.svg';

function Seq() {  

  const synth = new Tone.Synth();  
  const filter = new Tone.Filter(7500, 'lowpass', -24)
  const delay = new Tone.FeedbackDelay(.5, .5);  
  const dist = new Tone.Distortion(0);
  const notes = ["D3","F3","A3","C4","D4","E4","G4","A4"];    
  let index = 0;    
  var vol = new Tone.Volume(-12).toDestination();
  

  delay.wet.value = 0;
  delay.gain = 1;
  synth.oscillator.type = "square";  
  synth.chain(dist,filter,delay,vol)
  Tone.Transport.scheduleRepeat(repeat, '8n');
  Tone.Transport.bpm.value = 90  
  

  function repeat(time) {    
    pentFlash(false);
    const row1 = document.getElementById('row1');
    let stepCount = index % 8;    
    let input = row1.querySelector(`div:nth-child(${stepCount+1}) input[id=c${stepCount+1}]`);
    var stepSliders = [
      document.getElementById("step1"),
      document.getElementById("step2"),
      document.getElementById("step3"),
      document.getElementById("step4"),
      document.getElementById("step5"),
      document.getElementById("step6"),
      document.getElementById("step7"),
      document.getElementById("step8")
    ];    
    
    if (input.checked) {
      pentFlash(true);
      synth.triggerAttackRelease(notes[parseInt(stepSliders[stepCount].value)-1], '32n',time);      
    } 
    index++;
    stepVisual(stepCount,row1);
  }


  function stepVisual(stepCount,row1) {
    let divLast;    
    if (stepCount === 0) {
      divLast = row1.querySelector(`div:nth-child(${8})`);      
    } else {
        divLast = row1.querySelector(`div:nth-child(${stepCount})`);
    }    
    divLast.className = 'stepBox';
    let divActive = row1.querySelector(`div:nth-child(${stepCount+1})`);    
    divActive.className = 'stepBox active';    
  }

  function pentFlash(bool) {
    let pent = document.getElementById('pent');
    if (bool) {
      pent.setAttribute("fill", '#6aff00');
    } else {
      pent.setAttribute("fill", 'black');
    }
  }


  function startSeq() {    
    Tone.start();
    Tone.Transport.start();
  }

  function stopSeq() {    
    Tone.Transport.stop();
  }  

  window.onload = function() {

    var volumeSlide = document.getElementById('volume');
    volumeSlide.addEventListener("change", function() {     
      vol.volume.value = this.value-35;     
    });

    var filterSlide = document.getElementById('filter');
    filterSlide.addEventListener("change", function() {     
      filter.frequency.value = this.value*100;     
    });

    var releaseSlide = document.getElementById('release');
    releaseSlide.addEventListener("change", function() {     
      synth.envelope.release = this.value/2;     
    });

    var distortionSlide = document.getElementById('distortion');
    distortionSlide.addEventListener("change", function() {     
      dist.distortion = this.value/10;     
    });

    var delaySlide = document.getElementById('delay');
    delaySlide.addEventListener("change", function() {     
      delay.wet.value = this.value/10;     
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
            <p>VOLUME<input type="range" min="0" max="35" defaultValue="10" className="slider" id="volume"/></p>
            <p>FILTER<input type="range" min="0" max="100" defaultValue="75" className="slider" id="filter"/></p>   
            <p>RELEASE<input type="range" min="0" max="30" defaultValue="5" className="slider" id="release"/></p> 
            <p>DISTORTION<input type="range" min="0" max="30" defaultValue="0" className="slider" id="distortion"/></p>
            <p>DELAY<input type="range" min="0" max="10" defaultValue="0" className="slider" id="delay"/></p>            
          </div>
          <div className="star">        
            <Star1 id="pent" fill="black"/>       
          </div>          
        </div>
      </div>
      <div className="row container">
        
      </div>
    </React.Fragment>
  )
}

export default Seq;