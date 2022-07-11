import React, { useState, useEffect } from 'react'

const NewSnake = () => {
    const rows = 15;
    const cols = 15;
    const [grid, setGrid] = useState([]);
    const [food, setFood] = useState({});
    const [snake, setSnake] = useState({
        head: {},
        tail: [],
    });
    const [die, setDie] = useState(false);
    const [currentDirection, setCurrentDirection] = useState('right');
    const [tick, setTick] = useState(0)

    const resetGrid = (state = {}, sendBack = false) => {
        if (!Object.keys(state).length) {
            state = grid;
        }
        const table = [];
        const body = []
        const firstFood = []
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const isFood = (food.row === row && food.col === col);
                const isHead = (snake.head.row === row && snake.head.col === col);
                let isTail = false;
                snake.tail.forEach(t => {
                    if (t.row === row && t.col === col) {
                        isTail = true
                    }
                })
                table.push({
                    row,
                    col,
                });
                body.push({
                    isHead,
                    isTail
                })
                firstFood.push({
                    isFood
                })
            }
        }
        if (sendBack) {
            return grid
        } else {
            setGrid({ table });
            setSnake({ body })
            setFood({ firstFood })
        }
    }
    const gameTick = () => {
        setTick(counter => counter + 1);
    }
    const getHead = () => {
        return {
            row: Math.floor((rows - 1) / 2),
            col: Math.floor((cols - 1) / 2),
        }
    }
    const getRandomFood = () => {
        return {
            row: Math.floor((Math.random() * rows)),
            col: Math.floor((Math.random() * cols))
        }
    }
    useEffect(() => {
        const {
            row,
            col
        } = snake.head;

        let {
            tail
        } = snake.tail;
        let head = {
            row,
            col
        };
        if (die) {
            clearInterval(window.fnInterval);
        }

        tail.unshift({
            row: head.row,
            col: head.col,
        });

        if (head.row === food.row && head.col === food.col) {
            food = getRandomFood();
        } else {
            tail.pop()
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

        const newSnake = {
            snake: {
                head,
                tail
            }
        }

        if (
            newSnake.snake.head.row < 0 ||
            newSnake.snake.head.row >= rows ||
            newSnake.snake.head.col < 0 ||
            newSnake.snake.head.col >= rows
        ) {
            setDie(true)
        }
        const newGrid = resetGrid({}, true);

        return {
            ...newSnake,
            die,
            newGrid

        }

    })
    const handleKeyPress = (e) => {
        switch (e.keyCode) {
            case 38:
            case 87:
                setCurrentDirection("left");
                break;

            case 40:
            case 83:
                setCurrentDirection("down");
                break;

            case 37:
            case 65:
                setCurrentDirection("left");
                break;

            case 39:
            case 68:
                setCurrentDirection("right");
                break;

        }
    }
    useEffect(() => {
        document.body.addEventListener('keydown', handleKeyPress);
        setFood(getRandomFood());
        setSnake({
            head: getHead(),
            tail: snake.tail
        })

        resetGrid();
        window.fnInterval = setInterval(() => {
            gameTick();
        }, 200)
    }, [])

    return (
        <div className="App">
            <div className="grid">
                {grid.map((grids, index) => {
                    return (
                        <div key={grids.row.toString() + '-' + grids.col.toString()}
                            className={
                                grids.isHead
                                    ? 'item is-head' : grids.isTail
                                        ? 'item is-tail' : grids.isFood
                                            ? 'item is-food' : 'item'
                            }
                        >

                        </div>
                    )
                })

                }
            </div>
        </div>
    )
}

export default NewSnake