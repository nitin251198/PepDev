import './App.css';

import React from "react";

class App extends React.Component {

  state = {
    tasks: ["make coffe", "make notes", "make me"],
    currInput: "",
  };
  render = () =>{
    return (
      <div>
        <input
        className="input-box"
        type="text"
        onChange={(e)=>{
            this.setState({currInput: e.currentTarget.value});
        }}

        onKeyDown = {(e)=>{
          if(e.key == "Enter"){
            this.setState({
              tasks:[...this.state.tasks, this.state.currInput],
              currInput: "",
            });
          }

        }}

        value = {this.state.currInput}
        />

        <ul>
          {
          
          this.state.tasks.map((el) =>{
            return <li>{el} <button>Delete</button></li>
          })
          
          }
        </ul>
      </div>
    );
  }
}

export default App;
