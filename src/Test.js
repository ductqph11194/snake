import React, { useState, useEffect } from 'react';
import './App.css';

const

function Test(props) {

    const [table, setTable] = useState({
        rows: 15, const
        cols: 15, const
        grid: [1
        ],
        food: {}, 2
        snake: {
        3
            head: {},
        tail: [],
        },
currentDirection: 'right', 4
    });

const [tickk, setTickk] = useState(0);

const resetGrid = (state = {}, sendBack = false) => {
    if (!Object.keys(state).length) {
        state = table;
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
        setTable({
            ...table,
            grid
        })
    }
}
const gameTick = () => {
    setTickk(counter => counter + 1);
}



useEffect(() => {

    document.body.addEventListener('keydown', handleKeyPress);

    const newState = {
        ...table,
        food: getRandomFood(),
        snake: {
            head: getHeadStart(),
            tail: table.snake.tail

        }
    };

    const grid = resetGrid(newState, true);
    setTable({
        ...newState,
        grid,
    })

    resetGrid();

    // Set tick
    window.fnInterval = setInterval(() => {
        gameTick();
    }, 200);
}, [])

useEffect(() => {
    let {
        currentDirection,
        snake,
        food
    } = table;
    let {
        tail
    } = snake;

    const {
        row,
        col
    } = table.snake.head;
    let head = {
        row,
        col
    };
    if (table.die) {
        clearInterval(window.fnInterval);
    }

    tail.unshift({
        row: head.row,
        col: head.col,
    })

    if (head.row === table.food.row && head.col === table.food.col) {
        food = getRandomFood();
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
            setTable({} = table)
            break;
        case 'right':
        default:
            head.col++;
            break;
    }
    const newState = {
        ...table,
        food,
        snake: {
            head,
            tail
        }
    }

    let die = false;
    if (newState.snake.head.row < 0 ||
        newState.snake.head.row >= table.rows ||
        newState.snake.head.col < 0 ||
        newState.snake.head.col >= table.rows
    ) {
        die = true;
    }
    const grid = resetGrid(newState, true);
    setTable({
        ...newState,
        die,
        grid,
    })
}, [tickk])

const handleKeyPress = (e) => {
    let {
        currentDirection,
        direction,
    } = table;

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

    // const newState = {
    //     ...table,
    //     direction,
    //     currentDirection,
    // }
    // const grid = resetGrid(newState, true);
    setTable(table => {
        return {
            ...newState,
            currentDirection
        }
    })
}
const getHeadStart = () => {
    return {
        row: Math.floor((table.rows - 1) / 2),
        col: Math.floor((table.cols - 1) / 2),
    }
}
const getRandomFood = () => {
    return {
        row: Math.floor((Math.random() * table.rows)),
        col: Math.floor((Math.random() * table.cols))
    }
}



return (
    <div className="App">
        <div className="grid">
            {table.grid.map((grid, index) => {

                return (
                    <div
                        key={grid.row.toString() + '-' + grid.col.toString()}
                        className={
                            grid.isHead
                                ? 'item is-head' : grid.isTail
                                    ? 'item is-tail' : grid.isFood
                                        ? 'item is-food' : 'item'
                        } ></div>)
            })}
        </div>
    </div>
);
}

export default Test;
