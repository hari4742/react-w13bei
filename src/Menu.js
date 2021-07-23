import React from 'react';
import './style.css';


export default class Menu extends React.Component{
  state = {
    person: this.props.playerName,
  };
  handleChange = (el,i)=>{
    let players = this.state.person;
    players[i] = el.target.value;
    this.props.changePlayerName(el,i);
    this.setState({person:players})
  };
  changeAvatar = (i) => {
    let avatardivId = `avatar${i}`;
    let avatarId = this.state.person;
    fetch('https://api.multiavatar.com/' + JSON.stringify(avatarId))
      .then(res => res.text())
      .then(svg => {
        document.getElementById(avatardivId).innerHTML = svg;
      });
  };
  render(){
    return(
      <div id="menu">
        <span className="menuOpt"><input tabIndex='0' type="text" onBlur={()=>this.changeAvatar(0)} placeholder="Enter Name" onChange={(el)=>{this.handleChange(el,0)}} value={this.state.person[0]}/></span>
        <span className="menuOpt"><input tabIndex='1'  type="text" onBlur={()=>this.changeAvatar(1)} placeholder="Enter Name" onChange={(el)=>{this.handleChange(el,1)}} value={this.state.person[1]}/></span>
        <p className="menuOpt" tabIndex='2' onClick={this.props.handleClick}>Start Game</p>
      </div>
    );
  }
}