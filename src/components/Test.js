// import React, { useState } from 'react';
// import './App.css';
// function App() {

//     const [table, setTable] = useState({
//         rows: 13,
//         cols: 13,
//         grid: [

//         ],
//         food: {

//         },
//         snake: {
//             head: {},
//             tail: [],
//         },
//         currentDirection: 'right',
//     });
//     constructor = (props) => {
//         this.props = props
//         handleKeyPress = this.handleKeyPress.bind(this);
//     }
//     const resetGrid = (state = {}, sendBack = false) => {
//         if (!Object.keys(state).length) {
//             state = table;
//         }
//         const grid = [];
//         const {
//             rows,
//             cols,
//             food,
//             snake
//         } = state;
//         for (let row = 0; row < rows; row++) {
//             for (let col = 0; col < cols; col++) {
//                 const isFood = (food.row === row && food.col === col);
//                 const isHead = (snake.head.row === row && snake.head.col === col);
//                 let isTail = false;
//                 snake.tail.forEach(t => {
//                     if (t.row === row && t.col === col) {
//                         isTail = true;
//                     }
//                 })

//                 grid.push({
//                     row,
//                     col,
//                     isFood,
//                     isHead,
//                     isTail,
//                 })
//             }
//         }

//         if (sendBack) {
//             return grid;
//         } else {
//             setTable({
//                 grid
//             })
//         }
//     }
//     const gameTick = () => {
//         setTable((table) => {
//             let {
//                 currentDirection,
//                 snake,
//                 food
//             } = table;
//             let {
//                 tail
//             } = snake;

//             const {
//                 row,
//                 col
//             } = table.snake.head;
//             let head = {
//                 row,
//                 col
//             };
//             if (table.die) {
//                 clearInterval(window.fnInterval);
//             }

//             tail.unshift({
//                 row: head.row,
//                 col: head.col,
//             })

//             if (head.row === table.food.row && head.col === table.food.col) {
//                 food = getRandomFood();
//             } else {
//                 tail.pop();
//             }

//             switch (currentDirection) {
//                 case 'left':
//                     head.col--;
//                     break;

//                 case 'up':
//                     head.row--;
//                     break;

//                 case 'down':
//                     head.row++;
//                     break;

//                 case 'right':
//                 default:
//                     head.col++;
//                     break;
//             }
//             const newState = {
//                 ...table,
//                 food,
//                 snake: {
//                     head,
//                     tail
//                 }
//             }

//             let die = false;
//             if (newState.snake.head.row < 0 ||
//                 newState.snake.head.row >= this.state.rows ||
//                 newState.snake.head.col < 0 ||
//                 newState.snake.head.col >= this.state.rows
//             ) {
//                 die = true;
//             }
//             const grid = this.resetGrid(newState, true);
//             return {
//                 ...newState,
//                 die,
//                 grid,
//             }
//         });
//     }
//     const handleKeyPress = (e) => {
//         let {
//             currentDirection
//         } = table;

//         switch (e.keyCode) {
//             case 37:
//                 currentDirection = 'left';
//                 break;

//             case 38:
//                 currentDirection = 'up';
//                 break;

//             case 39:
//             default:
//                 currentDirection = 'right';
//                 break;

//             case 40:
//                 currentDirection = 'down';
//                 break;
//         }

//         const newState = {
//             ...table,
//             currentDirection,
//         }
//         const grid = resetGrid(newState, true);
//         setTable(table => {
//             return {
//                 ...newState,
//                 grid
//             }
//         })
//     }
//     const getHeadStart = () => {
//         return {
//             row: Math.floor((Math.random() * table.rows)),
//             col: Math.floor((Math.random() * table.cols))
//         }
//     }
//     const getRandomFood = () => {
//         return {
//             row: Math.floor((Math.random() * table.rows)),
//             col: Math.floor((Math.random() * table.cols))
//         }
//     }


    //   let gridContent = table.grid.map((grid) => {
    //     return <div>
    //       <div key={grid.row.toString() + '-' + grid.col.toString()}
    //         className={grid.isHead
    //           ? 'item is-head' : grid.isTail
    //             ? 'item is-tail' : grid.isFood
    //               ? 'item is-food' : 'item'}></div>


    //     </div>
    //       ;

    //   })
//     let indexs = [];
//     for (let i = 0; i < 11; i++) {
//         indexs.push(
//             <div key={i}>
//                 <div className="item"></div>
//             </div>
//         );
//     }
//     let cols = [];
//     for (let k = 0; k < 11; k++) {
//         cols.push(
//             <div className="container" key={k}
//             > {indexs}
//             </div>
//         );

//     }
//     let gridContent = table.grid.map((grid) => {
//         return <div
//             key={grid.row.toString() + '-' + grid.col.toString()}
//         ></div>
//     });
//     setTable((state) => {
//         const newState = {
//             ...state,
//             food: this.getRandomFood(),
//             snake: {
//                 head: this.getHeadStart(),
//                 tail: state.snake.tail
//             }
//         };
//         const grid = this.resetGrid(newState, true);
//         return {
//             ...newState,
//             grid,
//         }
//     });

//     this.resetGrid();
//     componentDidMount = () => {

//         document.body.addEventListener('keydown', this.handleKeyPress);

//         setTable((state) => {
//             const newState = {
//                 ...state,
//                 food: this.getRandomFood(),
//                 snake: {
//                     head: this.getHeadStart(),
//                     tail: state.snake.tail
//                 }
//             };
//             const grid = this.resetGrid(newState, true);
//             return {
//                 ...newState,
//                 grid,
//             }
//         });

//         this.resetGrid();

//         // Set tick
//         window.fnInterval = setInterval(() => {
//             this.gameTick();
//         }, this.state.tickTime);
//     }
//     componentWillMount = () => {
//         document.body.addEventListener('keydown', handleKeyPress());
//         clearInterval(window.fnInterval)
//     }

//     return (
//         <div className="App">
//             <div
//                 key={table.grid.row.toString() + '-' + table.grid.col.toString()}
//                 className={
//                     table.grid.isHead
//                         ? 'item is-head' : table.grid.isTail
//                             ? 'item is-tail' : table.grid.isFood
//                                 ? 'item is-food' : 'item'
//                 }></div>
//             <div className="container"> {cols}</div>
//             {cols}
//         </div>
//     );
// }

// export default App;
