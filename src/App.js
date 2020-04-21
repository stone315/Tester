import React, { Component } from 'react';
import Circle from './Circle';
import Bubble from './Bubble';
const googleTrends = require('google-trends-api');


class App extends Component {
  constructor(){
    super();
    this.state = {value:""};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    window.open('http://www.google.com/search?q='+this.state.value.toString())
    event.preventDefault();
    

    // Apply google Trends Search here

        
  }
  
  
  




  render(){
    return (
      
      <div className="App">
        <form onSubmit = {this.handleSubmit}>
          <input type = "text" value = {this.state.value} onChange ={this.handleChange} ></input>
          <button type = "submit">Search</button>
        </form>
        
        <Circle textinfo={'hallo'} indice={3}
                radius={25}
                x={100}
                y={250}
                scale={3}
                />


        <Circle textinfo={'we are the champion'} indice={3}
                radius={25}
                x={150}
                y={290}
                scale={3}
                />       
      </div>
    );
  }
}

export default App;
