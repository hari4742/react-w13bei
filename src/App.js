import React, { useState } from "react";
import "./style.css";
import Player from "./Player.js";
import Menu from "./Menu.js";

var status = 0;
var gameOver = false;
function Card(props) {
  return (
    <div
      className="card"
      onMouseOver={props.checkresult}
      onClick={props.changeSymbol}
    >
      <span className="material-icons">{props.symbol}</span>
    </div>
  );
}

export default class App extends React.Component {
  cards = [
    { symbol: "" },
    { symbol: "" },
    { symbol: "" },
    { symbol: "" },
    { symbol: "" },
    { symbol: "" },
    { symbol: "" },
    { symbol: "" },
    { symbol: "" },
  ];
  state = {
    cardList: this.cards,
    result: "",
    player: ["Player 1", "Player 2"],
  };
  matchCards = (c1, c2, c3, symbol) => {
    return (
      this.cards[c1].symbol == symbol &&
      this.cards[c2].symbol == symbol &&
      this.cards[c3].symbol == symbol
    );
  };
  checkTie = () => {
    let allCards = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    return allCards.every((val) => {
      return this.cards[val].symbol != "";
    });
  };
  checkWinner = (symbol) => {
    if (
      this.matchCards(0, 1, 2, symbol) ||
      this.matchCards(3, 4, 5, symbol) ||
      this.matchCards(6, 7, 8, symbol) ||
      this.matchCards(0, 3, 6, symbol) ||
      this.matchCards(1, 4, 7, symbol) ||
      this.matchCards(2, 5, 8, symbol) ||
      this.matchCards(0, 4, 8, symbol) ||
      this.matchCards(2, 4, 6, symbol)
    ) {
      if (status == 1) {
        this.setState({ result: `🎉 ${this.state.player[0]}  Won 🏆` });
        gameOver = true;
      } else {
        this.setState({ result: `🎉 ${this.state.player[1]}  Won 🏆` });
        gameOver = true;
      }
    } else if (this.checkTie()) {
      this.setState({ result: "Game is Tied 💪" });
      gameOver = true;
    }
  };
  handleClick = (id) => {
    if (status == 0 && gameOver == false) {
      this.cards[id] = { symbol: "close" };
      status = 1;
    } else if (status == 1 && gameOver == false) {
      this.cards[id] = { symbol: "radio_button_unchecked" };
      status = 0;
    } else {
      alert("Game Over! Reset the Board to Play again.");
    }
    this.setState({ cardList: this.cards });
  };
  handleReset = () => {
    this.cards.forEach((card) => {
      card.symbol = "";
    });
    this.setState({ cardList: this.cards, result: "" });
    gameOver = false;
  };
  handlePlayerName = (el, i) => {
    let players = this.state.player;
    players[i] = el.target.value;
    this.setState({ player: players });
  };
  handelStart = () => {
    document.getElementById("board").classList.remove("board");
    document.getElementById("btnReset").classList.remove("board");
    document.getElementById("btnBack").classList.remove("board");
    document.getElementById("menu").classList.add("board");
  };
  handleBack = () => {
    document.getElementById("board").classList.add("board");
    document.getElementById("btnReset").classList.add("board");
    document.getElementById("btnBack").classList.add("board");
    document.getElementById("menu").classList.remove("board");
  };
  render() {
    return (
      <div id="container">
        <Player
          stat={status}
          playerName={this.state.player}
          playerIndex={0}
          changePlayerName={this.handlePlayerName}
        />
        <div id="game">
          <h1>Tic-Tac-Toe</h1>
          <hr />
          <Menu
            handleClick={this.handelStart}
            playerName={this.state.player}
            changePlayerName={this.handlePlayerName}
          />
          <div className="board" id="board">
            {this.state.cardList.map((card, index) => {
              return (
                <Card
                  key={index}
                  changeSymbol={() => {
                    this.handleClick(index);
                    this.checkWinner("close");
                    this.checkWinner("radio_button_unchecked");
                  }}
                  symbol={card.symbol}
                  checkresult={() => {
                    this.checkWinner("close");
                  }}
                />
              );
            })}
          </div>
          <div id="btns">
            <p id="btnReset" className="board" onClick={this.handleReset}>
              Reset Board
            </p>
            <p id="btnBack" className="board" onClick={this.handleBack}>
              Back
            </p>
          </div>
          <p id="result">{this.state.result}</p>
        </div>
        <Player
          stat={status}
          playerName={this.state.player}
          playerIndex={1}
          changePlayerName={this.handlePlayerName}
        />
      </div>
    );
  }
}
