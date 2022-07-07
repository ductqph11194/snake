import React, { useState, useEffect } from 'react';
import './App.css';
function Test(props) {

    const [table, setTable] = useState({
        rows: 13,
        cols: 13,
        grid: [
        ],
        food: {},
        snake: {
            head: {},
            tail: [],
        },
        currentDirection: 'right',
    });

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
                grid
            })
        }
    }
    const gameTick = () => {
        setTable((table) => {
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
            return {
                ...newState,
                die,
                grid,
            }
        });
    }
    const handleKeyPress = (e) => {
        let {
            currentDirection
        } = table;

        switch (e.keyCode) {
            case 37:
                currentDirection = 'left';
                break;

            case 38:
                currentDirection = 'up';
                break;

            case 39:
            default:
                currentDirection = 'right';
                break;

            case 40:
                currentDirection = 'down';
                break;
        }

        const newState = {
            ...table,
            currentDirection,
        }
        const grid = resetGrid(newState, true);
        setTable(table => {
            return {
                ...newState,
                grid
            }
        })
    }
    const getHeadStart = () => {
        return {
            row: Math.floor((Math.random() * table.rows)),
            col: Math.floor((Math.random() * table.cols))
        }
    }
    const getRandomFood = () => {
        return {
            row: Math.floor((Math.random() * table.rows)),
            col: Math.floor((Math.random() * table.cols))
        }
    }

    setTable((state) => {
        const newState = {
            ...state,
            food: getRandomFood(),
            snake: {
                head: getHeadStart(),
                tail: state.snake.tail
            }
        };
        const grid = resetGrid(newState, true);
        return {
            ...newState,
            grid,
        }
    });

    useEffect(() => {

        document.body.addEventListener('keydown', this.handleKeyPress);

        setTable((state) => {
            const newState = {
                ...state,
                food: getRandomFood(),
                snake: {
                    head: getHeadStart(),
                    tail: table.snake.tail
                }
            };
            const grid = resetGrid(newState, true);
            return {
                ...newState,
                grid,
            }
        });

        resetGrid();

        // Set tick
        window.fnInterval = setInterval(() => {
            gameTick();
        }, table.tickTime);
    })
    useEffect(() => {
        document.body.addEventListener('keydown', handleKeyPress());
        clearInterval(window.fnInterval)
    })

    return (
        <div className="App">
            <div className="container">             {table.grid.map((table, index) => {
                console.log({ table });
                return (<div
                    key={table.grid.row.toString() + '-' + table.grid.col.toString()}
                    className={
                        table.isHead
                            ? 'item is-head' : table.isTail
                                ? 'item is-tail' : table.isFood
                                    ? 'item is-food' : 'item'
                    } >log</div>)
            })}</div>

        </div>
    );
}

export default Test;
