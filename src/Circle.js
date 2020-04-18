import React, { Component } from 'react';

const NB_CIRCLES = 100;

export default class Circle extends Component {
    constructor() {
      super();
    }
    shouldComponentUpdate(newProps, newState, newContext) {
      return this.props.x != newProps.x || this.props.y != newProps.y || this.props.scale != newProps.scale;
    }
    render() {
      const delta = ~~(25 * this.props.indice / NB_CIRCLES);
      const style = {
        background: `radial-gradient(hsl(220, 66%, ${50 + delta}%), rgba(255,255,255,.5))`,
        border: '0.5px solid black',
        width: this.props.radius,
        height: this.props.radius,
        borderRadius: '50%',
        position: 'absolute',
        transform: `translate(${this.props.x}px, ${this.props.y}px) scale(${this.props.scale})`,
        willChange: 'transform',      
        textAlign: 'center'
      };
      const spanStyle = {
        position: 'relative',
        color: 'black',
        fontSize: this.props.radius / 2,
        top: 0
      };
  
      return <div style={style}><span style={spanStyle}>{ this.props.indice }</span></div>;
    }
  }
  