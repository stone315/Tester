import React, { Component } from 'react';
import Circle from './Circle';
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
    alert("google.com/search?p="+this.state.value.toString());
    event.preventDefault();

    googleTrends.relatedTopics({keyword: 'Dead Pool'})
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }


  render(){
    return (
      <div className="App">
        <form onSubmit = {this.handleSubmit}>
          <input type = "text" value = {this.state.value} onChange ={this.handleChange}></input>
          <button type = "submit">Search</button>
        </form>
        
        <Circle key={3} indice={3}
                radius={25}
                x={100}
                y={250}
                scale={3}
            />
      </div>
    );
  }
}

export default App;
