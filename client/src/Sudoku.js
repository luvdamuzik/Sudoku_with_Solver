import './App.css';
import {createContext, useContext, useState} from "react";
import Boards from './Boards'
import {Timer} from "./Timer";
export const StoreContext = createContext(false)

let init;

function App() {
    const[sudokuArr,setSudokuArr] = useState(init)
    let {stop} = useContext(StoreContext);

    function initialize(e){
        if(e.target.value === "easy"){
            init = Boards.randomBoard("easy")
            setSudokuArr(init)
        }else if(e.target.value === "normal"){
            init = Boards.randomBoard("normal")
            setSudokuArr(init)
        }else{
            init = Boards.randomBoard("hard")
            setSudokuArr(init)
        }
    }

    function getDeepCopy(arr){
        return JSON.parse(JSON.stringify(arr));
    }

    function onInputChange(e,row,col){
        var val = parseInt(e.target.value) || -1, grid = getDeepCopy(sudokuArr)

        if(val === -1 || val >=1 && val <=9){
            grid[row][col] = val;
        }
        setSudokuArr(grid)
    }

    function compareSudokus(currentSudoku,solvedSudoku){
        let res = {
            isComplete: true,
            isSolvable:true
        }

        for(let i=0; i<9; i++){
            for(let j=0; j<9; j++){
                if(currentSudoku[i][j] !== solvedSudoku[i][j]){
                    if(currentSudoku[i][j] === -1){
                        res.isSolvable = false;
                    }
                    res.isComplete = false;
                }
            }
        }
        return res;
    }

    function checkSudoku(){
        let sudoku = getDeepCopy(init)
        solver(sudoku)
        let compare = compareSudokus(sudokuArr,sudoku)
        if(compare.isComplete){
            alert("Congratulations")
            stop = true;
        }else{
            alert("Keep going")
            stop = false;
        }
    }

    function checkRow(grid,row,num){
        return grid[row].indexOf(num) === -1;
    }

    function checkCol(grid,col,num){
        return grid.map(row =>row[col]).indexOf(num) === -1;
    }

    function checkBox(grid,row,col,num){
        let boxArr = [],
            rowStart = row - (row%3),
            colStart = col - (col%3);
        for(let i = 0;i<3;i++){
            for(let j = 0;j<3;j++){
                boxArr.push(grid[rowStart +i][colStart +j])
            }
        }
        return boxArr.indexOf(num) === -1;
    }

    function checkValid(grid,row,col,num){
        return checkRow(grid, row, num) && checkCol(grid, col, num) && checkBox(grid, row, col, num);
    }

    function getNext(row,col){
        return col !== 8? [row,col+1] : row !== 8? [row+1,0] : [0,0];
    }

    function solver(grid,row=0,col=0){

        if(grid[row][col] !== -1){
            let isLast = row >= 8 && col>=8;
            if(!isLast){
                let [newRow,newCol] = getNext(row,col);
                return solver(grid,newRow,newCol)
            }

        }

        for(let num = 1;num<=9;num++){
            if(checkValid(grid,row,col,num)){
                grid[row][col] = num
                let [newRow,newCol] = getNext(row,col)

                if(!newRow && !newCol){
                    return true;
                }

                if(solver(grid,newRow,newCol)){
                    return true;
                }
            }
        }
        grid[row][col] = -1
        return false
    }

    function solveSudoku(){
        let sudoku = getDeepCopy(init)
        solver(sudoku);
        setSudokuArr(sudoku);
    }

    function resetSudoku(){
        let sudoku = getDeepCopy(init)
        stop = false;
        setSudokuArr(sudoku)
    }

    if(init){
        return (
            <div className="App">
                <div className="App-header">
                    <h3>Sudoku</h3>
                    <Timer stop={stop}/>
                    <table>
                        <tbody>
                        {
                            [0,1,2,3,4,5,6,7,8].map((row,rIndex)=>{
                                return (
                                    <tr key={rIndex} className={(row+1)%3 === 0?"bBorder":""}>
                                        {[0,1,2,3,4,5,6,7,8].map((col,cIndex)=>{
                                            return(
                                                <td key={rIndex+cIndex} className={(col+1)%3 === 0?"rBorder":""}>
                                                    <input onChange={(e)=> onInputChange(e,row,col)}
                                                           value={sudokuArr[row][col] === -1? "" : sudokuArr[row][col]}
                                                           className="cellInput" disabled={init[row][col] !== -1}/>
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                    <div className="buttonContainer">
                        <button className="checkButton" onClick={checkSudoku}>Check</button>
                        <button className="solveButton" onClick={solveSudoku}>Solve</button>
                        <button className="resetButton" onClick={resetSudoku}>Reset</button>
                    </div>
                </div>
            </div>
        );
    }else{
        return(
            <div className="App">
                <div className="App-header1">
                    <button value={"easy"} className="easyButton" onClick={e=>initialize(e)}>Easy</button>
                    <button value={"normal"} className="normalButton" onClick={e=>initialize(e)}>Normal</button>
                    <button value={"hard"} className="hardButton" onClick={e=>initialize(e)}>Hard</button>
                </div>
            </div>
        )
    }

}

export default App;
