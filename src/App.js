import React, { Component } from 'react';
import './App.css';
export default class App extends Component {
  state = {
    tickTime: 200,
    rows: 15,
    cols: 15,
    grid: [],
    food: {},
    snake: {
      head: {},
      tail: [],
    },
    currentDirection: 'right',
    die: false,

  };

  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  randomFood() {
    return {
      row: Math.floor((Math.random() * this.state.rows)),
      col: Math.floor((Math.random() * this.state.cols))
    }
  }

  getCenterOfGrid() {
    return {
      row: Math.floor((this.state.rows - 1) / 2),
      col: Math.floor((this.state.cols - 1) / 2),
    }
  }

  resetGrid(state = {}, sendBack = false) {

    if (!Object.keys(state).length) {
      state = this.state;
    }

    const grid = [];
    const {
      rows,
      cols,
      food,
      snake
    } = state;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const isFood = (food.row === row && food.col === col);
        const isHead = (snake.head.row === row && snake.head.col === col);
        let isTail = false;
        snake.tail.forEach(t => {
          if (t.row === row && t.col === col) {
            isTail = true;
          }
        })

        grid.push({
          row,
          col,
          isFood,
          isHead,
          isTail,
        })
      }
    }

    if (sendBack) {
      return grid;
    } else {
      this.setState({
        grid
      })
    }
  }
  restart() {

  }
  gameTick() {
    this.setState((state) => {
      let {
        currentDirection,
        snake,
        food
      } = state;
      let {
        tail
      } = snake;

      const {
        row,
        col
      } = state.snake.head;
      let head = {
        row,
        col
      };

      if (state.die) {
        clearInterval(window.fnInterval);
      }

      tail.unshift({
        row: head.row,
        col: head.col,
      })

      if (head.row === state.food.row && head.col === state.food.col) {
        food = this.randomFood();
      } else {
        tail.pop();
      }

      switch (currentDirection) {
        case 'left':
          head.col--;
          break;

        case 'up':
          head.row--;
          break;

        case 'down':
          head.row++;
          break;

        case 'reload':
          this.setState({} = this.state)
          break;

        case 'right':
        default:
          head.col++;
          break;
      }

      const newState = {
        ...state,
        food,
        snake: {
          head,
          tail
        }
      }

      let die = false;
      if (newState.snake.head.row < 0 ||
        newState.snake.head.row >= this.state.rows ||
        newState.snake.head.col < 0 ||
        newState.snake.head.col >= this.state.rows
      ) {
        die = true;
      }

      const grid = this.resetGrid(newState, true);

      return {
        ...newState,
        die,
        grid,

      }
    });

  }

  handleKeyPress(e) {
    let {
      currentDirection,
      direction,
    } = this.state;

    switch (e.keyCode) {
      case 38:
      case 87:
        if (direction !== "up" && direction !== "down") {
          currentDirection = "up";
        }
        break;
      case 40:
      case 83:
        if (direction !== "up" && direction !== "down") {
          currentDirection = "down";
        }
        break;
      case 37:
      case 65:
        if (direction !== "left" && direction !== "right") {
          currentDirection = "left";
        }
        break;
      case 39:
      case 68:
        if (direction !== "left" && direction !== "right") {
          currentDirection = "right";
        }
        break;
      case 81:
        currentDirection = "reload";
        break;
    }
    const newState = {
      ...this.state,
      direction,
      currentDirection,
    }
    const grid = this.resetGrid(newState, true);


    this.setState(state => {
      return {
        ...newState,
        grid
      }
    })
  }

  componentDidMount() {

    document.body.addEventListener('keydown', this.handleKeyPress);

    this.setState((state) => {
      const newState = {
        ...state,
        food: this.randomFood(),
        snake: {
          head: this.getCenterOfGrid(),
          tail: state.snake.tail
        }
      };
      const grid = this.resetGrid(newState, true);
      return {
        ...newState,
        grid,
      }
    });

    this.resetGrid();
    window.fnInterval = setInterval(() => {
      this.gameTick();
    }, this.state.tickTime);
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleKeyPress);
    clearInterval(window.fnInterval);
  }

  render() {
    let gridContent = this.state.grid.map((grid) => {
      return <div
        key={grid.row.toString() + '-' + grid.col.toString()}
        className={
          grid.isHead
            ? 'item is-head' : grid.isTail
              ? 'item is-tail' : grid.isFood
                ? 'item is-food' : 'item'
        }></div>
    });
    if (this.state.die) {
      gridContent = <div className="grid-message">
        <h1>Game Over</h1>
      </div>;
    };
    return (
      <div className="snake-container wrapper">
        <div className="grid">{gridContent}</div>
      </div>
    );
  }
}

