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
    const [currentDirection, setCurrentDirection] = useState('right');
    const [tick, setTick] = useState(0)

    const resetGrid = (state = {}, sendBack = false) => {
        if (!Object.keys(state).length) {
            state = grid;
        }
        const table = [];
        const body = []

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const isFood = (food.row === row && food.col === col);
                const isHead = (snake.head.row === row && snake.head.col === col);
                let isTail = fales;
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
                firtfood.push({
                    isFood
                })
            }
        }
        if (sendBack) {
            return grid
        } else {
            setGrid({ grid });
            setSnake({ body })
            setFood({ firtfood })
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
    const getRanDomFood = () => {
        return {
            row: Math.floor((Math.random() * rows)),
            col: Math.floor((Math.random() * cols))
        }
    }

    return (
        <div>NewSnake</div>
    )
}

export default NewSnake