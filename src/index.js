import React from "react";
import ReactDOM from "react-dom";
import Seq from './Seq';
import './index.css';


export default class App extends React.Component {
  constructor(props) {
    super(props);    
  }  

  render() {    
    return (
      <div>        
        <Seq />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
