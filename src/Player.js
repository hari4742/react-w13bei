import React from 'react';
import React, { useState } from 'react';
import './style.css';

export default class Player extends React.Component {
  state = {
    person: this.props.playerName,
    svg: ''
  };
  avatardivId = `avatar${this.props.playerIndex}`;
  playerCardId = `playerCard${this.props.playerIndex}`;
  handleChange = el => {
    this.props.changePlayerName(el, this.props.playerIndex);
    this.setState({ person: el.target.value });
  };
  changeAvatar = () => {
    let avatarId = this.state.person;
    fetch('https://api.multiavatar.com/' + JSON.stringify(avatarId))
      .then(res => res.text())
      .then(svg => {
        document.getElementById(this.avatardivId).innerHTML = svg;
      });
  };
  render() {
    return (
      <div id={this.playerCardId}>
        <div id={this.avatardivId}>
          <img src="https://www.svgrepo.com/show/13656/user.svg" alt="Avatar" />
        </div>
        <input 
          type="text"
          onChange={this.handleChange}
          onBlur={this.changeAvatar}
          placeholder="Enter Your Name"
          value={this.props.playerName[this.props.playerIndex]}
        />
        <div id="turn">
          <p className="material-icons">
            {this.props.playerIndex == 0 ? 'close' : 'radio_button_unchecked'}
          </p>
          <p>
            {this.props.stat == 0 && this.props.playerIndex == 0 ? '👆' : ''}
            {this.props.stat == 1 && this.props.playerIndex == 1 ? '👆' : ''}
          </p>
        </div>
      </div>
    );
  }
}
