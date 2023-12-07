import {useContext, useEffect, useMemo, useState} from "react";
import './timer.css'
import {StoreContext} from './Sudoku'

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;

export const Timer = ({ deadline = new Date().toString() }) => {
    const parsedDeadline = useMemo(() => Date.parse(deadline), [deadline]);
    const [time, setTime] = useState(parsedDeadline - Date.now());

    const test = useContext(StoreContext)

    useEffect(() => {
        const interval = setInterval(
            () => setTime(parsedDeadline - Date.now()),
            1000,
        );
        console.log(test);
        if(test){clearInterval(interval)}
        return()=>{clearInterval(interval)};
    }, [test]);

    return (
        <div className="timer">
            {Object.entries({
                Hours: (time / HOUR) % 24,
                Minutes: (time / MINUTE) % 60,
                Seconds: (time / SECOND) % 60,
            }).map(([label, value]) => (
                <div key={label} className="col-4">
                    <div className="box">
                        <span className="text">{label}</span>
                        <p>{`${Math.abs(Math.ceil(value))}`.padStart(2, "0")}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};