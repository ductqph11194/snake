import React, { useState, useEffect } from 'react';

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
    const [tick, setTick] = useState(0);
    const [pause, setPause] = useState(false);

    useEffect(() => {
        if (pause === false) {
            const { row, col } = snake.head;

            let { tail } = snake;
            let head = {
                row,
                col,
            };

            tail.unshift({
                row: head.row,
                col: head.col,
            });

            if (head.row === food.row && head.col === food.col) {
                setFood(getRandomFood());
            }
            else {
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

            const newSnake = {
                snake: {
                    head,
                    tail,
                },
            };

            if (
                newSnake.snake.head.row < 0 ||
                newSnake.snake.head.row > rows ||
                newSnake.snake.head.col < 0 ||
                newSnake.snake.head.col > rows
            ) {
                setDie(true);
            }
            setSnake(newSnake.snake);
            resetGrid();
            console.log(die);
        }
    }, [tick, pause]);

    useEffect(() => {
        if (die === true) {
            document.body.addEventListener('keydown', handleKeyPressPause);

            return () => {
                document.body.removeEventListener('keydown', handleKeyPressPause);
                clearInterval(window.fnInterval);
            }
        }
    }, [die]);

    useEffect(() => {
        document.body.addEventListener('keydown', handleKeyPress);
        setFood(getRandomFood());

        const newSnake = {
            snake: {
                head: getHead(),
                tail: snake.tail,
            },
        };
        setSnake(newSnake.snake);
        resetGrid();
        window.fnInterval = setInterval(() => {
            gameTick();
        }, 250);
        return () => {
            document.body.removeEventListener('keydown', handleKeyPress);
            clearInterval(window.fnInterval);
        }

    }, []);



    const resetGrid = () => {
        const table = [];
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const isFood = food.row === row && food.col === col;
                const isHead = snake.head.row === row && snake.head.col === col;
                let isTail = false;
                snake.tail.forEach((t) => {
                    if (t.row === row && t.col === col) {
                        isTail = true;
                    }
                });
                table.push({
                    row,
                    col,
                    isFood,
                    isHead,
                    isTail,
                });
            }
        }
        setGrid(table);
    };

    const gameTick = () => {
        setTick((counter) => counter + 1);
    };

    const getHead = () => {
        return {
            row: Math.floor((rows - 1) / 2),
            col: Math.floor((cols - 1) / 2),
        };
    };

    const getRandomFood = () => {
        return {
            row: Math.floor((Math.random() * rows)),
            col: Math.floor((Math.random() * cols)),
        };
    };

    const handlePause = () => {
        setPause(pause => !pause)
    }
    const resStartGame = () => {
        setDie(false)
        const newSnake = {
            snake: {
                head: getHead(),
                tail: snake.tail,
            },
        };
        setGrid([]);
        setFood({});
        resetGrid()
        setSnake(
            newSnake.snake
        )
        setCurrentDirection('right');
        setTick(0)

    }

    const handleKeyPress = (e) => {
        switch (e.keyCode) {
            case 38:
            case 87:
                setCurrentDirection('up');
                break;

            case 40:
            case 83:
                setCurrentDirection('down');
                break;

            case 37:
            case 65:
                setCurrentDirection('left');
                break;

            case 39:
            case 68:
                setCurrentDirection('right');
                break;
            case 32:
                if (die === false) { handlePause(); }
        }

    };

    const handleKeyPressPause = (e) => {
        switch (e.keyCode) {
            case 32:
                if (die === true) { resStartGame(); }
        }
    }

    return (
        <div className="App">
            <div className="grid">
                {grid.map((grids, index) => {
                    if (die === true) {
                        return (
                            <div
                                key={grids.row.toString() + '-' + grids.col.toString()}
                                className="item">
                            </div>)
                    } else {
                        return (
                            <div
                                key={grids.row.toString() + '-' + grids.col.toString()}
                                className={
                                    grids.isHead
                                        ? 'item is-head'
                                        : grids.isTail
                                            ? 'item is-tail'
                                            : grids.isFood
                                                ? 'item is-food'
                                                : 'item'
                                }
                            ></div>
                        );
                    }
                })}

            </div>
        </div>
    );
};

export default NewSnake;