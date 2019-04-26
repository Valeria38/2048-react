import React, { Component } from 'react';
import randomId from 'randomid';
import KeyboardEventHandler from 'react-keyboard-event-handler';

class Game extends Component {

  state = {
    cells: Array(16).fill(null),
    template: [...Array(2).fill(4), ...Array(14).fill(2)]
  };

  getRandomTempIndex = () => {
    const { template } = this.state;
    return Math.floor(Math.random() * template.length);
  }

  getRandomCellIndex = () => {
    const { cells } = this.state;
    return Math.floor(Math.random() * cells.length);
  }

  startGame = () => {

    //getting first two numbers: 2 or 4
    const { template } = this.state;
    const tempIndex1 = this.getRandomTempIndex();
    const tempIndex2 = this.getRandomTempIndex();
    const first = template[tempIndex1];
    const second = template[tempIndex2];
    console.log(first, second);
    
    const cellIndex1 = this.getRandomCellIndex();
    let cellIndex2 = this.getRandomCellIndex();
    while (cellIndex2 === cellIndex1) {
      cellIndex2 = this.getRandomCellIndex();
    }
    console.log(cellIndex1, cellIndex2);

    //update cells and re-render
    const newCells = Array(16).fill(null);
    newCells[cellIndex1] = first;
    newCells[cellIndex2] = second;
    
    this.setState({
      cells: newCells
    });
  }

  handleKeyEvent = (key, event) => {
    console.log(key);
  }

  render() {
    const { cells } = this.state;

    return (
      <>
      <div className="restart-button" onClick={this.startGame}>New game</div>

      <div className="game__container">

        <KeyboardEventHandler
          handleKeys={["up", "right", "down", "left"]}
          onKeyEvent={this.handleKeyEvent}
         />

        { cells.map(cell => {

          const color = (cell === 2)? 'two' : 
          (cell === 4) ? 'four' : 
          (cell === 8) ? 'eight' : 
          (cell === 16) ? 'sixteen' : 
          (cell === 32) ? 'thirty-two' : "";

          return (
            <div 
              className={`game__cell ${color}`} 
              key={randomId(12)}
            >{cell}</div>
          )
        }) }

        
        

      </div>

      </>
    )
  }
};

export default Game;
